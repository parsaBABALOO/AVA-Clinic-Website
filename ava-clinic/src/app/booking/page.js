"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle } from "lucide-react";

// Generate clean 30-minute intervals from 10:00 AM to 8:00 PM
const generateTimeSlots = () => {
  const slots = [];
  let hour = 10;
  let minute = 0;

  while (hour < 20 || (hour === 20 && minute === 0)) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    slots.push(`${formattedHour}:${formattedMinute}`);
    
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

// Generate next 7 days for the dynamic calendar selector
const getNextSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      formatted: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    });
  }
  return days;
};

export default function BookingPage() {
  const [days, setDays] = useState([]);
  const [selectedService, setSelectedService] = useState("dental"); // dental or aesthetics
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState([]);
  
  // Form States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize dynamic calendar dates and pull existing reservations from storage
  useEffect(() => {
    setDays(getNextSevenDays());
    setSelectedDate(getNextSevenDays()[0].formatted);
    
    const storedBookings = localStorage.getItem("ava_clinic_bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Check if a specific time slot is already taken for the selected service and date
  const isSlotBooked = (time) => {
    return bookings.some(
      (b) => b.date === selectedDate && b.time === time && b.service === selectedService
    );
  };

  // Process and save the booking form into storage architecture
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime || !fullName || !phone) return;

    const newBooking = {
      id: Date.now().toString(),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name: fullName,
      phone: phone,
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("ava_clinic_bookings", JSON.stringify(updatedBookings));

    setIsSuccess(true);
    setFullName("");
    setPhone("");
    setSelectedTime("");
    
    // Clear success screen after 4 seconds
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-dark uppercase">
          ELEVATED APPOINTMENT SYSTEM
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Book your elite clinical or aesthetic session instantly.</p>
      </div>

      {isSuccess && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-emerald-600" />
          <span className="font-semibold">Appointment successfully reserved! Your secure slot is locked.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* STEP 1 & 2: DEDICATED CONTROLS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Department Branch Switcher */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
            <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-2">
              <span>01.</span> Select Specialized Department
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { setSelectedService("dental"); setSelectedTime(""); }}
                className={`py-4 rounded-2xl font-bold tracking-wide transition-all ${
                  selectedService === "dental"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                DENTAL CLINIC
              </button>
              <button
                type="button"
                onClick={() => { setSelectedService("aesthetics"); setSelectedTime(""); }}
                className={`py-4 rounded-2xl font-bold tracking-wide transition-all ${
                  selectedService === "aesthetics"
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                AESTHETICS & SKIN
              </button>
            </div>
          </div>

          {/* Calendar Horizontal Scroller */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
            <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-2">
              <CalendarIcon size={16} /> <span>02.</span> Select Date
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {days.map((day) => (
                <button
                  key={day.formatted}
                  type="button"
                  onClick={() => { setSelectedDate(day.formatted); setSelectedTime(""); }}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl text-center font-semibold text-sm transition-all ${
                    selectedDate === day.formatted
                      ? "bg-dark text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {day.display}
                </button>
              ))}
            </div>
          </div>

          {/* Time Matrix Slots Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
            <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-2">
              <Clock size={16} /> <span>03.</span> Select Available Time Session (10:00 AM - 08:00 PM)
            </h2>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {TIME_SLOTS.map((time) => {
                const booked = isSlotBooked(time);
                const selected = selectedTime === time;

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={booked}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all tracking-wider ${
                      booked
                        ? "bg-rose-50 text-rose-500 border border-rose-200 cursor-not-allowed opacity-80" // RED - Occupied
                        : selected
                        ? "bg-gradient-to-r from-primary to-teal-600 text-white shadow-md ring-2 ring-primary/40"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100" // GREEN - Available
                    }`}
                  >
                    {time} {booked ? "[Booked]" : "[Open]"}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* STEP 3: PATIENT SECURE CHECKOUT FORM */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl h-fit">
          <h2 className="text-lg font-display font-bold text-dark mb-6 uppercase border-b border-slate-100 pb-3">
            Secure Summary
          </h2>

          <div className="space-y-4 mb-6 text-xs font-semibold text-slate-600">
            <div className="flex justify-between">
              <span>Department:</span>
              <span className="uppercase text-dark font-bold">{selectedService}</span>
            </div>
            <div className="flex justify-between">
              <span>Selected Date:</span>
              <span className="text-dark font-bold">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Session Time:</span>
              <span className={`font-bold ${selectedTime ? "text-primary text-sm" : "text-rose-500"}`}>
                {selectedTime ? `${selectedTime}` : "Not Selected"}
              </span>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedTime}
              className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all uppercase shadow-md ${
                selectedTime
                  ? "bg-dark text-white hover:bg-slate-800"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Confirm Reservation
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}