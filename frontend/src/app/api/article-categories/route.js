import { NextResponse } from 'next/server';

const defaultArticleCategories = [
  { id: 1, name: 'Project Management', description: 'Guides & insights on PMP, CAPM, Agile', icon_type: 'green' },
  { id: 2, name: 'Cybersecurity', description: 'CISSP, CISM, CEH tutorials & exam blueprints', icon_type: 'blue' }
];

export async function GET() {
  return NextResponse.json({ status: 'success', data: defaultArticleCategories });
}
