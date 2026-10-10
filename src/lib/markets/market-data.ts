// Global Market Hours & Trading Sessions Engine

export interface StockExchange {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  flag: string;
  currency: string;
  timezone: string; // IANA timezone
  openHour: number; // e.g. 9.5 for 9:30 AM
  closeHour: number; // e.g. 16 for 4:00 PM
  preMarketOpen?: number;
  afterHoursClose?: number;
  lunchStart?: number;
  lunchEnd?: number;
  keyIndices: string[];
  descriptionEn: string;
  descriptionEs: string;
}

export interface ForexSession {
  id: string;
  name: string;
  city: string;
  flag: string;
  utcOpen: number; // UTC hour
  utcClose: number; // UTC hour
  volumeShare: string;
  majorPairs: string[];
  descriptionEn: string;
  descriptionEs: string;
}

export const STOCK_EXCHANGES: StockExchange[] = [
  {
    id: 'nyse',
    name: 'New York Stock Exchange (NYSE & NASDAQ)',
    shortName: 'NYSE / NASDAQ',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD ($)',
    timezone: 'America/New_York',
    openHour: 9.5, // 9:30 AM
    closeHour: 16.0, // 4:00 PM
    preMarketOpen: 4.0, // 4:00 AM
    afterHoursClose: 20.0, // 8:00 PM
    keyIndices: ['S&P 500', 'Nasdaq 100', 'Dow Jones'],
    descriptionEn: 'The world\'s largest financial equity market by market capitalization. Drives global investor sentiment and market direction.',
    descriptionEs: 'El mercado de valores más grande del mundo por capitalización bursátil. Dicta la tendencia de los mercados financieros globales.'
  },
  {
    id: 'lse',
    name: 'London Stock Exchange (LSE)',
    shortName: 'LSE',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP (£)',
    timezone: 'Europe/London',
    openHour: 8.0, // 8:00 AM
    closeHour: 16.5, // 4:30 PM
    keyIndices: ['FTSE 100', 'FTSE 250'],
    descriptionEn: 'The anchor of European finance. Overlaps with the US morning for the highest liquidity trading window of the day.',
    descriptionEs: 'El pilar del sistema financiero europeo. Su solapamiento con Nueva York representa la ventana de mayor liquidez del planeta.'
  },
  {
    id: 'nse',
    name: 'National Stock Exchange of India (NSE & BSE)',
    shortName: 'NSE / BSE',
    city: 'Mumbai',
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata',
    openHour: 9.25, // 9:15 AM
    closeHour: 15.5, // 3:30 PM
    preMarketOpen: 9.0, // 9:00 AM
    keyIndices: ['Nifty 50', 'Sensex', 'Bank Nifty'],
    descriptionEn: 'The premier exchange of the world\'s fastest-growing major economy. World\'s largest derivatives exchange by contract volume.',
    descriptionEs: 'La principal bolsa de la India y el mayor mercado de derivados por volumen de contratos del mundo.'
  },
  {
    id: 'tse',
    name: 'Tokyo Stock Exchange (TSE)',
    shortName: 'TSE',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY (¥)',
    timezone: 'Asia/Tokyo',
    openHour: 9.0, // 9:00 AM
    closeHour: 15.5, // 3:30 PM
    lunchStart: 11.5, // 11:30 AM
    lunchEnd: 12.5, // 12:30 PM
    keyIndices: ['Nikkei 225', 'TOPIX'],
    descriptionEn: 'The centerpiece of Asian equity markets. Observes a traditional 1-hour midday lunch break where trading pauses.',
    descriptionEs: 'El eje central del mercado asiático. Mantiene una pausa tradicional de almuerzo de una hora entre sesiones.'
  },
  {
    id: 'hkex',
    name: 'Hong Kong Exchanges and Clearing (HKEX)',
    shortName: 'HKEX',
    city: 'Hong Kong',
    country: 'Hong Kong',
    flag: '🇭🇰',
    currency: 'HKD (HK$)',
    timezone: 'Asia/Hong_Kong',
    openHour: 9.5, // 9:30 AM
    closeHour: 16.0, // 4:00 PM
    lunchStart: 12.0, // 12:00 PM
    lunchEnd: 13.0, // 1:00 PM
    keyIndices: ['Hang Seng Index', 'HSCEI'],
    descriptionEn: 'The vital financial gateway bridging international capital and mainland Chinese corporations.',
    descriptionEs: 'La puerta de entrada financiera que conecta el capital internacional con las grandes empresas de China continental.'
  },
  {
    id: 'xetra',
    name: 'Frankfurt Stock Exchange (Deutsche Börse / XETRA)',
    shortName: 'Deutsche Börse',
    city: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR (€)',
    timezone: 'Europe/Berlin',
    openHour: 9.0, // 9:00 AM
    closeHour: 17.5, // 5:30 PM
    keyIndices: ['DAX 40', 'MDAX'],
    descriptionEn: 'The economic engine of the European Union, home to Germany\'s leading industrial and technological giants.',
    descriptionEs: 'El motor económico de la Unión Europea y el hogar del índice DAX con los gigantes industriales de Alemania.'
  },
  {
    id: 'asx',
    name: 'Australian Securities Exchange (ASX)',
    shortName: 'ASX',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD (A$)',
    timezone: 'Australia/Sydney',
    openHour: 10.0, // 10:00 AM
    closeHour: 16.0, // 4:00 PM
    keyIndices: ['S&P/ASX 200', 'All Ordinaries'],
    descriptionEn: 'The first major developed market to ring the opening bell each calendar day, setting the tone for the Pacific region.',
    descriptionEs: 'El primer gran mercado desarrollado que abre la campana cada día, marcando el pulso en la cuenca del Pacífico.'
  }
];

