import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      smtp: {
        smtp_host: 'smtp.gmail.com',
        smtp_port: 587,
        smtp_encryption: 'tls',
        smtp_username: '',
        from_address: 'support@certificationplanner.com',
        from_name: 'Certification Planner'
      },
      templates: {},
      metrics: { total_sent: 142, delivered: 139, bounced: 3 }
    }
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ status: 'success', message: 'Email settings saved', data: body });
}
