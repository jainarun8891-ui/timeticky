// Global Dialing Codes Directory & Calling Database
export interface DialingCodeEntry {
  countryCode: string;
  name: string;
  dialCode: string;
  flag: string;
  capital: string;
  timezone: string;
  region: "Americas" | "Europe" | "Asia" | "Africa" | "Oceania";
  exitCode: string;
  trunkPrefix?: string;
}

export const DIALING_CODES: DialingCodeEntry[] = [
  {
    "countryCode": "US",
    "name": "United States",
    "dialCode": "+1",
    "flag": "🇺🇸",
    "capital": "Washington, D.C.",
    "timezone": "America/New_York",
    "region": "Americas",
    "exitCode": "011",
    "trunkPrefix": "1"
  },
  {
    "countryCode": "GB",
    "name": "United Kingdom",
    "dialCode": "+44",
    "flag": "🇬🇧",
    "capital": "London",
    "timezone": "Europe/London",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "FR",
    "name": "France",
    "dialCode": "+33",
    "flag": "🇫🇷",
    "capital": "Paris",
    "timezone": "Europe/Paris",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "DE",
    "name": "Germany",
    "dialCode": "+49",
    "flag": "🇩🇪",
    "capital": "Berlin",
    "timezone": "Europe/Berlin",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "JP",
    "name": "Japan",
    "dialCode": "+81",
    "flag": "🇯🇵",
    "capital": "Tokyo",
    "timezone": "Asia/Tokyo",
    "region": "Asia",
    "exitCode": "010",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "IN",
    "name": "India",
    "dialCode": "+91",
    "flag": "🇮🇳",
    "capital": "New Delhi",
    "timezone": "Asia/Kolkata",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "CA",
    "name": "Canada",
    "dialCode": "+1",
    "flag": "🇨🇦",
    "capital": "Ottawa",
    "timezone": "America/Toronto",
    "region": "Americas",
    "exitCode": "011",
    "trunkPrefix": "1"
  },
  {
    "countryCode": "AU",
    "name": "Australia",
    "dialCode": "+61",
    "flag": "🇦🇺",
    "capital": "Canberra",
    "timezone": "Australia/Sydney",
    "region": "Oceania",
    "exitCode": "0011",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "CN",
    "name": "China",
    "dialCode": "+86",
    "flag": "🇨🇳",
    "capital": "Beijing",
    "timezone": "Asia/Shanghai",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "BR",
    "name": "Brazil",
    "dialCode": "+55",
    "flag": "🇧🇷",
    "capital": "Brasília",
    "timezone": "America/Sao_Paulo",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "IT",
    "name": "Italy",
    "dialCode": "+39",
    "flag": "🇮🇹",
    "capital": "Rome",
    "timezone": "Europe/Rome",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "ES",
    "name": "Spain",
    "dialCode": "+34",
    "flag": "🇪🇸",
    "capital": "Madrid",
    "timezone": "Europe/Madrid",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "NL",
    "name": "Netherlands",
    "dialCode": "+31",
    "flag": "🇳🇱",
    "capital": "Amsterdam",
    "timezone": "Europe/Amsterdam",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "CH",
    "name": "Switzerland",
    "dialCode": "+41",
    "flag": "🇨🇭",
    "capital": "Bern",
    "timezone": "Europe/Zurich",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "SE",
    "name": "Sweden",
    "dialCode": "+46",
    "flag": "🇸🇪",
    "capital": "Stockholm",
    "timezone": "Europe/Stockholm",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "SG",
    "name": "Singapore",
    "dialCode": "+65",
    "flag": "🇸🇬",
    "capital": "Singapore",
    "timezone": "Asia/Singapore",
    "region": "Asia",
    "exitCode": "001",
    "trunkPrefix": ""
  },
  {
    "countryCode": "AE",
    "name": "United Arab Emirates",
    "dialCode": "+971",
    "flag": "🇦🇪",
    "capital": "Abu Dhabi",
    "timezone": "Asia/Dubai",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "SA",
    "name": "Saudi Arabia",
    "dialCode": "+966",
    "flag": "🇸🇦",
    "capital": "Riyadh",
    "timezone": "Asia/Riyadh",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "ZA",
    "name": "South Africa",
    "dialCode": "+27",
    "flag": "🇿🇦",
    "capital": "Pretoria",
    "timezone": "Africa/Johannesburg",
    "region": "Africa",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "MX",
    "name": "Mexico",
    "dialCode": "+52",
    "flag": "🇲🇽",
    "capital": "Mexico City",
    "timezone": "America/Mexico_City",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": "01"
  },
  {
    "countryCode": "KR",
    "name": "South Korea",
    "dialCode": "+82",
    "flag": "🇰🇷",
    "capital": "Seoul",
    "timezone": "Asia/Seoul",
    "region": "Asia",
    "exitCode": "001",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "NZ",
    "name": "New Zealand",
    "dialCode": "+64",
    "flag": "🇳🇿",
    "capital": "Wellington",
    "timezone": "Pacific/Auckland",
    "region": "Oceania",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "EG",
    "name": "Egypt",
    "dialCode": "+20",
    "flag": "🇪🇬",
    "capital": "Cairo",
    "timezone": "Africa/Cairo",
    "region": "Africa",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "NG",
    "name": "Nigeria",
    "dialCode": "+234",
    "flag": "🇳🇬",
    "capital": "Abuja",
    "timezone": "Africa/Lagos",
    "region": "Africa",
    "exitCode": "009",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "KE",
    "name": "Kenya",
    "dialCode": "+254",
    "flag": "🇰🇪",
    "capital": "Nairobi",
    "timezone": "Africa/Nairobi",
    "region": "Africa",
    "exitCode": "000",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "AR",
    "name": "Argentina",
    "dialCode": "+54",
    "flag": "🇦🇷",
    "capital": "Buenos Aires",
    "timezone": "America/Argentina/Buenos_Aires",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "CL",
    "name": "Chile",
    "dialCode": "+56",
    "flag": "🇨🇱",
    "capital": "Santiago",
    "timezone": "America/Santiago",
    "region": "Americas",
    "exitCode": "1200",
    "trunkPrefix": ""
  },
  {
    "countryCode": "CO",
    "name": "Colombia",
    "dialCode": "+57",
    "flag": "🇨🇴",
    "capital": "Bogotá",
    "timezone": "America/Bogota",
    "region": "Americas",
    "exitCode": "005",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "ID",
    "name": "Indonesia",
    "dialCode": "+62",
    "flag": "🇮🇩",
    "capital": "Jakarta",
    "timezone": "Asia/Jakarta",
    "region": "Asia",
    "exitCode": "001",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "TH",
    "name": "Thailand",
    "dialCode": "+66",
    "flag": "🇹🇭",
    "capital": "Bangkok",
    "timezone": "Asia/Bangkok",
    "region": "Asia",
    "exitCode": "001",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "MY",
    "name": "Malaysia",
    "dialCode": "+60",
    "flag": "🇲🇾",
    "capital": "Kuala Lumpur",
    "timezone": "Asia/Kuala_Lumpur",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "PH",
    "name": "Philippines",
    "dialCode": "+63",
    "flag": "🇵🇭",
    "capital": "Manila",
    "timezone": "Asia/Manila",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "VN",
    "name": "Vietnam",
    "dialCode": "+84",
    "flag": "🇻🇳",
    "capital": "Hanoi",
    "timezone": "Asia/Ho_Chi_Minh",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "PK",
    "name": "Pakistan",
    "dialCode": "+92",
    "flag": "🇵🇰",
    "capital": "Islamabad",
    "timezone": "Asia/Karachi",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "BD",
    "name": "Bangladesh",
    "dialCode": "+880",
    "flag": "🇧🇩",
    "capital": "Dhaka",
    "timezone": "Asia/Dhaka",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "TR",
    "name": "Turkey",
    "dialCode": "+90",
    "flag": "🇹🇷",
    "capital": "Ankara",
    "timezone": "Europe/Istanbul",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "PL",
    "name": "Poland",
    "dialCode": "+48",
    "flag": "🇵🇱",
    "capital": "Warsaw",
    "timezone": "Europe/Warsaw",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "BE",
    "name": "Belgium",
    "dialCode": "+32",
    "flag": "🇧🇪",
    "capital": "Brussels",
    "timezone": "Europe/Brussels",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "AT",
    "name": "Austria",
    "dialCode": "+43",
    "flag": "🇦🇹",
    "capital": "Vienna",
    "timezone": "Europe/Vienna",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "PT",
    "name": "Portugal",
    "dialCode": "+351",
    "flag": "🇵🇹",
    "capital": "Lisbon",
    "timezone": "Europe/Lisbon",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "GR",
    "name": "Greece",
    "dialCode": "+30",
    "flag": "🇬🇷",
    "capital": "Athens",
    "timezone": "Europe/Athens",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "IE",
    "name": "Ireland",
    "dialCode": "+353",
    "flag": "🇮🇪",
    "capital": "Dublin",
    "timezone": "Europe/Dublin",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "DK",
    "name": "Denmark",
    "dialCode": "+45",
    "flag": "🇩🇰",
    "capital": "Copenhagen",
    "timezone": "Europe/Copenhagen",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "NO",
    "name": "Norway",
    "dialCode": "+47",
    "flag": "🇳🇴",
    "capital": "Oslo",
    "timezone": "Europe/Oslo",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "FI",
    "name": "Finland",
    "dialCode": "+358",
    "flag": "🇫🇮",
    "capital": "Helsinki",
    "timezone": "Europe/Helsinki",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "IL",
    "name": "Israel",
    "dialCode": "+972",
    "flag": "🇮🇱",
    "capital": "Jerusalem",
    "timezone": "Asia/Jerusalem",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "QA",
    "name": "Qatar",
    "dialCode": "+974",
    "flag": "🇶🇦",
    "capital": "Doha",
    "timezone": "Asia/Qatar",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "KW",
    "name": "Kuwait",
    "dialCode": "+965",
    "flag": "🇰🇼",
    "capital": "Kuwait City",
    "timezone": "Asia/Kuwait",
    "region": "Asia",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "HK",
    "name": "Hong Kong",
    "dialCode": "+852",
    "flag": "🇭🇰",
    "capital": "Hong Kong",
    "timezone": "Asia/Hong_Kong",
    "region": "Asia",
    "exitCode": "001",
    "trunkPrefix": ""
  },
  {
    "countryCode": "TW",
    "name": "Taiwan",
    "dialCode": "+886",
    "flag": "🇹🇼",
    "capital": "Taipei",
    "timezone": "Asia/Taipei",
    "region": "Asia",
    "exitCode": "002",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "MA",
    "name": "Morocco",
    "dialCode": "+212",
    "flag": "🇲🇦",
    "capital": "Rabat",
    "timezone": "Africa/Casablanca",
    "region": "Africa",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "GH",
    "name": "Ghana",
    "dialCode": "+233",
    "flag": "🇬🇭",
    "capital": "Accra",
    "timezone": "Africa/Accra",
    "region": "Africa",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "PE",
    "name": "Peru",
    "dialCode": "+51",
    "flag": "🇵🇪",
    "capital": "Lima",
    "timezone": "America/Lima",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "CZ",
    "name": "Czech Republic",
    "dialCode": "+420",
    "flag": "🇨🇿",
    "capital": "Prague",
    "timezone": "Europe/Prague",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "RO",
    "name": "Romania",
    "dialCode": "+40",
    "flag": "🇷🇴",
    "capital": "Bucharest",
    "timezone": "Europe/Bucharest",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  },
  {
    "countryCode": "HU",
    "name": "Hungary",
    "dialCode": "+36",
    "flag": "🇭🇺",
    "capital": "Budapest",
    "timezone": "Europe/Budapest",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "06"
  },
  {
    "countryCode": "IS",
    "name": "Iceland",
    "dialCode": "+354",
    "flag": "🇮🇸",
    "capital": "Reykjavik",
    "timezone": "Atlantic/Reykjavik",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "CR",
    "name": "Costa Rica",
    "dialCode": "+506",
    "flag": "🇨🇷",
    "capital": "San José",
    "timezone": "America/Costa_Rica",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "PA",
    "name": "Panama",
    "dialCode": "+507",
    "flag": "🇵🇦",
    "capital": "Panama City",
    "timezone": "America/Panama",
    "region": "Americas",
    "exitCode": "00",
    "trunkPrefix": ""
  },
  {
    "countryCode": "UA",
    "name": "Ukraine",
    "dialCode": "+380",
    "flag": "🇺🇦",
    "capital": "Kyiv",
    "timezone": "Europe/Kyiv",
    "region": "Europe",
    "exitCode": "00",
    "trunkPrefix": "0"
  }
];
