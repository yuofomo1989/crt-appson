import { NextResponse } from 'next/server';

const defaultTickets = [
  { id: 1, ticket_number: 'TKT-88421', name: 'Alex Reynolds', email: 'alex.reynolds@example.com', subject: 'Batch Rescheduling Request', category: 'Schedule Change', status: 'open', message: 'Hi Support, requesting transfer to next weekend batch.', created_at: new Date().toISOString() }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultTickets });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
