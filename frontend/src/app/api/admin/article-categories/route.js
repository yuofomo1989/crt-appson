import { NextResponse } from 'next/server';
import { getArticleCategories, saveArticleCategory } from '@/lib/db';

export async function GET() {
  try {
    const categories = await getArticleCategories();
    return NextResponse.json({
      status: 'success',
      total: categories.length,
      data: categories
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ status: 'error', message: 'Category name is required' }, { status: 400 });
    }
    const saved = await saveArticleCategory(body);
    return NextResponse.json({
      status: 'success',
      message: 'Resource category created successfully',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
