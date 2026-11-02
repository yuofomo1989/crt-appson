import { NextResponse } from 'next/server';
import { deleteBrochure } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteBrochure(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Brochure not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Course brochure document deleted successfully. 🗑️'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
