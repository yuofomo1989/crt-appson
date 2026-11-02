import { NextResponse } from 'next/server';
import testimonialsDb from '@/data/testimonials_db.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || searchParams.get('slug') || '';
  const limit = parseInt(searchParams.get('limit')) || 20;

  let list = testimonialsDb || [];

  if (page) {
    const slug = page.toLowerCase().trim();
    const filtered = list.filter(t => 
      Array.isArray(t.course_slugs) && t.course_slugs.some(s => s.toLowerCase().includes(slug) || slug.includes(s.toLowerCase()))
    );
    if (filtered.length > 0) {
      list = filtered;
    }
  }

  return NextResponse.json({
    status: 'success',
    total: list.length,
    data: list.slice(0, limit)
  });
}
