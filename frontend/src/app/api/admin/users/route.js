import { NextResponse } from 'next/server';
import { getUsers, saveUser } from '@/lib/db';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ status: 'success', data: users });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const saved = await saveUser(body);
    return NextResponse.json({ status: 'success', message: 'User created successfully', data: saved });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
