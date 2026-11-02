import { NextResponse } from 'next/server';
import { getSupportTickets } from '@/lib/db';

export async function GET() {
  try {
    const tickets = await getSupportTickets();
    return NextResponse.json({ status: 'success', data: tickets });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: 'success', data: body });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
