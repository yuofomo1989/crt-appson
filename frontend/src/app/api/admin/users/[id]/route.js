import { NextResponse } from 'next/server';
import { saveUser, deleteUser } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveUser(body, id);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'User not found for update' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'User details updated successfully',
      data: updated
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteUser(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'User not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'User account deleted successfully'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
