"use client";

import React, { useState } from 'react';

const CampusBitesHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stalls = [
    // Regis Center Stalls (3rd at Regis & Ground Floor)
    { id: 1, name: "BOK Korean Fried Chicken", loc: "Regis 2/F", rating: 94, price: "₱₱", hours: "10:00 AM - 2:30 AM", tags: ["Regis", "Katipunan"] },
    { id: 2, name: "Yummy Tokyo", loc: "Regis 3/F", rating: 91, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Budget"] },
    { id: 3, name: "Paotsin", loc: "Regis 3/F", rating: 96, price: "₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Budget"] },
    { id: 4, name: "Kanzen Sushi Roll", loc: "Regis 2/F", rating: 93, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Katipunan"] },
    { id: 5, name: "Subway", loc: "Regis 3/F", rating: 88, price: "₱₱", hours: "8:00 AM - 10:00 PM", tags: ["Regis", "Study Spots"] },
    { id: 6, name: "Cookies by the Bucket", loc: "Regis 3/F", rating: 97, price: "₱", hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Budget"] },
    { id: 7, name: "Chicken NamNam", loc: "Regis 3/F", rating: 90, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Katipunan"] },
    
    // Inside Campus
    { id: 8, name: "JSEC: Overload", loc: "Gonzaga", rating: 98, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"] },
    
    // Katipunan Proper
    { id: 9, name: "Ate Rica's Bacsilog", loc: "Agno/Katipunan", rating: 95, price: "₱", hours: "7:00 AM - 9:00 PM", tags: ["Katipunan", "Budget"] },
    { id: 10, name: "Gino's Brick Oven", loc: "Regis Center", rating: 92, price: "₱₱₱", hours: "11:00 AM - 9:30 PM", tags: ["Regis", "Date Spot"] },
  ];

  const filterOptions = ["All", "Inside Campus", "Regis", "Katipunan", "JSEC", "Budget", "Study Spots"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter);
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search for food..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm">
            Login
          </button>
        </div>
      </nav>

      <header className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">Eat like an Eagle.</h2>
        <p className="text-gray-500 text-lg">Your guide to food in and around the Hill.</p>
      </header>

      {/* Filter Bar */}
      <div className="flex gap-3 justify-center mb-12 px-8 overflow-x-auto no-scrollbar">
        {filterOptions.map((filter) => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full transition-all whitespace-nowrap border-2 font-semibold text-sm ${
              activeFilter === filter 
              ? "bg-[#003A70] border-[#003A70] text-white shadow-md" 
              : "border-gray-100 text-gray-400 hover:border-[#003A70] hover:text-[#003A70]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStalls.map((stall) => (
            <div key={stall.id} className="group border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-[#003A70]/5 to-[#FFD700]/10 flex items-center justify-center relative">
                 <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-[#003A70] shadow-sm">
                    {stall.rating}%
                 </span>
                 <p className="text-[#003A70]/20 font-black text-4xl italic select-none uppercase tracking-widest">
                    {stall.name.substring(0, 2)}
                 </p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold group-hover:text-[#003A70] transition mb-1">{stall.name}</h4>
                <div className="flex justify-between text-xs text-gray-500 mb-3 font-medium">
                  <span>{stall.loc}</span>
                  <span className="text-green-700">{stall.price}</span>
                </div>
                
                {/* Static Hours Section */}
                <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2 mb-4 border border-gray-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">
                    Hours: {stall.hours}
                  </span>
                </div>

                <div className="flex gap-2">
                  {stall.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] uppercase font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CampusBitesHome;