import { NextResponse } from 'next/server';
import { saveSchedule, deleteSchedule } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveSchedule(body, id);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Schedule batch not found for update' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Batch schedule updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteSchedule(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Schedule batch not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Batch schedule deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
