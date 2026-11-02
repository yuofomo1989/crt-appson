import { NextResponse } from 'next/server';
import articles from '@/data/articles_db.json';

export async function GET() {
  try {
    const catCounts = {};
    (articles || []).forEach(a => {
      const name = a.category_name || 'General Insights';
      const slug = a.category_slug || 'general';
      if (!catCounts[name]) {
        catCounts[name] = {
          name,
          slug,
          count: 0
        };
      }
      catCounts[name].count++;
    });

    const result = Object.values(catCounts).map((c, i) => ({
      id: i + 1,
      name: c.name,
      slug: c.slug,
      count: c.count,
      description: `Articles & comprehensive guides on ${c.name}`
    }));

    return NextResponse.json({ status: 'success', data: result });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
