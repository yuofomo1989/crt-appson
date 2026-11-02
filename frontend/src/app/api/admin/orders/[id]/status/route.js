import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateOrderStatus(id, body.payment_status);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Order not found for status update' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Order payment status updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
