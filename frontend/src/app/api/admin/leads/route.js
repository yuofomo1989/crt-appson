import { NextResponse } from 'next/server';
import { getLeads, saveLead } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ status: 'success', data: leads });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveLead(body);
    return NextResponse.json({ status: 'success', message: 'Lead saved', data: saved });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
