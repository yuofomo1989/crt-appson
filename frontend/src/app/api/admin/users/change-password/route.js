import { NextResponse } from 'next/server';
import { changeUserPassword } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const userId = body.user_id;
    const newPassword = body.new_password;
    if (!userId || !newPassword) {
      return NextResponse.json({ status: 'error', message: 'User ID and new password are required' }, { status: 400 });
    }
    const success = await changeUserPassword(userId, newPassword);
    if (!success) {
      return NextResponse.json({ status: 'error', message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: 'Admin security password changed and updated successfully! 🔐'
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
