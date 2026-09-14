import { NextRequest, NextResponse } from 'next/server';
import { getTimeDetails, getUtcOffsetMinutes, getTimeDifferenceText } from '@/lib/time/engine';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fromTz = searchParams.get('from') || 'UTC';
  const toParam = searchParams.get('to') || 'Europe/London';
  const timeParam = searchParams.get('time') || '12:00';
  const dateParam = searchParams.get('date');

  try {
    const destinations = toParam.split(',').map(s => s.trim()).filter(Boolean);

    // Parse base date/time
    const [hStr, mStr] = timeParam.split(':');
    const hours = parseInt(hStr || '12', 10);
    const minutes = parseInt(mStr || '0', 10);

    const baseDate = dateParam ? new Date(dateParam) : new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const fromDetails = getTimeDetails(fromTz, baseDate);
    const fromOffsetMins = getUtcOffsetMinutes(fromTz, baseDate);

    const converted = destinations.map(destTz => {
      try {
        const destOffsetMins = getUtcOffsetMinutes(destTz, baseDate);
        const diffMinutes = destOffsetMins - fromOffsetMins;
        const targetDate = new Date(baseDate.getTime() + diffMinutes * 60 * 1000);
        const destDetails = getTimeDetails(destTz, targetDate);

        // Day comparison
        let dayShift = 'same_day';
        if (destDetails.day > fromDetails.day || (destDetails.day === 1 && fromDetails.day > 25)) {
          dayShift = 'next_day';
        } else if (destDetails.day < fromDetails.day || (fromDetails.day === 1 && destDetails.day > 25)) {
          dayShift = 'previous_day';
        }

        return {
          timezone: destTz,
          time: `${String(destDetails.hours).padStart(2, '0')}:${String(destDetails.minutes).padStart(2, '0')}`,
          formatted12h: `${destDetails.hours % 12 || 12}:${String(destDetails.minutes).padStart(2, '0')} ${destDetails.hours >= 12 ? 'PM' : 'AM'}`,
          date: `${destDetails.year}-${String(destDetails.month).padStart(2, '0')}-${String(destDetails.day).padStart(2, '0')}`,
          utcOffset: destDetails.utcOffsetString,
          abbreviation: destDetails.abbreviation,
          diffMinutes,
          diffHours: Math.round((diffMinutes / 60) * 10) / 10,
          dayShift,
        };
      } catch (e) {
        return {
          timezone: destTz,
          error: `Could not convert to timezone: ${destTz}`,
        };
      }
    });

    return NextResponse.json({
      status: 'success',
      source: {
        timezone: fromTz,
        inputTime: `${String(fromDetails.hours).padStart(2, '0')}:${String(fromDetails.minutes).padStart(2, '0')}`,
        inputDate: `${fromDetails.year}-${String(fromDetails.month).padStart(2, '0')}-${String(fromDetails.day).padStart(2, '0')}`,
        utcOffset: fromDetails.utcOffsetString,
        abbreviation: fromDetails.abbreviation,
      },
      conversions: converted,
      rateLimit: {
        tier: 'anonymous',
        limit: '100 requests per minute',
        remaining: 99,
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: 'Invalid conversion parameters provided.',
    }, { status: 400 });
  }
}
