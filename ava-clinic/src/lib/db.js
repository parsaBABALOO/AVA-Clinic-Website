/**
 * Global persistent simulation layer for database management.
 * Ensures data is maintained across API requests in memory.
 */

// Global state initialization for database persistence simulation
if (!global.ava_database_bookings) {
  global.ava_database_bookings = [];
}

/**
 * Core database utility class managing the scheduling data vectors
 */
export class Database {
  // Retrieve all booking nodes from memory matrix
  static getAllBookings() {
    return global.ava_database_bookings;
  }

  // Create and inject a new booking node or blocked slot into the system
  static createBooking(bookingData) {
    const newRecord = {
      id: bookingData.id || Date.now().toString(),
      service: bookingData.service, // dental or aesthetics
      date: bookingData.date,       // YYYY-MM-DD
      time: bookingData.time,       // HH:MM
      name: bookingData.name,
      phone: bookingData.phone
    };
    global.ava_database_bookings.push(newRecord);
    return newRecord;
  }

  // Remove or toggle a slot based on admin action protocols
  static deleteOrBlockSlot(date, time, service) {
    const initialLength = global.ava_database_bookings.length;
    global.ava_database_bookings = global.ava_database_bookings.filter(
      (b) => !(b.date === date && b.time === time && b.service === service)
    );
    return global.ava_database_bookings.length < initialLength;
  }
}