import { NextResponse } from 'next/server';
import { savePopup, deletePopup } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await savePopup(body, id);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Popup campaign not found for update' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Marketing popup campaign updated successfully! 📢',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deletePopup(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Popup campaign not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Marketing popup campaign deleted successfully. 🗑️'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
