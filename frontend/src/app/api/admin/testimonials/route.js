import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial } from '@/lib/db';

export async function GET() {
  try {
    const list = await getTestimonials();
    return NextResponse.json({
      status: 'success',
      total: list.length,
      data: list
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ status: 'error', message: 'Name and testimonial content are required' }, { status: 400 });
    }
    const saved = await saveTestimonial(body);
    return NextResponse.json({
      status: 'success',
      message: 'Testimonial created successfully',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
