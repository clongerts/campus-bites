'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 1. ADD THIS INTERFACE TO DEFINE THE SHAPE OF YOUR DATA
interface Deal {
  location: string;
  name: string;
  deal: string;
  sponsored: boolean;
}

const BiteDeals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 2. TYPE THE STATE SO IT ACCEPTS THE INTERFACE OR NULL
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const deals: Deal[] = [
    {
      location: "REGIS CENTER",
      name: "SUBWAY",
      deal: "Buy One, Get One Free (BOGO) on selected 6-inch subs",
      sponsored: true,
    },
    {
      location: "JSEC",
      name: "YATAKO",
      deal: "Free iced tea with every rice meal purchase",
      sponsored: false,
    },
    {
      location: "RESTAURANTS NEAR ATENEO",
      name: "KANTO FREESTYLE BREAKFAST",
      deal: "Free drink upgrade for selected breakfast meals",
      sponsored: false,
    },
    {
      location: "REGIS CENTER",
      name: "TETSUO",
      deal: "10% off on all soba orders from 2:00 PM to 5:00 PM",
      sponsored: true,
    },
    {
      location: "REGIS CENTER",
      name: "DOMINO'S PIZZA",
      deal: "20% off on all regular-priced pizzas",
      sponsored: false,
    },
    {
      location: "UNIVERSITY RESIDENCE HALLS",
      name: "EBAI'S",
      deal: "Free extra rice with any meal purchase",
      sponsored: false,
    },
  ];

  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#2003d4] text-white">
      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/assets/1.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search deals..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2003d4]/20 bg-[#ffffff]/90 text-[#2003d4]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
         <Link href="/foodmap" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>Map</Link>
          <Link href="/login" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm" style={{ textDecoration: "none" }}>Login</Link>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="flex-grow p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-12 tracking-tight uppercase">BiteDeals</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedDeal(item)} // This resolves the error in image_7294ba.png
                className="bg-white rounded-xl p-8 shadow-xl flex flex-col min-h-[240px] relative transition-transform hover:scale-[1.02] cursor-pointer"
              >

                {item.sponsored && (
                  <span className="absolute top-6 right-8 text-[#00E5FF] font-bold text-[10px] tracking-[0.15em] uppercase">
                    SPONSORED
                  </span>
                )}

                {/* Location */}
                <p className="text-[#2003d4] text-[13px] font-bold mb-1 uppercase tracking-tight">
                  {item.location}
                </p>

                {/* Name */}
                <h2 className="text-[#2003d4] text-[26px] font-black mb-4 leading-none uppercase">
                  {item.name}
                </h2>

                {/* Description */}
                <p className="text-[#2003d4] text-[18px] font-medium leading-tight">
                  {item.deal}
                </p>
              </div>
            ))}
          </div>
          
          {/* Legend Section */}
          <div className="mt-12 flex justify-end items-center gap-2">
             <span className="text-white/40 text-sm font-black uppercase tracking-widest">LEGEND:</span>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00E5FF] rounded-full"></div>
                <span className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest">Sponsored</span>
             </div>
          </div>
        </div>
      </main>

      {/* --- QR CODE MODAL --- */}
      {selectedDeal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedDeal(null)}
        >
          <div 
            className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* These resolve the errors in image_72949c.png */}
            <h3 className="text-[#2003d4] font-black text-xl mb-2 uppercase">{selectedDeal.name}</h3>
            <p className="text-gray-600 text-sm mb-6">{selectedDeal.deal}</p>
            
            <div className="bg-gray-100 p-4 rounded-xl mb-6 flex items-center justify-center">
                <img 
                    src="/images/assets/qr.png" 
                    alt="QR Code" 
                    className="max-w-full h-auto block"
                />
            </div>

            <button 
              onClick={() => setSelectedDeal(null)}
              className="w-full bg-[#2003d4] text-white font-bold py-3 rounded-full hover:opacity-90 transition"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiteDeals;