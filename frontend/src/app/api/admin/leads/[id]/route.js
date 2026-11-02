import { NextResponse } from 'next/server';
import { deleteLead } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteLead(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Lead not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Lead inquiry deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
