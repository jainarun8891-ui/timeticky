import { City } from '@/lib/geo/cities';
import { getCityTemporalData, CityTimeData, FaqItem } from '@/lib/seo/page-faqs';
import { getTimeDifference, getUtcOffsetString } from '@/lib/time/timezones';

export function getCityFaqsEs(input: CityTimeData | City): FaqItem[] {
  const data: CityTimeData = 'cityName' in input && !('lat' in input)
    ? (input as CityTimeData)
    : getCityTemporalData(input as City);

  const faqs: FaqItem[] = [];

  faqs.push({
    question: `¿En qué zona horaria se encuentra ${data.cityName}, ${data.country}?`,
    answer: `${data.cityName} opera bajo el huso horario ${data.timezoneAbbr}, con una compensación de ${data.baseOffset}. ${
      data.observesDST
        ? `Debido a que ${data.cityName} observa el cambio de horario de verano, este desfase cambia en los meses estivales.`
        : `A diferencia de otras zonas, ${data.cityName} no cambia su reloj en verano, manteniendo su desfase horario constante todo el año.`
    }`,
  });

  if (data.observesDST && data.nextDSTChange) {
    const accion = data.dstAction === 'forward' ? 'adelantar' : 'retrasar';
    faqs.push({
      question: `¿Cuándo empieza o termina el horario de verano en ${data.cityName}?`,
      answer: `El próximo cambio de hora oficial en ${data.cityName} será el ${data.nextDSTChange}. En esa fecha, los residentes deberán ${accion} sus relojes una hora.`,
    });
  } else {
    faqs.push({
      question: `¿Cambia la hora en ${data.cityName} por el horario de verano?`,
      answer: `No. ${data.cityName} no aplica el horario de verano (DST). La hora oficial se mantiene invariable durante los 365 días del año sin modificaciones de primavera ni otoño.`,
    });
  }

  faqs.push({
    question: `¿Cuál es la diferencia horaria entre ${data.cityName} y UTC?`,
    answer: `La hora local en ${data.cityName} tiene un desplazamiento de ${data.baseOffset} respecto al Tiempo Universal Coordinado (UTC). Si en UTC son las 12:00 del mediodía, en ${data.cityName} el reloj marca exactamente la compensación asignada a su huso horario.`,
  });

  faqs.push({
    question: `¿Cómo verificar la hora exacta en ${data.cityName} en tiempo real?`,
    answer: `El reloj digital de TimeNumbers se sincroniza automáticamente con servidores NTP de Estrato 1 y relojes atómicos oficiales. La hora de ${data.cityName} se actualiza segundo a segundo compensando cualquier latencia de red o desfase de tu dispositivo.`,
  });

  return faqs;
}

export function getCityDifferenceFaqsEs(cityA: City, cityB: City, date = new Date()): FaqItem[] {
  const diff = getTimeDifference(cityA.timezone, cityB.timezone, date);
  const tzA = getUtcOffsetString(date, cityA.timezone);
  const tzB = getUtcOffsetString(date, cityB.timezone);

  const faqs: FaqItem[] = [];

  if (diff.isEqual) {
    faqs.push({
      question: `¿Cuál es la diferencia de hora entre ${cityA.name} y ${cityB.name}?`,
      answer: `${cityA.name} y ${cityB.name} comparten la misma zona horaria (${tzA}). No hay ninguna diferencia horaria entre ambas ciudades.`,
    });
  } else if (diff.isAhead) {
    faqs.push({
      question: `¿Cuántas horas de diferencia hay entre ${cityA.name} y ${cityB.name}?`,
      answer: `${cityB.name} va ${Math.abs(diff.diffHours)} horas por delante de ${cityA.name}. Cuando en ${cityA.name} empieza la jornada, en ${cityB.name} es más tarde.`,
    });
  } else {
    faqs.push({
      question: `¿Cuántas horas de diferencia hay entre ${cityA.name} y ${cityB.name}?`,
      answer: `${cityB.name} va ${Math.abs(diff.diffHours)} horas por detrás de ${cityA.name}. Cuando en ${cityA.name} es mediodía, en ${cityB.name} aún es más temprano.`,
    });
  }

  faqs.push({
    question: `¿Cómo coordinar reuniones entre ${cityA.name} y ${cityB.name}?`,
    answer: `Utiliza la línea de tiempo interactiva de TimeNumbers para localizar las franjas verdes de solapamiento laboral donde ambas ciudades se encuentran despiertas y en horario de oficina.`,
  });

  faqs.push({
    question: `¿Afecta el horario de verano a la diferencia horaria entre ${cityA.name} y ${cityB.name}?`,
    answer: `Sí. Si una de las dos regiones cambia su huso horario en primavera u otoño y la otra no lo hace simultáneamente, la diferencia horaria entre ${cityA.name} y ${cityB.name} puede variar en una hora durante varias semanas.`,
  });

  return faqs;
}
