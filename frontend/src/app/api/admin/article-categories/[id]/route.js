import { NextResponse } from 'next/server';
import { deleteArticleCategory } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteArticleCategory(id);
    return NextResponse.json({ status: 'success', message: 'Category deleted successfully' });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
