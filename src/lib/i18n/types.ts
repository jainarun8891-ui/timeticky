export type Locale = 'en' | 'es';

export interface Dictionary {
  locale: Locale;
  common: {
    brandName: string;
    tagline: string;
    subTagline: string;
    searchPlaceholder: string;
    loading: string;
    copy: string;
    copied: string;
    share: string;
    shared: string;
    viewAll: string;
    backToHome: string;
    close: string;
    exploreTools: string;
    language: string;
    selectLanguage: string;
    english: string;
    spanish: string;
    day: string;
    night: string;
    today: string;
    tomorrow: string;
    yesterday: string;
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
    days: string;
    weeks: string;
    months: string;
    years: string;
  };
  navigation: {
    worldClock: string;
    converters: string;
    calculators: string;
    timers: string;
    maps: string;
    astronomy: string;
    developerApi: string;
    widgets: string;
    blog: string;
    about: string;
    contact: string;
    faq: string;
    privacy: string;
    terms: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    timeInYourLocation: string;
    synchronizedNtp: string;
    searchWorldCities: string;
    featuredToolsTitle: string;
    popularWorldClocks: string;
    faqSectionTitle: string;
  };
  clocks: {
    exactTimeTitle: string;
    analogClockTitle: string;
    fullscreenTitle: string;
    atomicClockTitle: string;
    clockAccuracyTitle: string;
    worldClockWallTitle: string;
    digitalPrecision: string;
    driftLabel: string;
    calibratedAt: string;
  };
  worldClock: {
    title: string;
    subtitle: string;
    addCities: string;
    searchCities: string;
    localTimesAroundWorld: string;
  };
  cityTime: {
    currentTimeIn: string;
    timezone: string;
    utcOffset: string;
    daylightSaving: string;
    sunriseSunset: string;
    coordinates: string;
    ianaIdentifier: string;
    timeDifferenceWithYou: string;
    hoursAhead: string;
    hoursBehind: string;
    sameTime: string;
  };
  timezoneConverter: {
    title: string;
    subtitle: string;
    convertTitle: string;
    fromLabel: string;
    toLabel: string;
    swap: string;
    shareLink: string;
    timeDifference: string;
    businessHoursOverlap: string;
    interactiveTimeline: string;
    browseAllCombos: string;
  };
  timer: {
    title: string;
    subtitle: string;
    start: string;
    pause: string;
    resume: string;
    reset: string;
    stop: string;
    preset1Min: string;
    preset5Min: string;
    preset10Min: string;
    preset15Min: string;
    preset30Min: string;
    preset1Hour: string;
  };
  stopwatch: {
    title: string;
    subtitle: string;
    start: string;
    stop: string;
    lap: string;
    reset: string;
    lapTimes: string;
  };
  countdown: {
    title: string;
    subtitle: string;
    createNew: string;
    eventName: string;
    targetDate: string;
    daysLeft: string;
    hoursLeft: string;
    minutesLeft: string;
    secondsLeft: string;
  };
  calculator: {
    sleepCalculatorTitle: string;
    meetingCostTitle: string;
    lifeInWeeksTitle: string;
    dateDifferenceTitle: string;
    dateCalculatorTitle: string;
    businessDaysTitle: string;
    birthdayTitle: string;
    optimalBedtimes: string;
    dollarBurnRate: string;
    weeksLived: string;
  };
  meetingPlanner: {
    title: string;
    subtitle: string;
    addParticipant: string;
    bestMeetingWindows: string;
    workingHours: string;
  };
  widgets: {
    title: string;
    subtitle: string;
    embedTitle: string;
    preview: string;
    copyEmbedCode: string;
    customization: string;
  };
  apiDocumentation: {
    title: string;
    subtitle: string;
    endpoints: string;
    authentication: string;
    pricing: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundDesc: string;
    returnHome: string;
  };
}
