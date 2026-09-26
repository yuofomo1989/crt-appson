import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      meta_title: 'Certification Planner | #1 Professional Training & Certification Bootcamps',
      meta_description: 'Get certified in PMP, CISSP, AWS, Scrum with 100% pass guarantee bootcamps.',
      meta_keywords: 'PMP certification, CISSP training, AWS bootcamp, Scrum Master',
      og_image: 'https://certificationplanner.com/og-banner.jpg'
    }
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
