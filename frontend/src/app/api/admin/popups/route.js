import { NextResponse } from 'next/server';
import { getPopups, savePopup } from '@/lib/db';

export async function GET() {
  try {
    const popups = await getPopups();
    return NextResponse.json({
      status: 'success',
      total: popups.length,
      data: popups
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.title) {
      return NextResponse.json({ status: 'error', message: 'Campaign name and title are required' }, { status: 400 });
    }
    const saved = await savePopup(body);
    return NextResponse.json({
      status: 'success',
      message: 'Marketing popup campaign created successfully! 📢',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
