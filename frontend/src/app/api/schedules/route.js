import { NextResponse } from 'next/server';
import { getSchedules, saveSchedule } from '@/lib/db';

export async function GET() {
  try {
    const schedules = await getSchedules();
    return NextResponse.json({ status: 'success', data: schedules });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveSchedule(body, body.id || null);
    return NextResponse.json({ status: 'success', message: 'Schedule saved', data: saved });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
