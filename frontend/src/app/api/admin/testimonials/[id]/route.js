import { NextResponse } from 'next/server';
import { saveTestimonial, deleteTestimonial } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveTestimonial(body, id);
    return NextResponse.json({ status: 'success', message: 'Testimonial updated successfully', data: updated });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteTestimonial(id);
    return NextResponse.json({ status: 'success', message: 'Testimonial deleted successfully' });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
