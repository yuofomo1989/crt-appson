import { NextResponse } from 'next/server';
import { toggleUserStatus } from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const user = await toggleUserStatus(id);
    if (!user) {
      return NextResponse.json({ status: 'error', message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      status: 'success',
      message: `User status changed to ${user.is_active ? 'Active' : 'Suspended'}`,
      data: user
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
