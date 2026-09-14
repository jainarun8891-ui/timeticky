const fs = require('fs');

fs.writeFileSync('src/app/globals.css', `
@import "tailwindcss";

@layer base {
  :root {
    --background: #f8fafc;
    --foreground: #0f172a;
  }
  .dark {
    --background: #020617;
    --foreground: #f8fafc;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'tnum';
  -webkit-font-smoothing: antialiased;
}

/* Tabular figures for clocks to prevent digit jitter */
.font-mono {
  font-variant-numeric: tabular-nums;
}

/* Smooth micro-animations */
@keyframes radar-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.4;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

@keyframes sun-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes soft-glow {
  0%, 100% {
    opacity: 0.8;
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.4));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 14px rgba(59, 130, 246, 0.8));
  }
}

.animate-radar {
  animation: radar-pulse 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
}

.animate-sun-float {
  animation: sun-float 3s ease-in-out infinite;
}

.glow-active {
  animation: soft-glow 2.5s ease-in-out infinite;
}
`, 'utf8');

console.log('globals.css updated with rich micro-animations');
