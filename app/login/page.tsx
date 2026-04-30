"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      alert("Logged in! (Demo only)");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#003A70] text-center">Login to Campus Bites</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-[#003A70] text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition text-sm mt-2"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-[#003A70] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
