<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupportTicketController extends Controller
{
    /**
     * Submit a new support ticket (Public / Student Portal)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => 'nullable|string|max:50',
            'request_type' => 'required|string|max:100',
            'related_to'   => 'nullable|string|max:255',
            'subject'      => 'required|string|max:255',
            'description'  => 'required|string',
            'source_path'  => 'nullable|string|max:255',
            'priority'     => 'nullable|string|in:low,medium,high,urgent'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Generate a human-readable unique Ticket ID, e.g. TKT-2026-4821
        do {
            $ticketNumber = 'TKT-' . date('Y') . '-' . mt_rand(1000, 9999);
        } while (SupportTicket::where('ticket_number', $ticketNumber)->exists());

        $data = $request->all();
        $data['ticket_number'] = $ticketNumber;
        $data['source_path']   = $request->input('source_path', '/profile > Raise a Request Modal');
        $data['status']        = 'open';
        $data['priority']      = $request->input('priority', 'medium');
        $data['messages']      = [
            [
                'id'          => 1,
                'sender'      => 'student',
                'sender_name' => $request->name,
                'message'     => $request->description,
                'created_at'  => date('Y-m-d H:i:s')
            ],
            [
                'id'          => 2,
                'sender'      => 'support',
                'sender_name' => 'Certification Planner Support',
                'message'     => 'Thank you for reaching out to Certification Planner Support. We have received your request (#' . $ticketNumber . '). Our dedicated support team is reviewing your query and will reply shortly.',
                'created_at'  => date('Y-m-d H:i:s')
            ]
        ];

        $ticket = SupportTicket::create($data);

        // Auto trigger ticket confirmation email to student + support team alert
        EmailService::sendTemplateEmail('ticket_created', $request->email, $request->name, [
            'ticket_number' => $ticketNumber,
            'student_name'  => $request->name,
            'student_email' => $request->email,
            'related_to'    => $request->related_to ?? 'General Support',
            'subject'       => $request->subject,
            'description'   => $request->description
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Support Ticket ' . $ticketNumber . ' created successfully!',
            'data'    => $ticket
        ], 201);
    }

    /**
     * Get all tickets (For Admin Portal)
     */
    public function index(Request $request)
    {
        $query = SupportTicket::latest();

        if ($request->has('status') && $request->status !== 'all' && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('email') && !empty($request->email)) {
            $query->where('email', $request->email);
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ticket_number', 'LIKE', "%{$search}%")
                  ->orWhere('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('subject', 'LIKE', "%{$search}%")
                  ->orWhere('related_to', 'LIKE', "%{$search}%")
                  ->orWhere('source_path', 'LIKE', "%{$search}%");
            });
        }

        $tickets = $query->get();

        return response()->json([
            'status' => 'success',
            'data'   => $tickets,
            'counts' => [
                'total'       => SupportTicket::count(),
                'open'        => SupportTicket::where('status', 'open')->count(),
                'in_progress' => SupportTicket::where('status', 'in_progress')->count(),
                'resolved'    => SupportTicket::where('status', 'resolved')->count(),
                'closed'      => SupportTicket::where('status', 'closed')->count(),
            ]
        ]);
    }

    /**
     * Update ticket status (For Admin)
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:open,in_progress,resolved,closed'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $ticket = SupportTicket::find($id);
        if (!$ticket) {
            return response()->json(['status' => 'error', 'message' => 'Ticket not found'], 404);
        }

        $ticket->status = $request->status;
        $ticket->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Ticket status updated to ' . $request->status,
            'data'    => $ticket
        ]);
    }

    /**
     * Add admin notes / resolution notes
     */
    public function updateNotes(Request $request, $id)
    {
        $ticket = SupportTicket::find($id);
        if (!$ticket) {
            return response()->json(['status' => 'error', 'message' => 'Ticket not found'], 404);
        }

        $note = $request->input('admin_notes', '');
        $ticket->admin_notes = $note;

        if (!empty($note)) {
            $existing = $ticket->messages ?? [];
            if (empty($existing) && !empty($ticket->description)) {
                $existing[] = [
                    'id'          => 1,
                    'sender'      => 'student',
                    'sender_name' => $ticket->name,
                    'message'     => $ticket->description,
                    'created_at'  => $ticket->created_at ? $ticket->created_at->format('Y-m-d H:i:s') : date('Y-m-d H:i:s')
                ];
            }
            $existing[] = [
                'id'          => count($existing) + 1,
                'sender'      => 'support',
                'sender_name' => 'Support Team',
                'message'     => $note,
                'created_at'  => date('Y-m-d H:i:s')
            ];
            $ticket->messages = $existing;
        }

        $ticket->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Admin notes saved successfully',
            'data'    => $ticket
        ]);
    }

    /**
     * Add a message / reply to the ticket conversation (Two-way communication)
     */
    public function addReply(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'message'     => 'required|string',
            'sender'      => 'nullable|string|in:student,support',
            'sender_name' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $ticket = SupportTicket::find($id);
        if (!$ticket) {
            return response()->json(['status' => 'error', 'message' => 'Ticket not found'], 404);
        }

        $existing = $ticket->messages ?? [];
        if (empty($existing) && !empty($ticket->description)) {
            $existing[] = [
                'id'          => 1,
                'sender'      => 'student',
                'sender_name' => $ticket->name,
                'message'     => $ticket->description,
                'created_at'  => $ticket->created_at ? $ticket->created_at->format('Y-m-d H:i:s') : date('Y-m-d H:i:s')
            ];
        }

        $sender = $request->input('sender', 'student');
        $senderName = $request->input('sender_name', $sender === 'support' ? 'Support Team' : $ticket->name);

        $existing[] = [
            'id'          => count($existing) + 1,
            'sender'      => $sender,
            'sender_name' => $senderName,
            'message'     => $request->input('message'),
            'created_at'  => date('Y-m-d H:i:s')
        ];

        $ticket->messages = $existing;

        if ($sender === 'support') {
            $ticket->admin_notes = $request->input('message');
            if ($ticket->status === 'open') {
                $ticket->status = 'in_progress';
            }
        } else {
            // Student replied: if it was resolved or closed, change back to in_progress
            if ($ticket->status === 'resolved' || $ticket->status === 'closed') {
                $ticket->status = 'in_progress';
            }

            // Automatic acknowledgement from Support Team
            $existing[] = [
                'id'          => count($existing) + 1,
                'sender'      => 'support',
                'sender_name' => 'Certification Planner Support',
                'message'     => 'Thank you for your update. Our support team has received your message and will review and reply shortly.',
                'created_at'  => date('Y-m-d H:i:s')
            ];
            $ticket->messages = $existing;
        }

        $ticket->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Reply sent successfully!',
            'data'    => $ticket
        ]);
    }

    /**
     * Delete a support ticket
     */
    public function destroy($id)
    {
        $ticket = SupportTicket::find($id);
        if (!$ticket) {
            return response()->json(['status' => 'error', 'message' => 'Ticket not found'], 404);
        }

        $ticket->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Ticket deleted successfully'
        ]);
    }
}