export const FOREX_SESSIONS: ForexSession[] = [
  {
    id: 'london-session',
    name: 'London Session (European)',
    city: 'London',
    flag: '🇬🇧',
    utcOpen: 8,
    utcClose: 17,
    volumeShare: '38%',
    majorPairs: ['EUR/USD', 'GBP/USD', 'EUR/GBP', 'USD/CHF'],
    descriptionEn: 'The undisputed capital of currency trading. Accounts for nearly 40% of all global foreign exchange volume.',
    descriptionEs: 'La capital indiscutible del mercado de divisas. Concentra cerca del 40% del volumen mundial diario.'
  },
  {
    id: 'newyork-session',
    name: 'New York Session (North American)',
    city: 'New York',
    flag: '🇺🇸',
    utcOpen: 13,
    utcClose: 22,
    volumeShare: '19%',
    majorPairs: ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CAD'],
    descriptionEn: 'Driven by US economic indicators, interest rate decisions, and massive multi-national corporate fund flows.',
    descriptionEs: 'Impulsada por noticias económicas de la Reserva Federal, tipos de interés y flujos corporativos internacionales.'
  },
  {
    id: 'tokyo-session',
    name: 'Tokyo Session (Asian)',
    city: 'Tokyo',
    flag: '🇯🇵',
    utcOpen: 0,
    utcClose: 9,
    volumeShare: '6%',
    majorPairs: ['USD/JPY', 'EUR/JPY', 'AUD/JPY', 'NZD/USD'],
    descriptionEn: 'First major liquidity window to digest overnight news and Asian economic data announcements.',
    descriptionEs: 'La primera gran sesión que procesa noticias financieras nocturnas y decisiones del Banco de Japón.'
  },
  {
    id: 'sydney-session',
    name: 'Sydney Session (Pacific)',
    city: 'Sydney',
    flag: '🇦🇺',
    utcOpen: 22,
    utcClose: 7,
    volumeShare: '4%',
    majorPairs: ['AUD/USD', 'NZD/USD', 'AUD/JPY', 'EUR/AUD'],
    descriptionEn: 'Kicks off the global trading week on Sunday evening EST. Characterized by steady liquidity in commodity currencies.',
    descriptionEs: 'Abre la semana financiera mundial el domingo por la tarde. Clave para divisas ligadas a materias primas.'
  }
];

export type MarketStatusType = 'open' | 'pre-market' | 'after-hours' | 'lunch' | 'closed' | 'weekend';

export interface MarketStatus {
  status: MarketStatusType;
  statusLabelEn: string;
  statusLabelEs: string;
  countdownTextEn: string;
  countdownTextEs: string;
  progressPercent: number;
  localTimeStr: string;
  exchangeTimeStr: string;
}

/**
 * Calculates whether a stock exchange is currently open, closed, or in pre/post market.
 */
