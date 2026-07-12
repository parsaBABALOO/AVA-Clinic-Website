import { NextResponse } from "next/server";
import { Database } from "@/lib/db";

/**
 * GET Handler: Fetches the full matrix of booked slots from the database layers.
 * URL Target: /api/bookings
 */
export async function GET() {
  try {
    const data = Database.getAllBookings();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST Handler: Processes incoming patient booking packets and locks the system slot.
 * URL Target: /api/bookings
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Core data verification structure
    if (!body.service || !body.date || !body.time || !body.name || !body.phone) {
      return NextResponse.json({ success: false, error: "Missing required booking variables" }, { status: 400 });
    }

    // Insert packet into persistent memory layer
    const createdRecord = Database.createBooking(body);
    return NextResponse.json({ success: true, data: createdRecord }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}