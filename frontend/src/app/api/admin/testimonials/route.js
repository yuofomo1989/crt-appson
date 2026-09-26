import { NextResponse } from 'next/server';

const defaultTestimonials = [
  { id: 1, name: "Marcus Vance", role: "VP of Technology", company: "FinTech Solutions", content: "The PMP bootcamp was exceptionally organized. Passed my exam on the first try with Above Target ratings in all 3 domains!", rating: 5, course_id: 1, is_featured: true },
  { id: 2, name: "Elena Rostova", role: "Principal Cloud Architect", company: "Datacom Systems", content: "Hands-on labs and real-world exam simulators made the AWS Solutions Architect certification achievable within 3 weeks.", rating: 5, course_id: 2, is_featured: true }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultTestimonials });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
