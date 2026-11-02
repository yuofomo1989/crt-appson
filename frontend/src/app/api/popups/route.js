import { NextResponse } from 'next/server';
import { getPopups } from '@/lib/db';

export async function GET() {
  try {
    const popups = await getPopups();
    // Return all popups so the client can evaluate target rules and active status
    return NextResponse.json({
      status: 'success',
      total: popups.length,
      data: popups
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
