import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 0;

    const articles = await getArticles();
    let result = articles || [];

    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      result = result.filter(a => 
        (a.category_name && a.category_name.toLowerCase().includes(catLower)) ||
        (a.category_slug && a.category_slug.toLowerCase() === catLower)
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(a => 
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q))
      );
    }

    if (limit > 0) {
      result = result.slice(0, limit);
    }

    return NextResponse.json({
      status: 'success',
      total: result.length,
      data: result
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
