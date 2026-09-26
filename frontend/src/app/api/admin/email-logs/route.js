import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: [
      { id: 1, recipient: 'alex.reynolds@example.com', subject: 'Your PMP Enrollment Confirmation', status: 'delivered', sent_at: new Date().toISOString() }
    ]
  });
}
