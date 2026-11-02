import { NextResponse } from 'next/server';
import { getArticles, saveArticle } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let articles = await getArticles();

    if (category && category !== 'all') {
      const catLower = category.toLowerCase().trim();
      articles = articles.filter(a => 
        (a.category_name && a.category_name.toLowerCase().includes(catLower)) ||
        (a.category_slug && a.category_slug.toLowerCase() === catLower)
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      articles = articles.filter(a => 
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.author && a.author.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      status: 'success',
      total: articles.length,
      data: articles
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ status: 'error', message: 'Article title is required' }, { status: 400 });
    }
    const saved = await saveArticle(body);
    return NextResponse.json({
      status: 'success',
      message: 'Article published successfully',
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
