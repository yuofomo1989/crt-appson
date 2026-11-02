import { NextResponse } from 'next/server';
import { deleteCoupon } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteCoupon(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Coupon not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Coupon code deleted successfully. 🗑️'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
