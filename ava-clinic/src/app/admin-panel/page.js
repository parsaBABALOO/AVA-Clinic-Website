"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Calendar as CalendarIcon, Clock, Layers, ShieldCheck } from "lucide-react";

// Standard time intervals matching the booking engine matrix
const generateTimeSlots = () => {
  const slots = [];
  let hour = 10; let minute = 0;
  while (hour < 20 || (hour === 20 && minute === 0)) {
    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    minute += 30; if (minute === 60) { minute = 0; hour += 1; }
  }
  return slots;
};
const TIME_SLOTS = generateTimeSlots();

// Date structural setup for scheduling views
const getNextSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    days.push({ formatted: d.toISOString().split('T')[0], display: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })});
  }
  return days;
};

export default function AdminPanelPage() {
  const router = useRouter();
  const [days, setDays] = useState([]);
  const [selectedService, setSelectedService] = useState("dental");
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);
  
  // Interactive UI overlay operational states
  const [activePatient, setActivePatient] = useState(null);
  const [targetBlockTime, setTargetBlockTime] = useState(null);

  useEffect(() => {
    // Authentication guard check
    const auth = localStorage.getItem("ava_admin_authenticated");
    if (auth !== "true") { router.push("/login"); return; }

    setDays(getNextSevenDays());
    setSelectedDate(getNextSevenDays()[0].formatted);

    const stored = localStorage.getItem("ava_clinic_bookings");
    if (stored) setBookings(JSON.parse(stored));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ava_admin_authenticated");
    router.push("/login");
  };

  // Find if slot has an existing booking
  const getSlotDetails = (time) => {
    return bookings.find(b => b.date === selectedDate && b.time === time && b.service === selectedService);
  };

  // Triggered when clicking an empty green slot to block it out
  const triggerBlockPrompt = (time) => {
    setTargetBlockTime(time);
  };

  const confirmBlockSlot = (confirm) => {
    if (confirm && targetBlockTime) {
      const blockedSlot = {
        id: `block-${Date.now()}`,
        service: selectedService,
        date: selectedDate,
        time: targetBlockTime,
        name: "ADMIN BLOCKED SITE",
        phone: "N/A"
      };
      const updated = [...bookings, blockedSlot];
      setBookings(updated);
      localStorage.setItem("ava_clinic_bookings", JSON.stringify(updated));
    }
    setTargetBlockTime(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* PANEL CONTROL UPPER BAND */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-dark tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-primary" /> MANAGEMENT DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Live Operational Database</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all"
        >
          <LogOut size={14} /> Sign Out Panel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: TOGGLES AND TIMELINES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Department Segmentation Grid */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
            <button
              onClick={() => setSelectedService("dental")}
              className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-widest transition-all ${selectedService === "dental" ? "bg-primary text-white" : "bg-slate-50 text-slate-600"}`}
            >
              DENTAL ARCHIVE
            </button>
            <button
              onClick={() => setSelectedService("aesthetics")}
              className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-widest transition-all ${selectedService === "aesthetics" ? "bg-accent text-white" : "bg-slate-50 text-slate-600"}`}
            >
              AESTHETICS ARCHIVE
            </button>
          </div>

          {/* Calendar Selectors */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map(d => (
                <button
                  key={d.formatted}
                  onClick={() => setSelectedDate(d.formatted)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedDate === d.formatted ? "bg-dark text-white" : "bg-slate-50 text-slate-600"}`}
                >
                  {d.display}
                </button>
              ))}
            </div>
          </div>

          {/* Master Operational Grid Matrix */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Matrix Scheduler Room</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map(time => {
                const booking = getSlotDetails(time);
                const isRed = !!booking;

                return (
                  <button
                    key={time}
                    onClick={() => isRed ? setActivePatient(booking) : triggerBlockPrompt(time)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                      isRed 
                        ? "bg-rose-50 border-rose-200 text-rose-700 shadow-sm hover:scale-102"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    {time} <br />
                    <span className="text-[10px] font-normal tracking-tight block mt-0.5">
                      {isRed ? (booking.name === "ADMIN BLOCKED SITE" ? "[Blocked]" : "[See Info]") : "[Open Slot]"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ACTION AND DATA OVERLAYS */}
        <div className="space-y-6">
          
          {/* Patient Card View */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl min-h-[220px] flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100 pb-2 mb-4">Selected Slot Insights</h4>
              {activePatient ? (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-xs font-semibold text-slate-500">Subject Name: <span className="text-dark font-bold block text-sm mt-0.5">{activePatient.name}</span></p>
                  <p className="text-xs font-semibold text-slate-500">Contact Protocol: <span className="text-dark font-bold block text-sm mt-0.5">{activePatient.phone}</span></p>
                  <p className="text-xs font-semibold text-slate-500">Time Node: <span className="text-primary font-bold block mt-0.5">{activePatient.time} ({activePatient.date})</span></p>
                </div>
              ) : (
                <p className="text-xs font-medium text-slate-400 italic">Click any reserved red session button to extract user contact matrices instantly.</p>
              )}
            </div>
            {activePatient && (
              <button 
                onClick={() => setActivePatient(null)} 
                className="w-full mt-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
              >
                Clear Focus Card
              </button>
            )}
          </div>

          {/* Dynamic Confirmation Dialog Modal (Inline Layout) */}
          {targetBlockTime && (
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl shadow-lg animate-pulse-once">
              <p className="text-xs font-bold text-amber-900 leading-relaxed mb-4">
                Are you busy at {targetBlockTime}? Do you want to remove this slot from active booking channels?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => confirmBlockSlot(true)}
                  className="flex-1 py-2 bg-amber-600 text-white font-bold rounded-xl text-xs hover:bg-amber-700 transition-all uppercase"
                >
                  Yes, Block
                </button>
                <button
                  onClick={() => confirmBlockSlot(false)}
                  className="px-4 py-2 bg-white border border-amber-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition-all"
                >
                  No
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}