import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveOrder(body);
    return NextResponse.json({
      status: 'success',
      message: 'Order created successfully',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
