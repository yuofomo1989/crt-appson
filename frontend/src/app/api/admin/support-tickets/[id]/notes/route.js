import { NextResponse } from 'next/server';
import { addTicketNote } from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await addTicketNote(id, body.admin_notes || body.notes);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Ticket not found' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Internal admin note attached to ticket successfully! 📝',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
