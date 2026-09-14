export type CityData = City;

export interface City {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  region?: string;
  lat: number;
  lng: number;
  timezone: string;
  population?: string;
  landmarkId?: "eiffel" | "liberty" | "bigben" | "tokyotower" | "burj" | "indiagate" | "operahouse" | "generic";
  isCapital?: boolean;
  featured?: boolean;
  aliases: string[];
}

export const CITIES: City[] = [
  {
    id: "paris-fr",
    name: "Paris",
    slug: "paris-france",
    country: "France",
    countryCode: "FR",
    region: "Île-de-France",
    lat: 48.8566,
    lng: 2.3522,
    timezone: "Europe/Paris",
    population: "2.1 million",
    landmarkId: "eiffel",
    isCapital: true,
    featured: true,
    aliases: ["Paris", "France", "CET", "CEST", "Eiffel"]
  },
  {
    id: "new-york-us",
    name: "New York",
    slug: "new-york-united-states",
    country: "United States",
    countryCode: "US",
    region: "New York",
    lat: 40.7128,
    lng: -74.0060,
    timezone: "America/New_York",
    population: "8.3 million",
    landmarkId: "liberty",
    isCapital: false,
    featured: true,
    aliases: ["NYC", "New York City", "Manhattan", "EST", "EDT", "Eastern Time"]
  },
  {
    id: "london-gb",
    name: "London",
    slug: "london-united-kingdom",
    country: "United Kingdom",
    countryCode: "GB",
    region: "Greater London",
    lat: 51.5074,
    lng: -0.1278,
    timezone: "Europe/London",
    population: "8.9 million",
    landmarkId: "bigben",
    isCapital: true,
    featured: true,
    aliases: ["London", "UK", "Britain", "GMT", "BST", "Greenwich", "Big Ben"]
  },
  {
    id: "tokyo-jp",
    name: "Tokyo",
    slug: "tokyo-japan",
    country: "Japan",
    countryCode: "JP",
    region: "Kanto",
    lat: 35.6762,
    lng: 139.6503,
    timezone: "Asia/Tokyo",
    population: "14.0 million",
    landmarkId: "tokyotower",
    isCapital: true,
    featured: true,
    aliases: ["Tokyo", "Japan", "JST", "Tokyo Tower", "Edo"]
  },
  {
    id: "dubai-ae",
    name: "Dubai",
    slug: "dubai-united-arab-emirates",
    country: "United Arab Emirates",
    countryCode: "AE",
    region: "Dubai Emirate",
    lat: 25.2048,
    lng: 55.2708,
    timezone: "Asia/Dubai",
    population: "3.6 million",
    landmarkId: "burj",
    isCapital: false,
    featured: true,
    aliases: ["Dubai", "UAE", "Emirates", "GST", "Burj Al Arab", "Burj Khalifa"]
  },
  {
    id: "delhi-in",
    name: "Delhi",
    slug: "delhi-india",
    country: "India",
    countryCode: "IN",
    region: "Delhi NCR",
    lat: 28.6139,
    lng: 77.2090,
    timezone: "Asia/Kolkata",
    population: "33.0 million",
    landmarkId: "indiagate",
    isCapital: true,
    featured: true,
    aliases: ["Delhi", "New Delhi", "India", "IST", "India Gate", "Bharat", "UTC+5:30"]
  },
  {
    id: "sydney-au",
    name: "Sydney",
    slug: "sydney-australia",
    country: "Australia",
    countryCode: "AU",
    region: "New South Wales",
    lat: -33.8688,
    lng: 151.2093,
    timezone: "Australia/Sydney",
    population: "5.3 million",
    landmarkId: "operahouse",
    isCapital: false,
    featured: true,
    aliases: ["Sydney", "Australia", "AEST", "AEDT", "Sydney Opera House", "Harbour"]
  },
  {
    id: "los-angeles-us",
    name: "Los Angeles",
    slug: "los-angeles-united-states",
    country: "United States",
    countryCode: "US",
    region: "California",
    lat: 34.0522,
    lng: -118.2437,
    timezone: "America/Los_Angeles",
    population: "3.8 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["LA", "Los Angeles", "California", "PST", "PDT", "Pacific Time"]
  },
  {
    id: "chicago-us",
    name: "Chicago",
    slug: "chicago-united-states",
    country: "United States",
    countryCode: "US",
    region: "Illinois",
    lat: 41.8781,
    lng: -87.6298,
    timezone: "America/Chicago",
    population: "2.6 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Chicago", "CST", "CDT", "Central Time"]
  },
  {
    id: "san-francisco-us",
    name: "San Francisco",
    slug: "san-francisco-united-states",
    country: "United States",
    countryCode: "US",
    region: "California",
    lat: 37.7749,
    lng: -122.4194,
    timezone: "America/Los_Angeles",
    population: "808,000",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["SF", "Bay Area", "Silicon Valley", "PST", "PDT"]
  },
  {
    id: "toronto-ca",
    name: "Toronto",
    slug: "toronto-canada",
    country: "Canada",
    countryCode: "CA",
    region: "Ontario",
    lat: 43.6532,
    lng: -79.3832,
    timezone: "America/Toronto",
    population: "2.9 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Toronto", "Ontario", "Canada", "EST", "EDT"]
  },
  {
    id: "singapore-sg",
    name: "Singapore",
    slug: "singapore",
    country: "Singapore",
    countryCode: "SG",
    region: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    timezone: "Asia/Singapore",
    population: "5.9 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Singapore", "SG", "SGT", "Lion City"]
  },
  {
    id: "hong-kong-hk",
    name: "Hong Kong",
    slug: "hong-kong",
    country: "China",
    countryCode: "HK",
    region: "Hong Kong SAR",
    lat: 22.3193,
    lng: 114.1694,
    timezone: "Asia/Hong_Kong",
    population: "7.4 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Hong Kong", "HK", "HKT"]
  },
  {
    id: "berlin-de",
    name: "Berlin",
    slug: "berlin-germany",
    country: "Germany",
    countryCode: "DE",
    region: "Berlin",
    lat: 52.5200,
    lng: 13.4050,
    timezone: "Europe/Berlin",
    population: "3.8 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Berlin", "Germany", "Deutschland", "CET", "CEST"]
  },
  {
    id: "mumbai-in",
    name: "Mumbai",
    slug: "mumbai-india",
    country: "India",
    countryCode: "IN",
    region: "Maharashtra",
    lat: 19.0760,
    lng: 72.8777,
    timezone: "Asia/Kolkata",
    population: "21.3 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Mumbai", "Bombay", "Maharashtra", "IST"]
  },
  {
    id: "bengaluru-in",
    name: "Bengaluru",
    slug: "bengaluru-india",
    country: "India",
    countryCode: "IN",
    region: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    timezone: "Asia/Kolkata",
    population: "13.6 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Bangalore", "Bengaluru", "Karnataka", "IST"]
  },
  {
    id: "cairo-eg",
    name: "Cairo",
    slug: "cairo-egypt",
    country: "Egypt",
    countryCode: "EG",
    region: "Cairo Governorate",
    lat: 30.0444,
    lng: 31.2357,
    timezone: "Africa/Cairo",
    population: "10.0 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Cairo", "Egypt", "EET", "EEST"]
  },
  {
    id: "rome-it",
    name: "Rome",
    slug: "rome-italy",
    country: "Italy",
    countryCode: "IT",
    region: "Lazio",
    lat: 41.9028,
    lng: 12.4964,
    timezone: "Europe/Rome",
    population: "2.8 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Rome", "Roma", "Italy", "Italia", "CET", "CEST"]
  },
  {
    id: "madrid-es",
    name: "Madrid",
    slug: "madrid-spain",
    country: "Spain",
    countryCode: "ES",
    region: "Community of Madrid",
    lat: 40.4168,
    lng: -3.7038,
    timezone: "Europe/Madrid",
    population: "3.3 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Madrid", "Spain", "España", "CET", "CEST"]
  },
  {
    id: "seoul-kr",
    name: "Seoul",
    slug: "seoul-south-korea",
    country: "South Korea",
    countryCode: "KR",
    region: "Seoul Capital Area",
    lat: 37.5665,
    lng: 126.9780,
    timezone: "Asia/Seoul",
    population: "9.7 million",
    landmarkId: "generic",
    isCapital: true,
    featured: false,
    aliases: ["Seoul", "Korea", "KST"]
  },
  {
    id: "sao-paulo-br",
    name: "São Paulo",
    slug: "sao-paulo-brazil",
    country: "Brazil",
    countryCode: "BR",
    region: "São Paulo",
    lat: -23.5505,
    lng: -46.6333,
    timezone: "America/Sao_Paulo",
    population: "12.3 million",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Sao Paulo", "São Paulo", "Brazil", "BRT"]
  },
  {
    id: "zurich-ch",
    name: "Zurich",
    slug: "zurich-switzerland",
    country: "Switzerland",
    countryCode: "CH",
    region: "Canton of Zurich",
    lat: 47.3769,
    lng: 8.5417,
    timezone: "Europe/Zurich",
    population: "420,000",
    landmarkId: "generic",
    isCapital: false,
    featured: false,
    aliases: ["Zurich", "Zürich", "Switzerland", "CET", "CEST"]
  }
];

export function getAllCities(): City[] {
  return CITIES;
}

export function getFeaturedCities(): City[] {
  return CITIES.filter(c => c.featured);
}

export function getCityBySlug(slug: string): City | undefined {
  const normalized = slug.toLowerCase();
  return CITIES.find(c => c.slug === normalized || c.id === normalized);
}

export function getCityById(id: string): City | undefined {
  return CITIES.find(c => c.id === id);
}

export function searchCities(query: string): City[] {
  if (!query || query.trim() === "") return [];
  const q = query.trim().toLowerCase();
  return CITIES.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    c.timezone.toLowerCase().includes(q) ||
    c.aliases.some(a => a.toLowerCase().includes(q))
  );
}

export function getCitiesByCountry(countryCode: string): City[] {
  return CITIES.filter(c => c.countryCode.toUpperCase() === countryCode.toUpperCase());
}

export function getCitiesByTimezone(timezone: string): City[] {
  return CITIES.filter(c => c.timezone === timezone);
}

export const POPULAR_CITIES = CITIES;

