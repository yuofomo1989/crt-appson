import { NextResponse } from 'next/server';

const defaultCoupons = [
  { id: 1, code: 'EXECUTIVE10', discount_type: 'percentage', discount_value: 10, valid_until: '2026-12-31', is_active: true },
  { id: 2, code: 'FLASH15', discount_type: 'percentage', discount_value: 15, valid_until: '2026-12-31', is_active: true }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultCoupons });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', message: 'Coupon saved', data: body });
}
