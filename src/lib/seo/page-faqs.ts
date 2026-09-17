import { City } from '@/lib/geo/cities';
import { TimeZoneInfo } from '@/lib/time/timezones';
import { Country } from '@/lib/geo/countries';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// 1. Homepage Master FAQs (Humanized, high-intent Google PAA)
export const HOME_FAQS: FaqItem[] = [
  {
    question: "How accurate is the atomic clock on TimeNumbers?",
    answer: "TimeNumbers synchronizes directly with international Stratum-1 atomic clock networks. On any standard broadband or mobile connection, the time you see is accurate within approximately 10 milliseconds (0.01 seconds) of true Coordinated Universal Time (UTC). It is reliable enough for syncing mechanical watches, bidding on time-sensitive auctions, and coordinating international broadcasts."
  },
  {
    question: "How does TimeNumbers find my exact local time?",
    answer: "When you visit TimeNumbers, our system measures the tiny network round-trip time between your browser and our atomic time servers. We instantly detect if your computer or phone clock is drifting fast or slow, and apply a real-time calibration offset so you always see the exact second without installing any software."
  },
  {
    question: "What is the real difference between UTC and GMT?",
    answer: "While GMT (Greenwich Mean Time) and UTC (Coordinated Universal Time) share the exact same current hour and minute, they represent different concepts. GMT is an astronomical time zone tied to the Earth's rotation at the Royal Observatory in Greenwich, London. UTC is the official international scientific standard governed by high-precision atomic clocks. Neither UTC nor GMT ever shifts for Daylight Saving Time."
  },
  {
    question: "How does the International Meeting Planner find the best overlap time?",
    answer: "Our meeting planner takes the work schedules of everyone on your team—usually 9:00 AM to 5:00 PM in their local cities—and aligns them along a 24-hour visual bar. The planner automatically highlights the sweet spot where everyone is awake and working during daylight hours, so you never accidentally schedule a call during a teammate's midnight."
  },
  {
    question: "When do clocks change for Daylight Saving Time in 2026 and 2027?",
    answer: "In the United States and Canada, clocks spring forward 1 hour on the second Sunday in March (March 8, 2026 / March 14, 2027) and fall back on the first Sunday in November (November 1, 2026 / November 7, 2027). In the European Union and the UK, clocks spring forward on the last Sunday in March (March 29, 2026 / March 28, 2027) and fall back on the last Sunday in October (October 25, 2026 / October 31, 2027)."
  },
  {
    question: "Can I add free TimeNumbers clock widgets to my own website?",
    answer: "Yes, completely free! You can embed clean, responsive clock widgets from our /widgets directory. Pick any of our 500+ world cities, customize the colors, choose between light or dark mode, and toggle 12-hour or 24-hour formats. Simply copy and paste the snippet into your site, blog, or intranet."
  }
];

// 2. Dynamic City FAQs (Humanized for travelers & remote workers)
export function getCityFaqs(city: City): FaqItem[] {
  const isDstCandidate = ['FR', 'US', 'GB', 'DE', 'IT', 'ES', 'CA', 'AU', 'NZ'].includes(city.countryCode);
  const dstText = isDstCandidate
    ? `${city.name} observes Daylight Saving Time. Clocks jump forward by one hour in the spring to make the most of evening daylight, and fall back by one hour in autumn.`
    : `${city.name} stays on standard time all year round with no daylight saving clock shifts.`;

  return [
    {
      question: `What is the exact time in ${city.name}, ${city.country} right now?`,
      answer: `The live clock above shows the exact current local time in ${city.name}, synchronized to the atomic second with official time servers. The digital display updates continuously in real time.`
    },
    {
      question: `What time zone does ${city.name} use?`,
      answer: `${city.name} operates in the ${city.timezone} time zone (located at coordinates ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°). You can check its current offset from UTC in the header banner.`
    },
    {
      question: `Does ${city.name} change clocks for Daylight Saving Time?`,
      answer: dstText
    },
    {
      question: `What are typical business hours in ${city.name}?`,
      answer: `Offices and businesses in ${city.name} generally operate from 9:00 AM to 5:00 PM (or 6:00 PM) local time, Monday through Friday. When scheduling cross-border meetings, lunch typically occurs between 12:00 PM and 2:00 PM.`
    },
    {
      question: `How do I compare time between ${city.name} and my city?`,
      answer: `Use the interactive converter bar right on this page, or click any major city comparison to see side-by-side hours, daylight windows, and 1-click meeting scheduling links.`
    }
  ];
}

