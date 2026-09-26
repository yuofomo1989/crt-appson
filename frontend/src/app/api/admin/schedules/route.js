import { NextResponse } from 'next/server';
import { getSchedules } from '@/lib/db';

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
    return NextResponse.json({ status: 'success', message: 'Schedule created', data: body });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
