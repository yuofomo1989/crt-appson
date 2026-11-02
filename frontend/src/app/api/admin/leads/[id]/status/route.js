import { NextResponse } from 'next/server';
import { updateLeadStatus } from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateLeadStatus(id, body.status, body.notes);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Lead not found for status/notes update' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Lead inquiry updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
