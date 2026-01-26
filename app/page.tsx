"use client";

import React, { useState } from 'react';

const CampusBitesHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<any>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const stalls = [
    { id: 1, name: "BOK Korean Fried Chicken", loc: "Regis 2/F", rating: 94, price: "₱₱", budget: 300, hours: "10:00 AM - 2:30 AM", tags: ["Regis", "Katipunan", "Korean"], menu: ["Soy Garlic Chicken", "Snow Cheese Chicken", "Yangnyeom Fries"] },
    { id: 2, name: "Yummy Tokyo", loc: "Regis 3/F", rating: 91, price: "₱₱", budget: 250, hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Budget", "Japanese"], menu: ["Spicy Miso Ramen", "California Roll", "Pork Katsudon"] },
    { id: 3, name: "Paotsin", loc: "Regis 3/F", rating: 96, price: "₱", budget: 150, hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Budget", "Chinese"], menu: ["Sharks Fin Rice", "Pork Dumplings", "Laksa"] },
    { id: 4, name: "Kanzen Sushi Roll", loc: "Regis 2/F", rating: 93, price: "₱₱", budget: 400, hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Katipunan", "Japanese"], menu: ["California Maki", "Spicy Tuna Roll", "Salmon Sashimi"] },
    { id: 5, name: "Subway", loc: "Regis 3/F", rating: 88, price: "₱₱", budget: 350, hours: "8:00 AM - 10:00 PM", tags: ["Regis", "Study Spots", "American"], menu: ["B.M.T. Sandwich", "Subway Club", "Chocolate Chip Cookie"] },
    { id: 6, name: "Cookies by the Bucket", loc: "Regis 3/F", rating: 97, price: "₱", budget: 100, hours: "10:00 AM - 8:00 PM", tags: ["Regis", "Budget", "Dessert"], menu: ["Classic Chocolate Chip", "Dark Chocolate", "Oatmeal Raisin"] },
    { id: 7, name: "Chicken NamNam", loc: "Regis 3/F", rating: 90, price: "₱₱", budget: 250, hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Katipunan", "Filipino"], menu: ["Sweet & Spicy Chicken", "Fried Rice", "Coleslaw"] },
    { id: 8, name: "JSEC: Overload", loc: "JSEC", rating: 98, price: "₱₱", budget: 200, hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Filipino"], menu: ["Angus Beef Tapa", "Breakfast Bowl", "Iced Coffee"] },
    { id: 9, name: "Ate Rica's Bacsilog", loc: "Agno/Katipunan", rating: 95, price: "₱", budget: 120, hours: "7:00 AM - 9:00 PM", tags: ["Katipunan", "Budget", "Filipino"], menu: ["Bacon Bacsilog", "Tapa Bacsilog", "Hotdog Bacsilog"] },
    { id: 10, name: "Gino's Brick Oven", loc: "Regis Center", rating: 92, price: "₱₱₱", budget: 600, hours: "11:00 AM - 9:30 PM", tags: ["Regis", "Date Spot", "Italian"], menu: ["Bacon Pizza", "SMEGG Pizza", "Buffalo Wings"] },
  ];

  const filterOptions = ["All", "Inside Campus", "Regis", "Katipunan", "JSEC", "Budget", "Study Spots"];
  const cuisineOptions = ["Korean", "Japanese", "Chinese", "American", "Filipino", "Italian", "Dessert"];
  const budgetOptions = ["<200", "200-400", "400-600", "600+"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter);
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <div className="relative hidden md:flex items-center">
            <input 
              type="text"
              placeholder="Search for food..."
              className="border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* NEW FILTER BUTTON */}
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="ml-2 p-1.5 hover:bg-gray-100 rounded-full transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
          <button className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm">Login</button>
        </div>
      </nav>

      {/* Header */}
      <header className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">Find Your Next Meal</h2>
        <p className="text-gray-500 text-lg">Your ultimate guide to food in and around the Hill.</p>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStalls.map((stall) => (
            <div key={stall.id} onClick={() => setSelectedStall(stall)} className="group border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-[#003A70]/5 to-[#FFD700]/10 flex items-center justify-center relative">
                 <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-[#003A70] shadow-sm">{stall.rating}%</span>
                 <p className="text-[#003A70]/20 font-black text-4xl italic select-none uppercase tracking-widest">{stall.name.substring(0, 2)}</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold group-hover:text-[#003A70] transition mb-1">{stall.name}</h4>
                <div className="flex justify-between text-xs text-gray-500 mb-3 font-medium">
                  <span>{stall.loc}</span>
                  <span className="text-green-700">{stall.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- NEW SEARCH FILTERS MODAL (Based on image) --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Find Your Next Meal</h2>

            {/* Category Section */}
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(opt => (
                  <button key={opt} onClick={() => setActiveFilter(opt)} className={`px-4 py-2 rounded-full border text-xs font-semibold ${activeFilter === opt ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-600 hover:border-gray-300"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuisine Section */}
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Cuisine</label>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map(opt => (
                  <button key={opt} className="px-4 py-2 rounded-full border border-gray-100 text-xs font-semibold text-gray-600 hover:border-gray-300">
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Section */}
            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Budget (PHP)</label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map(opt => (
                  <button key={opt} className="px-4 py-2 rounded-full border border-gray-100 text-xs font-semibold text-gray-600 hover:border-gray-300">
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { setActiveFilter("All"); setIsSearchModalOpen(false); }} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition">Clear All</button>
              <button onClick={() => setIsSearchModalOpen(false)} className="flex-[2] py-3 bg-[#C0764D] text-white rounded-xl font-bold hover:bg-[#a66440] transition">Search Restaurants</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MENU POPUP MODAL --- */}
      {selectedStall && (
        <div className="fixed inset-0 bg-[#003A70]/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setSelectedStall(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-3xl font-black text-[#003A70]">{selectedStall.name}</h2>
            <div className="border-t border-gray-100 mt-6 pt-6">
              <h3 className="font-extrabold text-[#003A70] uppercase text-lg mb-4">On the Menu</h3>
              <ul className="space-y-3">
                {selectedStall.menu.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium bg-gray-50 p-3 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"></div>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusBitesHome;