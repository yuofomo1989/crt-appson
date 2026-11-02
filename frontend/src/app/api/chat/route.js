import { NextResponse } from 'next/server';
import { createOrAppendChatTicket, getChatTicketById } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get('ticket_id') || searchParams.get('id');

    if (ticketId) {
      const ticket = await getChatTicketById(ticketId);
      if (!ticket) {
        return NextResponse.json({ success: false, message: 'Ticket not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        ticket
      });
    }

    // Default configuration and advisor availability
    return NextResponse.json({
      success: true,
      online: true,
      advisor: {
        name: 'Sarah Mitchell',
        role: 'Senior Learning Advisor',
        avatar: '/images/contact_support_agent.jpg',
        phone: '+1-855-322-1201',
        email: 'support@certificationplanner.com',
        hours: 'Mon - Fri 24/7 Live Advisory',
        accreditations: ['PMI® ATP #4168', 'AXELOS Partner', 'Scrum Alliance REP']
      }
    });
  } catch (error) {
    console.error('Chat GET Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { ticketId, name, email, phone, message, course_title, page_url, sender, sender_name } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 });
    }

    const ticket = await createOrAppendChatTicket({
      ticketId,
      name,
      email,
      phone,
      message: message.trim(),
      course_title,
      page_url,
      sender: sender || 'student',
      sender_name: sender_name || name || 'Visitor'
    });

    return NextResponse.json({
      success: true,
      ticket
    });
  } catch (error) {
    console.error('Chat POST Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process chat message' }, { status: 500 });
  }
}