// 3. Dynamic Timezone FAQs
export function getTimezoneFaqs(tz: TimeZoneInfo): FaqItem[] {
  return [
    {
      question: `What does ${tz.shortName} stand for and what is its UTC offset?`,
      answer: `${tz.shortName} stands for ${tz.name}. Its civil time is currently offset by ${tz.formattedOffset} relative to Coordinated Universal Time (UTC).`
    },
    {
      question: `Which major countries and world cities operate on ${tz.shortName}?`,
      answer: `Major hubs and regions observing ${tz.shortName} include ${tz.countries.join(', ')}. Millions of people organize their daily business, transport schedules, and civil life according to this timezone.`
    },
    {
      question: `Does ${tz.shortName} shift for Daylight Saving Time?`,
      answer: `Whether clocks change depends on local laws in each country. Some regions observing ${tz.shortName} switch to a summer schedule for part of the year, while others remain on fixed standard time.`
    },
    {
      question: `How do I quickly convert ${tz.shortName} to other timezones?`,
      answer: `You can use our visual Time Zone Converter directory to browse all 552 popular timezone pairings, scrub across a 24-hour timeline, and export meeting times directly to your calendar.`
    }
  ];
}

// 4. Dynamic Country FAQs
export function getCountryFaqs(country: Country): FaqItem[] {
  return [
    {
      question: `What is the capital city time of ${country.name}?`,
      answer: `The capital of ${country.name} is ${country.capital}, located in the ${country.timezones[0]} time zone.`
    },
    {
      question: `How many time zones does ${country.name} span?`,
      answer: `${country.name} covers ${country.timezones.length} official time zone${country.timezones.length > 1 ? 's' : ''}: ${country.timezones.join(', ')}.`
    },
    {
      question: `What currency and country codes are used in ${country.name}?`,
      answer: `${country.name} uses the ${country.currency}. Its international two-letter ISO country code is ${country.code}.`
    }
  ];
}

// 5. Tool-Specific FAQs
export const MEETING_PLANNER_FAQS: FaqItem[] = [
  {
    question: "How does the international meeting planner find the best call time?",
    answer: "Our planner lays out the typical 9:00 AM to 5:00 PM working hours for every participant side-by-side on a synchronized 24-hour strip. It automatically highlights the shared green overlap hours where no one has to wake up early or stay up late."
  },
  {
    question: "Can I export my selected meeting slot to Google Calendar or Outlook?",
    answer: "Yes! Once you pick an hour, click either 'Google Calendar' or 'Download .ics' to create an instant event invite with all regional times clearly labeled for your attendees."
  },
  {
    question: "What if our team members have zero overlapping daytime hours?",
    answer: "When teams are separated by 10 to 12 hours (like San Francisco and Singapore), a daytime overlap may not exist. In those cases, teams typically alternate who takes an early morning or evening call each week, or use asynchronous video and chat updates."
  }
];

export const TIME_DIFFERENCE_FAQS: FaqItem[] = [
  {
    question: "How do I calculate the time difference between two cities?",
    answer: "Find the UTC offset for each location and subtract the earlier time from the later time. TimeNumbers computes this automatically, taking into account any active daylight saving shifts so you never have to do mental math."
  },
  {
    question: "Why does the time difference between London and New York change in March?",
    answer: "The United States switches to Daylight Saving Time on the second Sunday in March, while the United Kingdom switches to British Summer Time on the last Sunday in March. During those few weeks in between, the gap shrinks from 5 hours down to 4 hours."
  }
];

export const DST_FAQS: FaqItem[] = [
  {
    question: "When do clocks spring forward and fall back?",
    answer: "In North America, clocks spring forward 1 hour on the second Sunday in March and fall back on the first Sunday in November. In Europe and the UK, clocks spring forward on the last Sunday in March and fall back on the last Sunday in October."
  },
  {
    question: "Which major countries do not observe Daylight Saving Time?",
    answer: "Over 100 countries never change their clocks, including Japan, India, China, Singapore, Brazil, Saudi Arabia, and most nations near the equator where daylight remains relatively steady throughout the year."
  },
  {
    question: "Why do some regions want to end Daylight Saving Time?",
    answer: "Health studies have found that sudden one-hour clock shifts disrupt sleep rhythms and lead to short-term spikes in heart attacks, fatigue, and road accidents in the days following the spring change. Many legislatures are considering permanent standard time."
  }
];

export const UNIX_TIME_FAQS: FaqItem[] = [
  {
    question: "What is a Unix timestamp?",
    answer: "A Unix timestamp is simply the total number of seconds that have passed since midnight UTC on January 1, 1970 (known as the Unix Epoch). It gives programmers a universal, timezone-independent way to store dates in databases and software."
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Older 32-bit computer systems store time using numbers that max out at 2,147,483,647 seconds. On January 19, 2038, that counter will roll over to a negative number, potentially confusing legacy systems unless they are upgraded to modern 64-bit timestamps."
  }
];

export const CLOCK_ACCURACY_FAQS: FaqItem[] = [
  {
    question: "How does TimeNumbers achieve atomic clock precision in a web browser?",
    answer: "While web browsers cannot talk to atomic clocks directly, TimeNumbers continuously measures the round-trip signal time between your device and official Stratum-1 time servers. By compensating for network delay, we display the true atomic second within roughly 10 milliseconds."
  },
  {
    question: "What is a Stratum-1 atomic time server?",
    answer: "A Stratum-1 time server is connected directly to physical atomic clocks—such as cesium beam standards, rubidium oscillators, or GPS satellite constellations—delivering the gold standard of global timekeeping."
  }
];
