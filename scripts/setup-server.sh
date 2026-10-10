#!/usr/bin/env bash
# ==============================================================================
# One-Time Production Setup Script for TimeNumbers (timenumbers.com)
# Target Server: Ubuntu 20.04 / 22.04 / 24.04 LTS (DigitalOcean Droplet)
# ==============================================================================

set -euo pipefail

DOMAIN="timenumbers.com"
WWW_DOMAIN="www.timenumbers.com"
APP_DIR="/var/www/timenumbers"
REPO_URL="https://github.com/timeticky/timeticky.git"
APP_PORT="3000"

echo "=================================================================="
echo " Starting One-Time Deployment for $DOMAIN on DigitalOcean"
echo "=================================================================="

# 1. System Package Updates & Prerequisites
echo ">>> [1/7] Updating apt packages and installing system utilities..."
export DEBIAN_FRONTEND=noninteractive
apt update -y
apt install -y curl wget git build-essential ufw nginx certbot python3-certbot-nginx

# 2. Swap Memory Setup (Prevents out-of-memory errors during Next.js builds)
echo ">>> [2/7] Checking Swap memory..."
if [ ! -f /swapfile ]; then
    echo "Creating 2GB swapfile..."
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo "Swap created successfully."
else
    echo "Swapfile already exists. Skipping."
fi

# 3. Node.js 20 LTS & PM2 Installation
echo ">>> [3/7] Setting up Node.js 20 LTS & PM2..."
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d'.' -f1 | tr -d 'v')" -lt 20 ]; then
    echo "Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

if ! command -v pm2 >/dev/null 2>&1; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi

# 4. Clone / Fetch Repository & Build Next.js App
echo ">>> [4/7] Setting up application repository..."
mkdir -p /var/www

if [ ! -d "$APP_DIR/.git" ]; then
    echo "Cloning repository from $REPO_URL into $APP_DIR..."
    git clone "$REPO_URL" "$APP_DIR"
else
    echo "Repository already present at $APP_DIR. Fetching latest code..."
    cd "$APP_DIR"
    git fetch origin main
    git reset --hard origin/main
fi

cd "$APP_DIR"
echo "Installing project dependencies..."
npm install

echo "Building Next.js application..."
npm run build

# 5. PM2 Process Manager Configuration
echo ">>> [5/7] Starting application with PM2..."
if pm2 describe timenumbers >/dev/null 2>&1; then
    echo "PM2 process 'timenumbers' found. Reloading..."
    pm2 reload timenumbers --update-env
else
    echo "Starting new PM2 process 'timenumbers' on port $APP_PORT..."
    pm2 start npm --name "timenumbers" -- start -- -p "$APP_PORT"
fi

pm2 save
env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root || true

# 6. Configure Nginx Reverse Proxy
echo ">>> [6/7] Configuring Nginx reverse proxy..."
cat > /etc/nginx/sites-available/"$DOMAIN" <<NGINX_EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_cache_bypass \$http_upgrade;
        expires 365d;
        access_log off;
    }
}
NGINX_EOF

# Enable site in Nginx
ln -sf /etc/nginx/sites-available/"$DOMAIN" /etc/nginx/sites-enabled/"$DOMAIN"
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl enable nginx
systemctl restart nginx

# 7. Configure Firewall (UFW)
echo ">>> [7/7] Configuring UFW Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
echo "y" | ufw enable || true

# Create quick update script for future deployments
cat > "$APP_DIR/update.sh" << 'UPDATE_EOF'
#!/usr/bin/env bash
set -e
echo "Updating TimeNumbers application..."
cd /var/www/timenumbers
git fetch origin main
git reset --hard origin/main
npm install
npm run build
pm2 reload timenumbers
echo "Application successfully updated and reloaded!"
UPDATE_EOF
chmod +x "$APP_DIR/update.sh"

echo "=================================================================="
echo " DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "=================================================================="
echo "Next.js is running at: http://127.0.0.1:$APP_PORT via PM2"
echo "Nginx is reverse proxying traffic for $DOMAIN and $WWW_DOMAIN"
echo ""
echo "FINAL STEP (SSL / HTTPS):"
echo "Once your DNS points to this server IP, run this command to enable SSL:"
echo "certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
echo ""
echo "For future updates, simply run:"
echo "/var/www/timenumbers/update.sh"
echo "=================================================================="
