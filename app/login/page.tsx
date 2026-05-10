"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      alert("Logged in! (Demo only)");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#2003d4] relative overflow-hidden font-sans">
      {/* Animated Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#ffffff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#ffe500] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#ffffff] rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md px-6 my-8">
        <div className="bg-[#ffffff]/95 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-[#ffffff]/20">
          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Logo Image */}
            <img src="images/3.png" alt="Campus Bites Logo" className="h-15 mb-0" />
            <p className="text-gray-500 text-sm font-medium">
            </p>
          </div>

          {/* Social Logins - Adjusted to single column for Google only */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-bold text-gray-700">Google</span>
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center mb-8">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="group">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1 tracking-widest transition-colors group-focus-within:text-[#2003d4]">
                University Email
              </label>
              <input
                type="email"
                placeholder="@student.ateneo.edu"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#2003d4] transition-all bg-gray-50/50 text-black placeholder:text-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="flex justify-between items-center mb-1 ml-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-[#2003d4]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-[#2003d4] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#2003d4] transition-all bg-gray-50/50 text-black placeholder:text-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-2xl border border-red-100 animate-pulse">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#2003d4] text-[#ffffff] py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1a02b0] hover:shadow-[0_20px_50px_rgba(32,3,212,0.3)] hover:-translate-y-1 transition-all active:scale-95 mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center space-y-4">
            <p className="text-sm text-gray-500">
              New here?{" "}
              <span className="text-[#2003d4] font-black cursor-pointer hover:text-[#1a02b0] transition decoration-2 hover:underline underline-offset-4">
                Create an account
              </span>
            </p>
            <Link
              href="/"
              className="inline-block text-xs font-bold text-gray-400 hover:text-[#2003d4] transition bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}