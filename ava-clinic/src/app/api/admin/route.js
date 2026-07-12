import { NextResponse } from "next/server";
import { Database } from "@/lib/db";

/**
 * POST Handler: Processes admin command signals to remove a booking or toggle slot availability.
 * URL Target: /api/admin
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, date, time, service, username, password } = body;

    // Secure operational gateway verification rules
    if (username !== "admin123" || password !== "1234") {
      return NextResponse.json({ success: false, error: "Access Denied. Credentials Invalid." }, { status: 401 });
    }

    if (action === "toggle_block") {
      if (!date || !time || !service) {
        return NextResponse.json({ success: false, error: "Missing calendar matrix specifications" }, { status: 400 });
      }

      // Check if slot is already occupied/blocked to drop it, otherwise register block state
      const existing = Database.getAllBookings().find(
        (b) => b.date === date && b.time === time && b.service === service
      );

      if (existing) {
        Database.deleteOrBlockSlot(date, time, service);
        return NextResponse.json({ success: true, message: "Slot successfully unlocked and cleared" }, { status: 200 });
      } else {
        Database.createBooking({
          id: `block-${Date.now()}`,
          service,
          date,
          time,
          name: "ADMIN BLOCKED SITE",
          phone: "N/A"
        });
        return NextResponse.json({ success: true, message: "Slot state successfully restricted by administrator" }, { status: 201 });
      }
    }

    return NextResponse.json({ success: false, error: "Unknown operational instruction matrix" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}