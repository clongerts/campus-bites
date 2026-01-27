"use client";

import React, { useState } from 'react';

// Adding these interfaces ensures GitHub's "Strict Mode" build passes
interface MenuItem {
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
  menu: MenuItem[];
}

const CampusBitesHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Explicitly typing the state prevents "any" errors during build
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
      hours: "10:00 AM - 8:00 PM", 
      tags: ["Regis", "Budget", "Japanese"], 
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
      menu: [
        { name: "Large", price: 150 },
        { name: "Extra Large", price: 160 },
        { name: "Combo", price: 155 }
      ] 
    },
    { 
      id: 7, 
      name: "Chicken NamNam", 
      loc: "Regis 3/F", 
      rating: 90, 
      price: "₱₱", 
      hours: "10:00 AM - 9:00 PM", 
      tags: ["Regis", "Katipunan", "Filipino"], 
      menu: [
        { name: "Sweet & Spicy Chicken", price: 180 },
        { name: "Fried Rice", price: 45 },
        { name: "Coleslaw", price: 40 }
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
      menu: [
        { name: "Angus Beef Tapa", price: 220 },
        { name: "Breakfast Bowl", price: 190 },
        { name: "Iced Coffee", price: 120 }
      ] 
    },
    { 
      id: 9, 
      name: "Baekiri", 
      loc: "Regis 3/F", 
      rating: 95, 
      price: "₱₱", 
      hours: "7:00 AM - 9:00 PM", 
      tags: ["Regis"], 
      menu: [
        { name: "Bread A", price: 90 },
        { name: "Bread B", price: 110 }
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
      menu: [
        { name: "Karaage", price: 150 },
        { name: "Torched Salmon", price: 360 }
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
      menu: [
        { name: "Tapa Bowl", price: 99 }
      ] 
    },
    { 
      id: 12, 
      name: "Sample 2Gonz", 
      loc: "2Gonz", 
      rating: 90, 
      price: "₱", 
      hours: "8:00 AM - 5:00 PM",
      tags: ["Inside Campus", "2Gonz"],
      menu: [
        { name: "Rice Meal", price: 85 }
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
        <h1 className="text-2xl font-bold text-[#003A70]">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search..."
            className="border border-gray-200 rounded-full px-4 py-1.5 text-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </nav>

      <header className="py-12 px-8 text-center">
        <h2 className="text-5xl font-extrabold text-[#003A70]">Eat like an Eagle.</h2>
      </header>

      <div className="flex gap-3 justify-center mb-12 px-8 overflow-x-auto">
        {locations.map((filter) => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
              activeFilter === filter ? "bg-[#003A70] text-white" : "text-gray-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <main className="max-w-6xl mx-auto px-8 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredStalls.map((stall) => (
          <div key={stall.id} onClick={() => setSelectedStall(stall)} className="border rounded-2xl p-6 cursor-pointer hover:shadow-lg transition">
            <div className="h-32 bg-gray-50 flex items-center justify-center mb-4 rounded-xl">
               <span className="text-[#003A70]/20 text-4xl font-black">{stall.name.substring(0, 2)}</span>
            </div>
            <h4 className="font-bold text-lg">{stall.name}</h4>
            <p className="text-sm text-gray-500">{stall.loc}</p>
          </div>
        ))}
      </main>

      {selectedStall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
            <button onClick={() => setSelectedStall(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
            <h2 className="text-2xl font-bold text-[#003A70]">{selectedStall.name}</h2>
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold mb-2">Menu</h3>
              {selectedStall.menu.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b text-sm">
                  <span>{item.name}</span>
                  <span className="font-bold">₱{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {pricePoints.map(p => (
                <button key={p} onClick={() => setPriceFilter(p)} className={`px-4 py-2 rounded-full border ${priceFilter === p ? "bg-green-700 text-white" : ""}`}>{p}</button>
              ))}
            </div>
            <button onClick={() => setIsSearchModalOpen(false)} className="w-full bg-[#003A70] text-white py-3 rounded-xl font-bold">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusBitesHome;