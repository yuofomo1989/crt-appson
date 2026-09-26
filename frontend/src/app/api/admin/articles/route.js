import { NextResponse } from 'next/server';

const defaultArticles = [
  { id: 1, title: 'How to Pass the PMP Exam on Your First Attempt in 2026', slug: 'how-to-pass-pmp-exam-first-attempt', category_name: 'Project Management', author: 'Certification Planner Editorial', is_featured: true, created_at: new Date().toISOString() },
  { id: 2, title: 'Top 5 In-Demand Cybersecurity Certifications for 2026', slug: 'top-cybersecurity-certifications-2026', category_name: 'Cybersecurity', author: 'Information Security Team', is_featured: true, created_at: new Date().toISOString() }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultArticles });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
