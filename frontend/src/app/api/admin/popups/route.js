import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: [
      { id: 1, title: 'Summer Executive Flash Sale', subtitle: 'Get $200 off any bootcamp with code EXECUTIVE200', coupon_code: 'EXECUTIVE200', trigger_delay: 15, is_active: true }
    ]
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
