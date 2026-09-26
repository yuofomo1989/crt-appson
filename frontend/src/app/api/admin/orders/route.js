import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ status: 'success', data: orders });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ status: 'success', message: 'Order created', data: body });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
