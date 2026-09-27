import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ status: 'success', data: settings });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
