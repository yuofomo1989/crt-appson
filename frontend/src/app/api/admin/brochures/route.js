import { NextResponse } from 'next/server';

const defaultBrochures = [
  { id: 1, course_id: 1, course_title: 'PMP® Certification', document_title: 'PMP Official Bootcamp Syllabus 2026', file_url: '/brochures/pmp-syllabus.pdf', file_size: '2.4 MB' },
  { id: 2, course_id: 2, course_title: 'CISSP® Certification', document_title: 'CISSP 8 Domains Curriculum Guide', file_url: '/brochures/cissp-syllabus.pdf', file_size: '3.1 MB' }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultBrochures });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
