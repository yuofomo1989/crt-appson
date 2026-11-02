import { NextResponse } from 'next/server';
import { deleteOrder } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteOrder(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Order not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Order record deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
