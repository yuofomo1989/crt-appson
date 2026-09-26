import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveLead(body);
    return NextResponse.json({
      status: 'success',
      message: 'Consultation request received successfully',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
