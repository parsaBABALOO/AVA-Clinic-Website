"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Strict authentication check based on user requirements
    if (username === "admin123" && password === "1234") {
      localStorage.setItem("ava_admin_authenticated", "true");
      router.push("/admin-panel");
    } else {
      setError("Invalid Administrative Credentials. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 px-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-dark uppercase">
            ADMIN PORTAL
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Authorized Medical Personnel Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                placeholder="admin123"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                placeholder="••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-dark text-white rounded-xl font-bold tracking-wide hover:bg-slate-800 transition-all uppercase text-sm shadow-md"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}