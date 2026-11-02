import { NextResponse } from 'next/server';
import { updateLeadStatus } from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const lead = await updateLeadStatus(id, 'contacted', `Sent ${body.course_title || 'Course'} Brochure. ${body.custom_note || ''}`.trim());
    return NextResponse.json({
      status: 'success',
      message: `Course brochure email dispatched to student successfully! 📩`,
      data: lead
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
