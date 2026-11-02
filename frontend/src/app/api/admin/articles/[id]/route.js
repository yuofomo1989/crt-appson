import { NextResponse } from 'next/server';
import { getArticleById, saveArticle, deleteArticle } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ status: 'error', message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data: article });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveArticle(body, id);
    if (!updated) {
      return NextResponse.json({ status: 'error', message: 'Article not found for update' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', message: 'Article updated successfully', data: updated });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const success = await deleteArticle(id);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'Article not found for deletion' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', message: 'Article deleted successfully' });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
