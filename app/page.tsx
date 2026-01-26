"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [activeLocation, setActiveLocation] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<any>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const stalls = [
    { id: "bok-chicken", name: "BOK Korean Fried Chicken", loc: "Regis 2/F", area: "Regis", rating: 4.8, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Korean", "Chicken"], menu: ["Soy Garlic Chicken", "Snow Cheese Chicken"] },
    { id: "yummy-tokyo", name: "Yummy Tokyo", loc: "Regis 3/F", area: "Regis", rating: 4.5, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Budget", "Japanese"], menu: ["Spicy Miso Ramen", "California Roll"] },
    { id: "paotsin-regis", name: "Paotsin", loc: "Regis 3/F", area: "Regis", rating: 4.6, price: "₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Budget", "Chinese"], menu: ["Sharks Fin Rice", "Laksa"] },
    { id: "jsec-overload", name: "JSEC: Overload", loc: "JSEC Mall", area: "JSEC", rating: 4.9, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["JSEC", "Inside Campus", "Rice Bowl"], menu: ["Angus Beef Tapa", "Breakfast Bowl"] },
    { id: "gonzaga-rice", name: "Gonzaga Rice Bowl", loc: "Gonzaga Hall", area: "Gonzaga", rating: 4.4, price: "₱", hours: "7:00 AM - 4:00 PM", tags: ["Gonzaga", "Budget", "Study Spots"], menu: ["Pork Sisig Rice", "Chicken Teriyaki"] },
    { id: "subway-regis", name: "Subway", loc: "Regis 3/F", area: "Regis", rating: 4.2, price: "₱₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Study Spots", "Healthy"], menu: ["B.M.T. Sandwich", "Subway Club"] },
    { id: "ate-ricas", name: "Ate Rica's Bacsilog", loc: "Agno/Katipunan", area: "Katipunan", rating: 4.7, price: "₱", hours: "7:00 AM - 10:00 PM", tags: ["Katipunan", "Budget", "Silog"], menu: ["Bacon Bacsilog"] },
  ];

  const locations = ["All", "JSEC", "Gonzaga", "Regis", "Katipunan"];
  const categories = ["All", "Budget", "Study Spots", "Dessert", "Fast Food"];

  const filteredStalls = stalls.filter(stall => {
    const matchesLoc = activeLocation === "All" || stall.area === activeLocation;
    const matchesCat = activeCategory === "All" || stall.tags.includes(activeCategory);
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans">
      {/* --- NAVBAR WITH SEARCH ON RIGHT --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <h1 className="text-xl font-black text-[#003A70] tracking-tighter shrink-0">CAMPUS BITES</h1>
        <div className="flex gap-3 items-center ml-auto">
          <input 
            type="text"
            placeholder="Search stalls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 border-none rounded-full px-5 py-2 text-sm focus:ring-2 focus:ring-[#003A70]/10 transition w-48 md:w-64"
          />
          <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#003A70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">Discover Ateneo Eats</h2>
          <p className="text-gray-500 text-lg font-medium">Curated spots around Loyola Heights.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredStalls.map((stall) => (
            <div key={stall.id} onClick={() => setSelectedStall(stall)} className="group cursor-pointer">
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="h-52 bg-gray-100 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Open Now</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-bold text-[#003A70]">★ {stall.rating}</div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#003A70] transition">{stall.name}</h3>
                    <span className="text-green-600 font-bold">{stall.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{stall.loc}</p>
                  
                  {/* TIMES RESTORED */}
                  <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0114 0z" />
                    </svg>
                    {stall.hours}
                  </div>

                  {/* TAGS RESTORED */}
                  <div className="flex gap-2">
                    {stall.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-50 text-gray-400 px-3 py-1 rounded-lg font-black uppercase tracking-tighter">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FILTER MODAL RESTORED --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Filter Stalls</h2>
            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map(loc => (
                  <button key={loc} onClick={() => setActiveLocation(loc)} className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${activeLocation === loc ? "bg-[#003A70] text-white border-[#003A70] shadow-lg shadow-blue-900/20" : "border-gray-100 text-gray-500 hover:border-gray-300"}`}>{loc}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setIsSearchModalOpen(false)} className="w-full py-5 bg-[#C0764D] text-white rounded-2xl font-black text-sm hover:bg-[#a66440] shadow-xl shadow-orange-900/20 transition-all">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusBitesHome;