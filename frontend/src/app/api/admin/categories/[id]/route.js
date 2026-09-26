import { NextResponse } from 'next/server';
import { saveCategory, deleteCategory } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveCategory(body, id);
    return NextResponse.json({
      status: 'success',
      message: 'Category updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteCategory(id);
    return NextResponse.json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
