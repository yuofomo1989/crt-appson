import { NextResponse } from 'next/server';
import { deleteTicket } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteTicket(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Ticket not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Support ticket deleted successfully. 🗑️'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
