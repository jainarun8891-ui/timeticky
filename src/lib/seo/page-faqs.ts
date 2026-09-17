import { City } from '@/lib/geo/cities';
import { TimeZoneInfo } from '@/lib/time/timezones';
import { Country } from '@/lib/geo/countries';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// 1. Homepage Master FAQs
export const HOME_FAQS: FaqItem[] = [
  {
    question: "How accurate is the atomic clock on TimeNumbers?",
    answer: "TimeNumbers synchronizes with international Stratum-1 atomic clock servers utilizing Network Time Protocol (NTP) round-trip algorithms. Under ordinary broadband connections, our platform delivers an accuracy of within ±0.01 seconds (10 milliseconds) of Coordinated Universal Time (UTC)."
  },
  {
    question: "How does TimeNumbers determine my exact local time?",
    answer: "TimeNumbers queries your device's internal clock and compares it with our atomic time servers via WebSocket and HTTP round-trip timing (RTT). The system calculates the exact drift between your computer and true UTC, displaying your real local time with sub-second precision."
  },
  {
    question: "What is the difference between UTC and GMT?",
    answer: "Greenwich Mean Time (GMT) is an astronomical time zone historically based on solar noon at the Royal Observatory in Greenwich, London. Coordinated Universal Time (UTC) is a high-precision scientific time standard defined by International Atomic Time (TAI) and cesium-133 atomic vibrations. UTC never shifts for Daylight Saving Time."
  },
  {
    question: "How does the International Meeting Planner calculate overlap?",
    answer: "Our meeting overlap algorithm evaluates the standard business hours (typically 9:00 to 17:00 local time) across all selected participant cities simultaneously. It identifies the 'Golden Overlap Window' where participants can collaborate during daytime hours without sleep disruption."
  },
  {
    question: "When do clocks change for Daylight Saving Time in 2025?",
    answer: "In the United States and Canada, clocks spring forward by 1 hour on Sunday, March 9, 2025, and fall back on Sunday, November 2, 2025. In the European Union and the United Kingdom, clocks spring forward on Sunday, March 30, 2025, and fall back on Sunday, October 26, 2025."
  },
  {
    question: "Can I embed TimeNumbers clock widgets on my website?",
    answer: "Yes. TimeNumbers provides free, responsive embeddable HTML5 widgets via our /widgets directory. You can customize the theme (light or dark), colors, format (12h or 24h), and display options for any of the 500+ indexed world cities."
  }
];

// 2. Dynamic City FAQs
export function getCityFaqs(city: City): FaqItem[] {
  const isDstCandidate = ['FR', 'US', 'GB', 'DE', 'IT', 'ES', 'CA', 'AU'].includes(city.countryCode);
  const dstText = isDstCandidate
    ? `${city.name} observes Daylight Saving Time. Clocks advance by 1 hour in spring and turn back by 1 hour in autumn.`
    : `${city.name} does not observe Daylight Saving Time and maintains standard time throughout the entire year.`;

  return [
    {
      question: `What is the exact time in ${city.name}, ${city.country} right now?`,
      answer: `The current local time in ${city.name} is synchronized with atomic time on this page. TimeNumbers continuously updates the digital display to reflect the exact sub-second hour, minute, and second in ${city.name}.`
    },
    {
      question: `What time zone is ${city.name} in?`,
      answer: `${city.name} is located in the ${city.timezone} time zone. Its geographic coordinates are ${city.lat.toFixed(4)}° N, ${city.lng.toFixed(4)}° E.`
    },
    {
      question: `Does ${city.name} observe Daylight Saving Time (DST)?`,
      answer: dstText
    },
    {
      question: `How do I compare time between ${city.name} and other global cities?`,
      answer: `You can use the TimeNumbers Time Difference comparison engine or the Meeting Planner on this page to view live hours side-by-side between ${city.name}, New York, London, Tokyo, and 500+ global hubs.`
    },
    {
      question: `What are the standard business hours in ${city.name}?`,
      answer: `Standard corporate business hours in ${city.name} typically run from 09:00 to 17:00 or 18:00 local time, Monday through Friday.`
    }
  ];
}

// 3. Dynamic Timezone FAQs
export function getTimezoneFaqs(tz: TimeZoneInfo): FaqItem[] {
  return [
    {
      question: `What does ${tz.shortName} stand for and what is its UTC offset?`,
      answer: `${tz.shortName} stands for ${tz.name}. Its standard offset relative to Coordinated Universal Time is ${tz.formattedOffset}.`
    },
    {
      question: `Which major countries and world cities operate on ${tz.shortName}?`,
      answer: `Major hubs in this time zone include cities located in ${tz.countries.join(', ')}. Clocks across these regions regulate their civil time according to ${tz.shortName}.`
    },
    {
      question: `Does ${tz.shortName} observe Daylight Saving Time?`,
      answer: `Whether ${tz.shortName} shifts depends on local jurisdiction. Regions observing seasonal daylight time switch to their designated summer schedule during the spring and summer months.`
    },
    {
      question: `How do I convert ${tz.shortName} to UTC or EST?`,
      answer: `To convert ${tz.shortName} to UTC, subtract or add the offset (${tz.formattedOffset}). You can also use our interactive /time-zone-converter to automatically compute conversions for any date and time.`
    }
  ];
}

