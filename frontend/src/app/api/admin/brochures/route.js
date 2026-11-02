import { NextResponse } from 'next/server';
import { getBrochures, saveBrochure } from '@/lib/db';

export async function GET() {
  try {
    const brochures = await getBrochures();
    return NextResponse.json({ status: 'success', data: brochures });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.document_title) {
      return NextResponse.json({ status: 'error', message: 'Document title is required' }, { status: 400 });
    }
    const saved = await saveBrochure(body);
    return NextResponse.json({
      status: 'success',
      message: 'Course brochure document uploaded and linked successfully! 📄',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
