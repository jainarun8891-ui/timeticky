import { getOffsetMinutes } from '../time/timezones';

export interface Participant {
  name: string;
  timezone: string;
  workStartHour: number; // e.g. 9
  workEndHour: number;   // e.g. 17
}

export interface MeetingSlot {
  utcHour: number;
  localTimes: Record<string, string>;
  isConvenientForAll: boolean;
  score: "Excellent" | "Good" | "Possible" | "Poor";
}

export function evaluateMeetingSlots(participants: Participant[]): MeetingSlot[] {
  const slots: MeetingSlot[] = [];
  const now = new Date();

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    const localTimes: Record<string, string> = {};
    let convenientCount = 0;
    let workableCount = 0;

    participants.forEach(p => {
      const offsetMin = getOffsetMinutes(now, p.timezone);
      const localTotalMinutes = (utcHour * 60 + offsetMin + 1440 * 2) % 1440;
      const localHour = Math.floor(localTotalMinutes / 60);
      const localMin = localTotalMinutes % 60;
      const formatted = `${String(localHour).padStart(2, '0')}:${String(localMin).padStart(2, '0')}`;
      localTimes[p.timezone] = formatted;

      if (localHour >= p.workStartHour && localHour < p.workEndHour) {
        convenientCount++;
        workableCount++;
      } else if (localHour >= 8 && localHour < 21) {
        workableCount++;
      }
    });

    let score: MeetingSlot["score"] = "Poor";
    if (convenientCount === participants.length) {
      score = "Excellent";
    } else if (workableCount === participants.length) {
      score = "Good";
    } else if (workableCount >= Math.ceil(participants.length * 0.7)) {
      score = "Possible";
    }

    slots.push({
      utcHour,
      localTimes,
      isConvenientForAll: score === "Excellent",
      score
    });
  }

  return slots;
}

export function generateICS(title: string, dateStr: string, startHourUtc: number, durationHours: number): string {
  const date = new Date(dateStr);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const startH = String(startHourUtc).padStart(2, '0');
  const endH = String((startHourUtc + durationHours) % 24).padStart(2, '0');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GlobalTime//Meeting Planner//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DTSTART:${y}${m}${d}T${startH}0000Z`,
    `DTEND:${y}${m}${d}T${endH}0000Z`,
    'DESCRIPTION:Scheduled via GlobalTime Meeting Planner',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function generateGoogleCalendarUrl(title: string, dateStr: string, startHourUtc: number, durationHours: number): string {
  const date = new Date(dateStr);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const startH = String(startHourUtc).padStart(2, '0');
  const endH = String((startHourUtc + durationHours) % 24).padStart(2, '0');
  const startIso = `${y}${m}${d}T${startH}0000Z`;
  const endIso = `${y}${m}${d}T${endH}0000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent("Scheduled via GlobalTime")}`;
}
