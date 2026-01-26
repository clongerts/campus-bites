"use client";

import React, { useState } from 'react';

const CampusBitesHome = () => {
  const [activeLocation, setActiveLocation] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<any>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const stalls = [
    { id: 1, name: "BOK Korean Fried Chicken", loc: "Regis 2/F", area: "Regis", rating: 94, price: "₱₱", tags: ["Regis", "Korean", "Chicken"], menu: ["Soy Garlic Chicken", "Snow Cheese Chicken"] },
    { id: 2, name: "Yummy Tokyo", loc: "Regis 3/F", area: "Regis", rating: 91, price: "₱₱", tags: ["Regis", "Budget", "Japanese"], menu: ["Spicy Miso Ramen", "California Roll"] },
    { id: 3, name: "Paotsin", loc: "Regis 3/F", area: "Regis", rating: 96, price: "₱", tags: ["Regis", "Budget", "Chinese"], menu: ["Sharks Fin Rice", "Laksa"] },
    { id: 4, name: "JSEC: Overload", loc: "JSEC", area: "JSEC", rating: 98, price: "₱₱", tags: ["JSEC", "Inside Campus", "Rice Bowl"], menu: ["Angus Beef Tapa", "Breakfast Bowl"] },
    { id: 5, name: "Gonzaga Rice Bowl", loc: "Gonzaga Hall", area: "Gonzaga", rating: 89, price: "₱", tags: ["Gonzaga", "Budget", "Study Spots"], menu: ["Pork Sisig Rice", "Chicken Teriyaki"] },
    { id: 6, name: "Subway", loc: "Regis 3/F", area: "Regis", rating: 88, price: "₱₱", tags: ["Regis", "Study Spots", "Healthy"], menu: ["B.M.T. Sandwich", "Subway Club"] },
    { id: 7, name: "Ate Rica's Bacsilog", loc: "Agno/Katipunan", area: "Katipunan", rating: 95, price: "₱", tags: ["Katipunan", "Budget", "Silog"], menu: ["Bacon Bacsilog"] },
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
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* --- NAVBAR: SEARCH MOVED TO RIGHT --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight shrink-0">Campus Bites</h1>
        
        <div className="flex gap-3 items-center ml-auto">
          <div className="relative hidden sm:block">
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20 transition w-48 md:w-64"
            />
          </div>
          
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition shadow-sm bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#003A70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          <button className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm">
            Login
          </button>
        </div>
      </nav>

      <header className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">Campus Bites</h2>
        <p className="text-gray-500 text-lg">Your guide to food in and around the Hill.</p>
      </header>

      {/* --- ACTIVE FILTER CHIPS --- */}
      <div className="flex justify-center gap-2 mb-10 px-8">
         {(activeLocation !== "All" || activeCategory !== "All" || searchQuery !== "") && (
           <button 
             onClick={() => {setActiveLocation("All"); setActiveCategory("All"); setSearchQuery("");}}
             className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition"
           >Reset All</button>
         )}
         {activeLocation !== "All" && (
           <span className="bg-blue-50 text-[#003A70] px-3 py-1 rounded-full text-[10px] font-bold border border-blue-100 uppercase">{activeLocation}</span>
         )}
         {activeCategory !== "All" && (
           <span className="bg-orange-50 text-[#C0764D] px-3 py-1 rounded-full text-[10px] font-bold border border-orange-100 uppercase">{activeCategory}</span>
         )}
      </div>

      <main className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStalls.map((stall) => (
            <div key={stall.id} onClick={() => setSelectedStall(stall)} className="group border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden cursor-pointer">
              <div className="h-32 bg-slate-50 flex items-center justify-center relative">
                 <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-[#003A70] shadow-sm">{stall.rating}%</span>
                 <p className="text-[#003A70]/10 font-black text-4xl italic uppercase select-none tracking-widest">{stall.name.substring(0, 2)}</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold group-hover:text-[#003A70] transition mb-1">{stall.name}</h4>
                <div className="flex justify-between text-xs text-gray-500 font-medium mb-4">
                  <span>{stall.loc}</span>
                  <span className="text-green-700">{stall.price}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stall.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded bg-gray-50/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- ADVANCED FILTER MODAL --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition text-xl">✕</button>
            <h2 className="text-2xl font-bold mb-8 text-[#003A70]">Filter Stalls</h2>
            
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map(loc => (
                  <button key={loc} onClick={() => setActiveLocation(loc)} className={`px-4 py-2 rounded-full border text-xs font-semibold transition ${activeLocation === loc ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-600 hover:border-gray-300"}`}>{loc}</button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full border text-xs font-semibold transition ${activeCategory === cat ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-600 hover:border-gray-300"}`}>{cat}</button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsSearchModalOpen(false)} className="w-full py-4 bg-[#C0764D] text-white rounded-2xl font-bold hover:bg-[#a66440] shadow-lg transition">Apply Filters</button>
          </div>
        </div>
      )}

      {/* --- MENU MODAL --- */}
      {selectedStall && (
        <div className="fixed inset-0 bg-[#003A70]/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setSelectedStall(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition text-xl">✕</button>
            <h2 className="text-3xl font-black text-[#003A70]">{selectedStall.name}</h2>
            <div className="border-t border-gray-100 mt-6 pt-6">
              <h3 className="font-extrabold text-[#003A70] uppercase text-lg mb-4">On the Menu</h3>
              <ul className="space-y-3">
                {selectedStall.menu.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
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