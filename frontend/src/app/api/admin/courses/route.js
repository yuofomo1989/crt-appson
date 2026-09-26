import { NextResponse } from 'next/server';
import { getCourses, saveCourse } from '@/lib/db';

export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json({ status: 'success', data: courses });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveCourse(body);
    return NextResponse.json({ status: 'success', message: 'Course created', data: saved });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
