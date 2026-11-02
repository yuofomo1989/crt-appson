import { NextResponse } from 'next/server';
import { updateTicketStatus } from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateTicketStatus(id, body.status);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Ticket not found' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Ticket status updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