export function calculateExchangeStatus(exchange: StockExchange, now: Date): MarketStatus {
  try {
    // Format date in exchange timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: exchange.timezone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    const getVal = (type: string) => parts.find(p => p.type === type)?.value || '';

    const weekday = getVal('weekday'); // 'Mon', 'Tue', etc.
    const hour = parseInt(getVal('hour'), 10);
    const minute = parseInt(getVal('minute'), 10);
    const second = parseInt(getVal('second'), 10);

    const isWeekend = weekday === 'Sat' || weekday === 'Sun';
    const currentDecimalHour = hour + minute / 60 + second / 3600;

    // Exchange local time string
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: exchange.timezone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const exchangeTimeStr = timeFormatter.format(now);

    // Visitor local time string
    const localTimeStr = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);

    if (isWeekend) {
      return {
        status: 'weekend',
        statusLabelEn: 'Weekend (Closed)',
        statusLabelEs: 'Fin de Semana (Cerrado)',
        countdownTextEn: 'Opens Monday morning',
        countdownTextEs: 'Abre el lunes por la mañana',
        progressPercent: 0,
        localTimeStr,
        exchangeTimeStr
      };
    }

    // Check lunch break
    if (exchange.lunchStart && exchange.lunchEnd) {
      if (currentDecimalHour >= exchange.lunchStart && currentDecimalHour < exchange.lunchEnd) {
        const remainingMinutes = Math.round((exchange.lunchEnd - currentDecimalHour) * 60);
        return {
          status: 'lunch',
          statusLabelEn: 'Lunch Break (Paused)',
          statusLabelEs: 'Pausa de Almuerzo',
          countdownTextEn: `Resumes in ${remainingMinutes}m`,
          countdownTextEs: `Se reanuda en ${remainingMinutes}m`,
          progressPercent: 50,
          localTimeStr,
          exchangeTimeStr
        };
      }
    }

    // Check Normal Open Trading Hours
    if (currentDecimalHour >= exchange.openHour && currentDecimalHour < exchange.closeHour) {
      const totalTradingMinutes = (exchange.closeHour - exchange.openHour) * 60;
      const elapsedMinutes = (currentDecimalHour - exchange.openHour) * 60;
      const remainingMinutes = Math.max(0, Math.round(totalTradingMinutes - elapsedMinutes));

      const hrs = Math.floor(remainingMinutes / 60);
      const mins = remainingMinutes % 60;
      const timeRemaining = `${hrs}h ${mins}m`;

      return {
        status: 'open',
        statusLabelEn: 'Market Open',
        statusLabelEs: 'Mercado Abierto',
        countdownTextEn: `Closes in ${timeRemaining}`,
        countdownTextEs: `Cierra en ${timeRemaining}`,
        progressPercent: Math.min(100, Math.round((elapsedMinutes / totalTradingMinutes) * 100)),
        localTimeStr,
        exchangeTimeStr
      };
    }

    // Check Pre-market
    if (exchange.preMarketOpen && currentDecimalHour >= exchange.preMarketOpen && currentDecimalHour < exchange.openHour) {
      const remainingMinutes = Math.round((exchange.openHour - currentDecimalHour) * 60);
      const hrs = Math.floor(remainingMinutes / 60);
      const mins = remainingMinutes % 60;
      return {
        status: 'pre-market',
        statusLabelEn: 'Pre-Market Trading',
        statusLabelEs: 'Negociación Premercado',
        countdownTextEn: `Bell rings in ${hrs}h ${mins}m`,
        countdownTextEs: `Apertura oficial en ${hrs}h ${mins}m`,
        progressPercent: 15,
        localTimeStr,
        exchangeTimeStr
      };
    }

    // Check After-hours
    if (exchange.afterHoursClose && currentDecimalHour >= exchange.closeHour && currentDecimalHour < exchange.afterHoursClose) {
      const remainingMinutes = Math.round((exchange.afterHoursClose - currentDecimalHour) * 60);
      const hrs = Math.floor(remainingMinutes / 60);
      const mins = remainingMinutes % 60;
      return {
        status: 'after-hours',
        statusLabelEn: 'After-Hours Trading',
        statusLabelEs: 'Negociación Postmercado',
        countdownTextEn: `Ends in ${hrs}h ${mins}m`,
        countdownTextEs: `Finaliza en ${hrs}h ${mins}m`,
        progressPercent: 90,
        localTimeStr,
        exchangeTimeStr
      };
    }

    // Closed (Before opening or after closing)
    let hoursUntilOpen = 0;
    if (currentDecimalHour < exchange.openHour) {
      hoursUntilOpen = exchange.openHour - currentDecimalHour;
    } else {
      hoursUntilOpen = 24 - currentDecimalHour + exchange.openHour;
    }
    const minsUntilOpen = Math.round(hoursUntilOpen * 60);
    const hrs = Math.floor(minsUntilOpen / 60);
    const mins = minsUntilOpen % 60;

    return {
      status: 'closed',
      statusLabelEn: 'Market Closed',
      statusLabelEs: 'Mercado Cerrado',
      countdownTextEn: `Opens in ${hrs}h ${mins}m`,
      countdownTextEs: `Abre en ${hrs}h ${mins}m`,
      progressPercent: 0,
      localTimeStr,
      exchangeTimeStr
    };
  } catch {
    return {
      status: 'closed',
      statusLabelEn: 'Closed',
      statusLabelEs: 'Cerrado',
      countdownTextEn: 'Check tomorrow',
      countdownTextEs: 'Ver mañana',
      progressPercent: 0,
      localTimeStr: '',
      exchangeTimeStr: ''
    };
  }
}

/**
 * Checks if a 24/5 Forex session is currently active.
 */
export function isForexSessionActive(session: ForexSession, now: Date): boolean {
  const day = now.getUTCDay(); // 0 is Sunday, 6 is Saturday
  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;

  // Forex closes Friday 21:00 UTC and reopens Sunday 21:00 UTC
  if (day === 6) return false; // Saturday closed
  if (day === 0 && utcHour < 21) return false; // Sunday before 21:00 UTC closed
  if (day === 5 && utcHour >= 21) return false; // Friday after 21:00 UTC closed

  if (session.utcOpen < session.utcClose) {
    return utcHour >= session.utcOpen && utcHour < session.utcClose;
  } else {
    // Overnight session wrapping midnight (e.g. 22:00 to 07:00)
    return utcHour >= session.utcOpen || utcHour < session.utcClose;
  }
}
