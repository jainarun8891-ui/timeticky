/**
 * Timezone VS Comparison Data Engine
 * Powers high-intent Google "Position 0" snippet queries (e.g., 'cst vs est', 'gmt vs utc')
 */

export interface TimezoneVsPair {
  slug: string;
  zoneA: string;
  zoneB: string;
  nameA: string;
  nameB: string;
  ianaA: string;
  ianaB: string;
  offsetHours: number; // zoneB minus zoneA (e.g. EST is +1 hr ahead of CST, so offset is +1 from A to B)
  quickAnswerEn: string;
  quickAnswerEs: string;
  detailsEn: {
    heading: string;
    text: string;
    dstExplanation: string;
    regionsA: string[];
    regionsB: string[];
  };
  detailsEs: {
    heading: string;
    text: string;
    dstExplanation: string;
    regionsA: string[];
    regionsB: string[];
  };
}

export const TIMEZONE_VS_PAIRS: Record<string, TimezoneVsPair> = {
  'cst-vs-est': {
    slug: 'cst-vs-est',
    zoneA: 'CST',
    zoneB: 'EST',
    nameA: 'Central Standard Time',
    nameB: 'Eastern Standard Time',
    ianaA: 'America/Chicago',
    ianaB: 'America/New_York',
    offsetHours: 1,
    quickAnswerEn: 'Central Standard Time (CST) is exactly 1 hour behind Eastern Standard Time (EST). When it is 12:00 PM EST in New York, it is 11:00 AM CST in Chicago.',
    quickAnswerEs: 'La hora estándar central (CST) está exactamente 1 hora por detrás de la hora estándar oriental (EST). Cuando son las 12:00 PM EST en Nueva York, son las 11:00 AM CST en Chicago.',
    detailsEn: {
      heading: 'Difference Between CST and EST in Plain English',
      text: 'Both Central Time and Eastern Time are adjacent major North American time zones. Eastern Time is always 1 hour ahead of Central Time. If you live in Chicago or Dallas (Central) and need to join a meeting organized in New York or Miami (Eastern), remember to tune in 1 hour earlier according to your local clock.',
      dstExplanation: 'Both zones observe Daylight Saving Time on the exact same schedule (springing forward in March, falling back in November), shifting together to CDT (UTC-5) and EDT (UTC-4). This means they are always separated by exactly 1 hour all year round.',
      regionsA: ['Illinois (Chicago)', 'Texas (Houston, Dallas)', 'Minnesota (Minneapolis)', 'Tennessee (Nashville)', 'Louisiana (New Orleans)'],
      regionsB: ['New York (NYC)', 'Florida (Miami, Orlando)', 'Georgia (Atlanta)', 'Washington D.C.', 'Massachusetts (Boston)'],
    },
    detailsEs: {
      heading: 'Diferencia entre CST y EST en Palabras Sencillas',
      text: 'Tanto la zona Central como la Oriental son dos de los husos horarios más poblados de Norteamérica. La hora del Este (EST) siempre está 1 hora por delante de la hora Central (CST). Si estás en Chicago o Ciudad de México y tienes una llamada en Nueva York o Miami, debes conectarte 1 hora antes según tu reloj local.',
      dstExplanation: 'Ambas zonas aplican el horario de verano en las mismas fechas en EE. UU., pasando a CDT y EDT. Por esta razón, la diferencia se mantiene constante en 1 hora durante todo el año.',
      regionsA: ['Illinois (Chicago)', 'Texas (Dallas, Houston)', 'Minnesota', 'Tennessee', 'Luisiana'],
      regionsB: ['Nueva York', 'Florida (Miami)', 'Georgia (Atlanta)', 'Washington D.C.', 'Boston'],
    }
  },

  'pst-vs-mst': {
    slug: 'pst-vs-mst',
    zoneA: 'PST',
    zoneB: 'MST',
    nameA: 'Pacific Standard Time',
    nameB: 'Mountain Standard Time',
    ianaA: 'America/Los_Angeles',
    ianaB: 'America/Denver',
    offsetHours: 1,
    quickAnswerEn: 'Pacific Standard Time (PST) is exactly 1 hour behind Mountain Standard Time (MST). When it is 12:00 PM MST in Denver, it is 11:00 AM PST in Los Angeles.',
    quickAnswerEs: 'La hora estándar del Pacífico (PST) está exactamente 1 hora por detrás de la hora estándar de la montaña (MST). Cuando son las 12:00 PM MST en Denver, son las 11:00 AM PST en Los Ángeles.',
    detailsEn: {
      heading: 'Difference Between PST and MST in Plain English',
      text: 'Pacific Time covers the US West Coast, while Mountain Time covers the Rocky Mountain corridor. Mountain Time is always 1 hour ahead of Pacific Time (with the special exception of Arizona, which does not observe Daylight Saving Time and stays on Mountain Standard Time year-round).',
      dstExplanation: 'Except for most of Arizona, both zones change clocks together in March and November. When active, they become PDT (UTC-7) and MDT (UTC-6).',
      regionsA: ['California (Los Angeles, SF)', 'Washington (Seattle)', 'Oregon (Portland)', 'Nevada (Las Vegas)', 'British Columbia (Vancouver)'],
      regionsB: ['Colorado (Denver)', 'Utah (Salt Lake City)', 'Arizona (Phoenix - No DST)', 'New Mexico (Albuquerque)', 'Alberta (Calgary)'],
    },
    detailsEs: {
      heading: 'Diferencia entre PST y MST en Palabras Sencillas',
      text: 'La hora del Pacífico abarca la costa oeste de EE. UU., mientras que la hora de la Montaña cubre la región de las Montañas Rocosas. MST está 1 hora por delante de PST (con excepción de Arizona, que no cambia al horario de verano).',
      dstExplanation: 'Salvo en Arizona, ambas zonas adelantan y atrasan sus relojes al unísono en marzo y noviembre.',
      regionsA: ['California (Los Ángeles, San Francisco)', 'Washington (Seattle)', 'Nevada (Las Vegas)', 'Oregón'],
      regionsB: ['Colorado (Denver)', 'Utah (Salt Lake City)', 'Arizona (Phoenix)', 'Nuevo México'],
    }
  },

  'cst-vs-pst': {
    slug: 'cst-vs-pst',
    zoneA: 'PST',
    zoneB: 'CST',
    nameA: 'Pacific Standard Time',
    nameB: 'Central Standard Time',
    ianaA: 'America/Los_Angeles',
    ianaB: 'America/Chicago',
    offsetHours: 2,
    quickAnswerEn: 'Pacific Standard Time (PST) is exactly 2 hours behind Central Standard Time (CST). When it is 2:00 PM CST in Chicago, it is 12:00 PM PST in Los Angeles.',
    quickAnswerEs: 'La hora estándar del Pacífico (PST) está exactamente 2 horas por detrás de la hora estándar central (CST). Cuando son las 2:00 PM CST en Chicago, son las 12:00 PM PST en Los Ángeles.',
    detailsEn: {
      heading: 'Difference Between PST and CST in Plain English',
      text: 'Central Time is 2 hours ahead of Pacific Time. Scheduling cross-country meetings between California and Texas or Illinois means accommodating this two-hour difference: an 9:00 AM start in San Francisco is already 11:00 AM in Chicago.',
      dstExplanation: 'Both zones transition to Daylight Saving Time simultaneously, meaning the 2-hour gap never changes throughout the year.',
      regionsA: ['California', 'Washington', 'Oregon', 'Nevada'],
      regionsB: ['Texas', 'Illinois', 'Minnesota', 'Missouri', 'Wisconsin'],
    },
    detailsEs: {
      heading: 'Diferencia entre PST y CST en Palabras Sencillas',
      text: 'La hora Central está 2 horas por delante de la hora del Pacífico. Una reunión a las 9:00 AM en Los Ángeles corresponde a las 11:00 AM en Chicago o Dallas.',
      dstExplanation: 'Ambas zonas cambian al horario de verano al mismo tiempo, manteniendo la diferencia de 2 horas invariable.',
      regionsA: ['California', 'Washington', 'Nevada', 'Oregón'],
      regionsB: ['Texas', 'Illinois', 'Misuri', 'Wisconsin'],
    }
  },

  'edt-vs-est': {
    slug: 'edt-vs-est',
    zoneA: 'EST',
    zoneB: 'EDT',
    nameA: 'Eastern Standard Time',
    nameB: 'Eastern Daylight Time',
    ianaA: 'America/New_York',
    ianaB: 'America/New_York',
    offsetHours: 1,
    quickAnswerEn: 'Eastern Daylight Time (EDT, UTC-4) is 1 hour ahead of Eastern Standard Time (EST, UTC-5). EDT is observed during spring and summer, while EST is observed during autumn and winter.',
    quickAnswerEs: 'La hora de verano oriental (EDT, UTC-4) está 1 hora por delante de la hora estándar oriental (EST, UTC-5). EDT se utiliza en primavera y verano, mientras que EST rige en otoño e invierno.',
    detailsEn: {
      heading: 'Difference Between EST and EDT Explained Simply',
      text: 'EST and EDT represent the same physical geographical region at different times of the year! During standard time (November to March), the clock is set to EST (UTC-5). In the spring (second Sunday in March), clocks "spring forward" by one hour to EDT (UTC-4) to capture more evening sunlight.',
      dstExplanation: 'They are never observed simultaneously in the same US city. When daylight saving begins, EST ends and EDT takes over.',
      regionsA: ['Observed November through March in New York, Miami, Atlanta, Toronto, Montreal.'],
      regionsB: ['Observed March through November in the exact same East Coast cities.'],
    },
    detailsEs: {
      heading: 'Diferencia entre EST y EDT en Palabras Claras',
      text: 'EST y EDT son la misma región geográfica pero en distintas épocas del año. En invierno rige EST (hora estándar), y en primavera se adelanta el reloj una hora para pasar a EDT (horario de verano).',
      dstExplanation: 'No ocurren a la vez en la misma ciudad: cuando empieza el horario de verano, EST da paso a EDT.',
      regionsA: ['De noviembre a marzo en Nueva York, Miami, Atlanta, Toronto.'],
      regionsB: ['De marzo a noviembre en las mismas ciudades de la costa este.'],
    }
  },

  'pdt-vs-pst': {
    slug: 'pdt-vs-pst',
    zoneA: 'PST',
    zoneB: 'PDT',
    nameA: 'Pacific Standard Time',
    nameB: 'Pacific Daylight Time',
    ianaA: 'America/Los_Angeles',
    ianaB: 'America/Los_Angeles',
    offsetHours: 1,
    quickAnswerEn: 'Pacific Daylight Time (PDT, UTC-7) is 1 hour ahead of Pacific Standard Time (PST, UTC-8). PDT is observed during spring and summer, while PST is observed during autumn and winter.',
    quickAnswerEs: 'La hora de verano del Pacífico (PDT, UTC-7) está 1 hora por delante de la hora estándar del Pacífico (PST, UTC-8). PDT se aplica en primavera y verano, mientras que PST rige en otoño e invierno.',
    detailsEn: {
      heading: 'Difference Between PST and PDT in Plain English',
      text: 'PST and PDT represent the US West Coast (California, Washington, Oregon, Nevada) in winter and summer respectively. When Daylight Saving Time begins in March, people set their clocks forward one hour, switching from PST to PDT.',
      dstExplanation: 'PST is UTC-8 and PDT is UTC-7. They alternate cyclically twice each year.',
      regionsA: ['Observed November to March in Los Angeles, San Francisco, Seattle, Las Vegas, Vancouver.'],
      regionsB: ['Observed March to November in the exact same West Coast cities.'],
    },
    detailsEs: {
      heading: 'Diferencia entre PST y PDT en Palabras Claras',
      text: 'PST y PDT representan la costa oeste estadounidense en invierno y verano. Al comenzar el horario de verano en marzo, los relojes se adelantan una hora pasando de PST a PDT.',
      dstExplanation: 'PST es UTC-8 y PDT es UTC-7. Se alternan dos veces al año.',
      regionsA: ['De noviembre a marzo en Los Ángeles, San Francisco, Seattle, Las Vegas.'],
      regionsB: ['De marzo a noviembre en las mismas ciudades del Pacífico.'],
    }
  },

  'gmt-vs-utc': {
    slug: 'gmt-vs-utc',
    zoneA: 'UTC',
    zoneB: 'GMT',
    nameA: 'Coordinated Universal Time',
    nameB: 'Greenwich Mean Time',
    ianaA: 'UTC',
    ianaB: 'Etc/GMT',
    offsetHours: 0,
    quickAnswerEn: 'GMT and UTC share the exact same time (0 hours difference). The difference is that UTC is a high-precision scientific atomic time standard, while GMT is a civil time zone observed in the UK, Ireland, and parts of Africa.',
    quickAnswerEs: 'GMT y UTC comparten exactamente la misma hora (0 horas de diferencia). La distinción es que UTC es un estándar atómico y científico de referencia, mientras que GMT es un huso horario civil utilizado en el Reino Unido e Irlanda.',
    detailsEn: {
      heading: 'What is the Difference Between GMT and UTC?',
      text: 'For everyday timekeeping, GMT and UTC are practically identical: when it is 15:00 UTC, it is also 15:00 GMT. However, technically speaking, UTC (Coordinated Universal Time) is maintained by global atomic clocks and does not change. GMT (Greenwich Mean Time) is a solar civil time zone anchored to the Royal Observatory in Greenwich, London.',
      dstExplanation: 'Neither UTC nor GMT observe Daylight Saving Time. However, the United Kingdom switches from GMT to BST (British Summer Time, UTC+1) during summer months.',
      regionsA: ['Scientific standard used in aviation, GPS, software, and international servers.'],
      regionsB: ['Civil time used in the UK (winter), Ireland, Portugal (winter), Ghana, Iceland.'],
    },
    detailsEs: {
      heading: '¿Cuál es la Diferencia entre GMT y UTC?',
      text: 'En la práctica cotidiana, GMT y UTC tienen la misma hora. No obstante, UTC es el estándar atómico mundial de medición científica, mientras que GMT es un huso horario civil tradicional.',
      dstExplanation: 'Ni UTC ni GMT cambian por horario de verano. En verano, el Reino Unido cambia de GMT a BST (UTC+1).',
      regionsA: ['Estándar científico usado en aviación, servidores y satélites.'],
      regionsB: ['Huso horario civil en Reino Unido (invierno), Portugal, Islandia y África occidental.'],
    }
  },

  'cet-vs-cest': {
    slug: 'cet-vs-cest',
    zoneA: 'CET',
    zoneB: 'CEST',
    nameA: 'Central European Time',
    nameB: 'Central European Summer Time',
    ianaA: 'Europe/Paris',
    ianaB: 'Europe/Paris',
    offsetHours: 1,
    quickAnswerEn: 'Central European Summer Time (CEST, UTC+2) is 1 hour ahead of Central European Time (CET, UTC+1). CEST is active during summer, while CET is active during winter.',
    quickAnswerEs: 'La hora de verano de Europa Central (CEST, UTC+2) está 1 hora por delante de la hora de Europa Central (CET, UTC+1). CEST está activo en verano y CET en invierno.',
    detailsEn: {
      heading: 'Difference Between CET and CEST in Plain English',
      text: 'CET (UTC+1) is standard winter time across most of continental Western and Central Europe (France, Germany, Spain, Italy, Netherlands, Poland). On the last Sunday in March, clocks spring forward 1 hour to CEST (UTC+2) to make evenings longer.',
      dstExplanation: 'On the last Sunday of October, clocks fall back 1 hour from CEST back to CET.',
      regionsA: ['Observed late October to late March in Paris, Berlin, Madrid, Rome, Amsterdam, Warsaw.'],
      regionsB: ['Observed late March to late October in the exact same European capitals.'],
    },
    detailsEs: {
      heading: 'Diferencia entre CET y CEST en Palabras Claras',
      text: 'CET (UTC+1) es la hora estándar de invierno en gran parte de Europa continental (España, Francia, Alemania, Italia). El último domingo de marzo los relojes se adelantan una hora pasando a CEST (UTC+2).',
      dstExplanation: 'El último domingo de octubre se retrasa una hora el reloj, volviendo de CEST a CET.',
      regionsA: ['De octubre a marzo en Madrid, París, Berlín, Roma, Ámsterdam.'],
      regionsB: ['De marzo a octubre en las mismas capitales europeas.'],
    }
  },

  'aest-vs-aedt': {
    slug: 'aest-vs-aedt',
    zoneA: 'AEST',
    zoneB: 'AEDT',
    nameA: 'Australian Eastern Standard Time',
    nameB: 'Australian Eastern Daylight Time',
    ianaA: 'Australia/Sydney',
    ianaB: 'Australia/Sydney',
    offsetHours: 1,
    quickAnswerEn: 'Australian Eastern Daylight Time (AEDT, UTC+11) is 1 hour ahead of Australian Eastern Standard Time (AEST, UTC+10). AEDT is active during the Southern Hemisphere summer (October to April).',
    quickAnswerEs: 'La hora de verano del este de Australia (AEDT, UTC+11) está 1 hora por delante de la hora estándar (AEST, UTC+10). AEDT rige durante el verano austral (de octubre a abril).',
    detailsEn: {
      heading: 'Difference Between AEST and AEDT Explained',
      text: 'Because Australia is in the Southern Hemisphere, its seasons are reversed compared to North America and Europe! AEST (UTC+10) is observed in winter (April to October). In October, Sydney and Melbourne spring forward to AEDT (UTC+11). Note that Queensland (Brisbane) does not observe daylight saving and stays on AEST all year.',
      dstExplanation: 'Clocks shift on the first Sunday in October (forward to AEDT) and first Sunday in April (back to AEST).',
      regionsA: ['Sydney, Melbourne, Brisbane (year-round), Canberra, Hobart.'],
      regionsB: ['Sydney, Melbourne, Canberra, Hobart (October through April).'],
    },
    detailsEs: {
      heading: 'Diferencia entre AEST y AEDT en Palabras Claras',
      text: 'Al estar en el hemisferio sur, las estaciones en Australia están invertidas. AEST (UTC+10) es el horario de invierno (abril a octubre), mientras que AEDT (UTC+11) rige en el verano austral (octubre a abril).',
      dstExplanation: 'Los relojes se adelantan en octubre y se atrasan en abril en Sídney y Melbourne.',
      regionsA: ['Sídney, Melbourne, Brisbane (todo el año), Canberra.'],
      regionsB: ['Sídney, Melbourne, Canberra (de octubre a abril).'],
    }
  },

  'ist-vs-gmt': {
    slug: 'ist-vs-gmt',
    zoneA: 'GMT',
    zoneB: 'IST',
    nameA: 'Greenwich Mean Time',
    nameB: 'India Standard Time',
    ianaA: 'Etc/GMT',
    ianaB: 'Asia/Kolkata',
    offsetHours: 5.5,
    quickAnswerEn: 'India Standard Time (IST, UTC+5:30) is exactly 5 hours and 30 minutes ahead of Greenwich Mean Time (GMT, UTC+0). When it is 12:00 PM GMT in London, it is 5:30 PM IST in New Delhi.',
    quickAnswerEs: 'La hora estándar de la India (IST, UTC+5:30) está exactamente 5 horas y 30 minutos por delante de Greenwich Mean Time (GMT, UTC+0). Cuando son las 12:00 PM GMT en Londres, son las 5:30 PM IST en Nueva Delhi.',
    detailsEn: {
      heading: 'Difference Between IST and GMT in Plain English',
      text: 'India operates on a half-hour offset (UTC+5:30) rather than a whole-hour shift. This single unified timezone covers the entire country of India, spanning 1.4 billion people from Kashmir to Tamil Nadu and Gujarat to Assam.',
      dstExplanation: 'India does not observe Daylight Saving Time. GMT does not change either, keeping the difference constant at +5 hours 30 minutes in winter (though London switches to BST in summer, reducing the UK-India difference to 4 hours 30 minutes).',
      regionsA: ['United Kingdom (winter), Iceland, Portugal (winter), Ghana.'],
      regionsB: ['Entire Republic of India (New Delhi, Mumbai, Bengaluru, Chennai, Kolkata).'],
    },
    detailsEs: {
      heading: 'Diferencia entre IST y GMT en Palabras Claras',
      text: 'La India utiliza un huso horario con desfase de media hora (UTC+5:30). Todo el territorio de la India se rige bajo esta misma hora oficial unificada.',
      dstExplanation: 'La India no utiliza horario de verano. La diferencia con GMT se mantiene fija en 5 horas y 30 minutos durante el invierno británico.',
      regionsA: ['Reino Unido (invierno), Islandia, Portugal.'],
      regionsB: ['Toda la India (Nueva Delhi, Bombay, Bangalore, Calcuta).'],
    }
  },
};
