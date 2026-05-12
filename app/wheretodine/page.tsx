'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col text-[#2003d4]" style={{ backgroundImage: "url('/images/assets/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      
      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/assets/1.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        
        <div className="flex gap-4 items-center">

         <Link href="/foodmap" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>Map</Link>
          <Link href="/login" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm" style={{ textDecoration: "none" }}>Login</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-grow flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-4">
        
        {/* --- WHITE SELECTION CONTAINER --- */}
        <div className="bg-[#ffffff] rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl text-center">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2003d4] mb-2">
              Hungry, Eagles?
            </h1>
            <p className="text-gray-500 text-sm">
              Where are you looking to eat today?
            </p>
          </div>
          
          {/* --- INTERACTIVE CARD BUTTONS --- */}
          {/* We use max-w-sm on the cards to keep them small and uniform */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            
            {/* INSIDE CAMPUS CARD */}
            <Link href="/wheretodine/inside" className="group no-underline block w-full max-w-[280px]" style={{ textDecoration: "none" }}>
              <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-100 hover:shadow-xl transition-all group-hover:-translate-y-1 flex flex-col items-center">
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 relative">
                  <img 
                    src="/images/assets/insidecampus.png" 
                    alt="Inside Campus" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2003d4]/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-lg font-bold text-[#2003d4] text-center">
                  Inside Campus
                </h3>
              </div>
            </Link>

            {/* OUTSIDE CAMPUS CARD */}
            <Link href="/wheretodine/outside" className="group no-underline block w-full max-w-[280px]" style={{ textDecoration: "none" }}>
              <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-100 hover:shadow-xl transition-all group-hover:-translate-y-1 flex flex-col items-center">
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 relative">
                  <img 
                    src="/images/assets/outsidecampus.png" 
                    alt="Outside Campus" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-lg font-bold text-[#2003d4] text-center">
                  Outside Campus
                </h3>
              </div>
            </Link>

          </div>

          <div className="mt-10 pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Ateneo de Manila University
            </p>
          </div>
          
        </div>
      </main>

    </div>
  );
};

export default LandingPage;