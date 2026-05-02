"use client";
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen text-gray-900" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* --- NAVBAR --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#001a4d]/90 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/logo_campusbites.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/map" className="bg-[#FFD700] text-[#003A70] px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-white text-[#003A70] px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm shadow" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- WHITE BACKGROUND SECTION --- */}
      <div className="bg-white">
        {/* --- HERO SECTION --- */}
        <header className="py-10 px-8 max-w-6xl mx-auto text-center">
          <h2 className="text-7xl font-extrabold mb-4 text-[#003A70]">Eat like an Eagle.</h2>
          <p className="text-gray-600 text-2xl mb-5">Discover the best food spots across campus.</p>
        </header>
        
        <div className="flex justify-center gap-6 pb-15 px-8">
          <Link 
            href="/stalls"
            className="text-center bg-[#003A70] text-white px-8 py-5 rounded-2xl font-bold hover:bg-blue-800 transition text-lg shadow-lg"
            style={{ textDecoration: "none" }}
          >
            Browse All Stalls
          </Link>
          <Link 
            href="/map"
            className="text-center bg-[#FFD700] text-[#003A70] px-8 py-5 rounded-2xl font-bold hover:bg-yellow-400 transition text-lg shadow-lg"
            style={{ textDecoration: "none" }}
          >
            View Campus Map
          </Link>
        </div>
      </div>

      {/* --- FEATURES --- */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold mb-2 text-[#003A70]">Food Stalls</h3>
            <p className="text-gray-600">Browse through all the best dining options on campus.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2 text-[#003A70]">Interactive Map</h3>
            <p className="text-gray-600">Find your way around campus and locate food spots easily.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2 text-[#003A70]">Ratings & Reviews</h3>
            <p className="text-gray-600">See what other students are saying about each stall.</p>
          </div>
        </div>
      </section>
    </div>
  );
}