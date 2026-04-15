"use client";

import React, { useState } from 'react';

interface Menu {
  name: string;
  price: number;
}

interface Stall {
  id: number;
  name: string;
  loc: string;
  rating: number;
  price: string;
  hours: string;
  tags: string[];
  image: string;
  menu: Menu[];
}

const CampusBitesHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState("All");

  const stalls: Stall[] = [
    { 
      id: 1, 
      name: "BOK Korean Fried Chicken", 
      loc: "Regis 2/F", 
      rating: 94, 
      price: "₱₱", 
      hours: "10:00 AM - 2:30 AM", 
      tags: ["Regis", "Katipunan", "Korean"],
      image: "/images/BOK.jpg",
      menu: [
        { name: "Soy Garlic Chicken", price: 185 },
        { name: "Snow Cheese Chicken", price: 195 },
        { name: "Yangnyeom Fries", price: 95 }
      ] 
    },
    { 
      id: 2, 
      name: "Yummy Tokyo", 
      loc: "Regis 3/F", 
      rating: 91, 
      price: "₱₱", 
      hours: "9:00 AM - 8:00 PM", 
      tags: ["Regis", "Budget", "Japanese"],       
      image: "/images/yummytokyo.jpeg",      
      menu: [
        { name: "Spicy Miso Ramen", price: 249 },
        { name: "California Roll", price: 180 },
        { name: "Pork Katsudon", price: 210 }
      ] 
    },
    { 
      id: 3, 
      name: "Paotsin", 
      loc: "Regis 3/F", 
      rating: 96, 
      price: "₱", 
      hours: "9:00 AM - 9:00 PM", 
      tags: ["Regis", "Budget", "Chinese"], 
      image: "/images/paotsin.jpeg",
      menu: [
        { name: "Sharks Fin Rice", price: 100 },
        { name: "Pork Dumplings", price: 70 },
        { name: "Laksa", price: 140 }
      ] 
    },
    { 
      id: 4, 
      name: "Kanzen Sushi Roll", 
      loc: "Regis 2/F", 
      rating: 93, 
      price: "₱₱", 
      hours: "10:00 AM - 9:00 PM", 
      tags: ["Regis", "Katipunan", "Japanese"], 
      image: "/images/kanzen.jpg",
      menu: [
        { name: "California Maki", price: 175 },
        { name: "Spicy Tuna Roll", price: 190 },
        { name: "Salmon Sashimi", price: 250 }
      ] 
    },
    { 
      id: 5, 
      name: "Subway", 
      loc: "Regis 3/F", 
      rating: 88, 
      price: "₱₱", 
      hours: "8:00 AM - 10:00 PM", 
      tags: ["Regis", "Study Spots", "Healthy"], 
      image: "/images/subway.jpg",
      menu: [
        { name: "B.M.T. Sandwich", price: 235 },
        { name: "Subway Club", price: 255 },
        { name: "Chocolate Chip Cookie", price: 45 }
      ] 
    },
    { 
      id: 6, 
      name: "Frutas Fruit Shakes", 
      loc: "Regis 3/F", 
      rating: 97, 
      price: "₱", 
      hours: "10:00 AM - 8:00 PM", 
      tags: ["Regis", "Budget", "Dessert"], 
      image: "/images/fruitas.jpg",
      menu: [
        { name: "Large", price: 150 },
        { name: "Extra Large", price: 160 },
        { name: "Combo", price: 155 }
      ] 
    },
    { 
      id: 7, 
      name: "Potato Corner  ", 
      loc: "Regis 3/F", 
      rating: 90, 
      price: "₱₱", 
      hours: "10:00 AM - 9:00 PM", 
      tags: ["Regis", "Katipunan", "Filipino"], 
      image: "/images/potato-corner.jpg",
      menu: [
        { name: "Mega", price: 180 },
        { name: "Tera", price: 45 },
        { name: "Jumbo", price: 40 }
      ] 
    },
    { 
      id: 8, 
      name: "Yatako", 
      loc: "JSEC", 
      rating: 98, 
      price: "₱₱", 
      hours: "8:00 AM - 5:00 PM", 
      tags: ["Inside Campus", "JSEC", "Breakfast"], 
      image: "/images/yatako.jpg",
      menu: [
        { name: "Angus Beef Tapa", price: 220 },
        { name: "Breakfast Bowl", price: 190 },
        { name: "Iced Coffee", price: 120 }
      ] 
    },
    { 
      id: 9, 
      name: "Spudbae", 
      loc: "Regis 3/F", 
      rating: 95, 
      price: "₱₱", 
      hours: "7:00 AM - 9:00 PM", 
      tags: ["Regis"], 
      image: "/images/spudbae.jpg",
      menu: [
        { name: "Chili con Carne spud", price: 80 },
        { name: "Iced Latte", price: 140 },
        { name: "Pastry Set", price: 250 }
      ] 
    },
    { 
      id: 10, 
      name: "Tetsuo", 
      loc: "Regis 2/F", 
      rating: 92, 
      price: "₱₱₱", 
      hours: "11:00 AM - 9:30 PM", 
      tags: ["Regis", "Date Spot", "Japanese"], 
      image: "/images/tetsuo.jpg",
      menu: [
        { name: "Karaage", price: 150 },
        { name: "Torched Salmon", price: 360 },
        { name: "Garlic Beef", price: 270 },
        { name: "Curry Spiced Pork", price: 200 },
      ] 
    },
    { 
      id: 11, 
      name: "Gyud Food", 
      loc: "Gonzaga", 
      rating: 92, 
      price: "₱", 
      hours: "8:00 AM - 5:00 PM", 
      tags: ["Inside Campus", "Gonzaga", "Budget", "Filipino"], 
      image: "/images/gyud-food.jpg",
      menu: [
        { name: "Tapa Special", price: 120 },
        { name: "Pork Sisig", price: 110 },
        { name: "Iced Tea", price: 30 }
      ] 
    },
    { 
      id: 12, 
      name: "Sample 2Gonz", 
      loc: "Gonzaga", 
      rating: 90, 
      price: "₱", 
      hours: "8:00 AM - 5:00 PM",
      tags: ["Inside Campus", "2Gonz"],
      image: "/images/sample-2gonz.jpg",
      menu: [
        { name: "Chicken Adobo", price: 95 },
        { name: "Fried Fish", price: 85 },
        { name: "Vegetable Side", price: 25 }
      ] 
    },    
  ];

  const locations = ["All", "Inside Campus", "Regis", "Katipunan", "JSEC", "Gonzaga", "2Gonz"];
  const categories = ["Budget", "Study Spots", "Date Spot", "Korean", "Japanese", "Filipino"];
  const pricePoints = ["All", "₱", "₱₱", "₱₱₱"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter);
    const matchesPrice = priceFilter === "All" || stall.price === priceFilter;
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search for food..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-[#003A70]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          <button className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm">
            Login
          </button>
        </div>
      </nav>

      <header className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">Eat like an Eagle.</h2>
        <p className="text-gray-500 text-lg">Your guide to food in and around the Hill.</p>
      </header>

      <div className="flex gap-3 justify-center mb-12 px-8 overflow-x-auto no-scrollbar">
        {locations.map((filter) => (
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
            <div 
              key={stall.id} 
              onClick={() => setSelectedStall(stall)}
              className="group border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white overflow-hidden cursor-pointer"
            >
            <div className="h-32 bg-gradient-to-br from-[#003A70]/5 to-[#FFD700]/10 flex items-center justify-center relative">
              <img 
              src={stall.image} 
              alt={stall.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
             />
              <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-[#003A70] shadow-sm z-10">
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
                  <span className="text-green-700 font-bold">{stall.price}</span>
                </div>
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

      {selectedStall && (
        <div className="fixed inset-0 bg-[#003A70]/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedStall(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#003A70] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                {selectedStall.loc}
              </span>
              <h2 className="text-3xl font-black text-[#003A70] leading-tight">{selectedStall.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-green-700">{selectedStall.price}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500 font-medium">{selectedStall.hours}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-extrabold text-[#003A70] uppercase tracking-tighter text-lg mb-4">On the Menu</h3>
              <ul className="space-y-3">
                {selectedStall.menu.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"></div>
                      {item.name}
                    </div>
                    <span className="text-xs font-bold text-[#003A70]">₱{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setSelectedStall(null)} className="w-full mt-8 bg-[#003A70] text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-900/20">
              Back to Stalls
            </button>
          </div>
        </div>
      )}

      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Filter Stalls</h2>
            
            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block text-left">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setActiveFilter(opt)} 
                    className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${activeFilter === opt ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-500"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block text-left">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setActiveFilter(opt)} 
                    className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${activeFilter === opt ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-500"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block text-left">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {pricePoints.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setPriceFilter(opt)} 
                    className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${priceFilter === opt ? "bg-green-700 text-white border-green-700" : "border-gray-100 text-gray-500"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsSearchModalOpen(false)} className="w-full py-5 bg-[#003A70] text-white rounded-2xl font-black text-sm hover:bg-blue-800 transition-all">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusBitesHome;
