import { NextResponse } from 'next/server';
import { saveCourse, deleteCourse } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveCourse(body, id);
    return NextResponse.json({
      status: 'success',
      message: 'Course updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await deleteCourse(id);
    if (!deleted) {
      return NextResponse.json({ status: 'error', message: 'Course not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Course deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
