"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <Link href="/map" className="bg-[#FFD700] text-[#003A70] px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="py-20 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-extrabold mb-4 text-[#003A70]">Eat like an Eagle.</h2>
        <p className="text-gray-500 text-xl mb-10">Discover the best food spots across campus.</p>
        
        <div className="flex justify-center gap-6">
          <Link 
            href="/stalls"
            className="bg-[#003A70] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition text-lg shadow-lg"
            style={{ textDecoration: "none" }}
          >
            Browse All Stalls
          </Link>
          <Link 
            href="/map"
            className="bg-[#FFD700] text-[#003A70] px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 transition text-lg shadow-lg"
            style={{ textDecoration: "none" }}
          >
            View Campus Map
          </Link>
        </div>
      </header>

      {/* --- FEATURES --- */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold mb-2">51 Food Stalls</h3>
            <p className="text-gray-500">Browse through all the best dining options on campus.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
            <p className="text-gray-500">Find your way around campus and locate food spots easily.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2">Ratings & Reviews</h3>
            <p className="text-gray-500">See what other students are saying about each stall.</p>
          </div>
        </div>
      </section>
    </div>
  );
}