// 4. Dynamic Country FAQs
export function getCountryFaqs(country: Country): FaqItem[] {
  return [
    {
      question: `What is the official capital time of ${country.name}?`,
      answer: `The capital of ${country.name} is ${country.capital}. The primary administrative time zone is ${country.timezones[0]}.`
    },
    {
      question: `How many time zones does ${country.name} have?`,
      answer: `${country.name} spans ${country.timezones.length} official time zone${country.timezones.length > 1 ? 's' : ''}: ${country.timezones.join(', ')}.`
    },
    {
      question: `What currency and ISO codes are used in ${country.name}?`,
      answer: `${country.name} uses the ${country.currency}. Its international ISO two-letter country code is ${country.code}.`
    }
  ];
}

// 5. Tool-Specific FAQs
export const MEETING_PLANNER_FAQS: FaqItem[] = [
  {
    question: "How does the international meeting planner calculate the best time?",
    answer: "Our engine maps the local business hours (09:00–17:00) of each selected city onto a unified 24-hour UTC grid. It highlights overlapping working hours where all participants can join without working during late night or early morning."
  },
  {
    question: "Can I export meeting slots to Google Calendar or Outlook?",
    answer: "Yes. Once an optimal meeting time is selected, you can generate an instant Google Calendar event link or download a standard .ics calendar invite compatible with Apple Calendar, Microsoft Outlook, and Yahoo Calendar."
  },
  {
    question: "How do we handle teams spanning the Americas, Europe, and Asia?",
    answer: "When zero daytime overlap exists across three distant continents, we recommend rotating the weekly sync time so no single regional team permanently bears off-hours calls, or using asynchronous recorded memos."
  }
];

export const TIME_DIFFERENCE_FAQS: FaqItem[] = [
  {
    question: "How do I calculate the time difference between two cities?",
    answer: "To find the time difference, determine the UTC offset of each city and subtract the smaller offset from the larger one. TimeNumbers calculates this automatically, factoring in daylight saving schedules."
  },
  {
    question: "Why does the time difference between New York and London change in March?",
    answer: "The United States begins Daylight Saving Time on the second Sunday in March, while the UK begins British Summer Time on the last Sunday in March. For approximately three weeks each year, the time difference drops from 5 hours to 4 hours."
  }
];

export const DST_FAQS: FaqItem[] = [
  {
    question: "When do clocks spring forward and fall back in 2025?",
    answer: "In the United States and Canada, clocks advance by 1 hour on March 9, 2025, and turn back on November 2, 2025. In Europe and the UK, clocks advance on March 30, 2025, and turn back on October 26, 2025."
  },
  {
    question: "Which countries do not observe Daylight Saving Time?",
    answer: "Over 100 countries do not use DST, including Japan, China, India, Singapore, Russia, Turkey, Saudi Arabia, and most equatorial African and South American nations."
  },
  {
    question: "Why is Daylight Saving Time controversial?",
    answer: "Modern medical and chronobiology studies demonstrate that sudden one-hour sleep disruptions increase cardiovascular events, workplace injuries, and traffic accidents in the days immediately following the spring clock change."
  }
];

export const UNIX_TIME_FAQS: FaqItem[] = [
  {
    question: "What is a Unix timestamp?",
    answer: "A Unix timestamp (epoch time) represents the number of non-leap seconds that have elapsed since Thursday, January 1, 1970 at 00:00:00 UTC. It provides a standardized numeric format for computers and databases."
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Legacy 32-bit signed systems store time in an integer with a maximum capacity of 2,147,483,647. On January 19, 2038 at 03:14:07 UTC, this counter will overflow and wrap to negative numbers (December 13, 1901), potentially causing legacy computing failures."
  }
];

export const CLOCK_ACCURACY_FAQS: FaqItem[] = [
  {
    question: "How does TimeNumbers achieve sub-second atomic precision in a web browser?",
    answer: "Web browsers cannot directly query atomic clocks due to sandbox limitations. TimeNumbers uses precision round-trip time (RTT) algorithms to benchmark your local hardware clock against Stratum-1 NTP atomic servers, compensating for network latency down to ±0.01 seconds."
  },
  {
    question: "What is a Stratum 1 atomic time server?",
    answer: "Stratum 1 time servers are directly connected to Stratum 0 physical time standards, such as cesium-133 beam atomic clocks, rubidium frequency oscillators, or GPS satellite time receivers."
  }
];
