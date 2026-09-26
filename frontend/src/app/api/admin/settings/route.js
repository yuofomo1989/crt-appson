import { NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ status: 'success', data: settings });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = await saveSiteSettings(body);
    return NextResponse.json({ status: 'success', message: 'Settings saved', data: updated });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
