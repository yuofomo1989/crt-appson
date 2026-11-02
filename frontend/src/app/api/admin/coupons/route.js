import { NextResponse } from 'next/server';
import { getCoupons, saveCoupon } from '@/lib/db';

export async function GET() {
  try {
    const coupons = await getCoupons();
    return NextResponse.json({ status: 'success', data: coupons });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.code) {
      return NextResponse.json({ status: 'error', message: 'Coupon code is required' }, { status: 400 });
    }
    const saved = await saveCoupon(body);
    return NextResponse.json({
      status: 'success',
      message: 'Coupon code created and published successfully! 🎟️',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
