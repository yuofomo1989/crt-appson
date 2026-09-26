import { NextResponse } from 'next/server';

const defaultInstructors = [
  { id: 1, name: "Dr. Gregory Hayes", certs: "PMP, PgMP, PMI-ACP", exp_years: "18+ Yrs Exp", rating: 4.9, students_count: 1420, bio: "Senior project director and PMI accredited master instructor.", status: "active" },
  { id: 2, name: "Sarah L. Jenkins", certs: "CISSP, CISM, CCSP", exp_years: "15+ Yrs Exp", rating: 4.9, students_count: 980, bio: "Cybersecurity consultant and former federal information systems advisor.", status: "active" }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultInstructors });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', data: body });
}
