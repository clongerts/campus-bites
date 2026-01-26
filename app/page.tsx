"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const stalls = [
  { 
    id: "bok-chicken", 
    name: "BOK Korean Fried Chicken", 
    loc: "Regis 2/F", 
    hours: "10:00 AM - 8:00 PM",
    isOpen: true,
    rating: 4.8, 
    price: "₱₱", 
    tags: ["Korean", "Chicken"] 
  },
  { 
    id: "jsec-overload", 
    name: "JSEC: Overload", 
    loc: "JSEC Mall", 
    hours: "8:00 AM - 5:00 PM",
    isOpen: false, // JSEC usually closes earlier
    rating: 4.9, 
    price: "₱₱", 
    tags: ["Rice Bowl", "Campus-Only"] 
  },
  { 
    id: "paotsin-regis", 
    name: "Paotsin", 
    loc: "Regis 3/F", 
    hours: "9:00 AM - 9:00 PM",
    isOpen: true,
    rating: 4.6, 
    price: "₱", 
    tags: ["Budget", "Chinese"] 
  }
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <header className="mb-12">
        <h2 className="text-4xl font-black text-gray-900 mb-2">Discover Ateneo Eats</h2>
        <p className="text-gray-500 font-medium text-lg">Curated spots around Loyola Heights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stalls.map((stall) => (
          <Link href={`/stalls/${stall.id}`} key={stall.id} className="group">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              {/* Image Placeholder - Remy uses big, beautiful images */}
              <div className="h-56 bg-gray-200 relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${stall.isOpen ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                    {stall.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-bold text-[#003A70]">
                  ★ {stall.rating}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#003A70] transition">{stall.name}</h3>
                  <span className="text-green-600 font-bold">{stall.price}</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-1 font-medium">{stall.loc}</p>
                
                {/* RESTORED: Times/Hours */}
                <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0114 0z" />
                  </svg>
                  {stall.hours}
                </div>

                <div className="flex gap-2">
                  {stall.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
export default CampusBitesHome;