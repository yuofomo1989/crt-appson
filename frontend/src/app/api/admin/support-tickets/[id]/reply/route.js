import { NextResponse } from 'next/server';
import { addTicketReply } from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await addTicketReply(id, body);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Ticket not found' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Support reply delivered successfully! 💬',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
