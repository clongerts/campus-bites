"use client";

import React, { useState } from 'react';
import Link from "next/link";

interface Menu {
  name: string;
  price: number;
}

interface Review {
  id: string;
  user: string;
  rating: number; 
  comment: string;
  isAnonymous: boolean;
  realityPhoto?: string; 
  date: string;
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
  reviews: Review[];
  portionSize: "Small" | "Regular" | "Large";
  isBestValue: boolean;
}

export default function StallsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState("All");
  const [budgetLimit, setBudgetLimit] = useState<string | null>(null);
  const [quickDecideResult, setQuickDecideResult] = useState<Stall[] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const stalls: Stall[] = [
    // --- REGIS CENTER ---
    { id: 1, name: "Domino's Pizza", loc: "Regis 1/F", rating: 82, price: "₱₱", hours: "10:00 AM - 10:00 PM", tags: ["Regis", "Regis 1/F", "Fast"], image: "/images/dominos.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Regular Pepperoni", price: 299 }, { name: "Creamy Carbonara", price: 199 }, { name: "Cheesy Breadsticks", price: 120 }], reviews: [] },
    { id: 2, name: "The Coffee Bean & Tea Leaf", loc: "Regis 1/F", rating: 91, price: "₱₱", hours: "7:00 AM - 11:00 PM", tags: ["Regis", "Regis 1/F", "Study Spots"], image: "/images/cbtl.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "African Sunrise Iced Tea", price: 185 }, { name: "Vanilla Latte", price: 175 }, { name: "Blueberry Muffin", price: 110 }], reviews: [] },
    { id: 3, name: "Tetsuo", loc: "Regis 2/F", rating: 94, price: "₱₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese", "Date Spot"], image: "/images/tetsuo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Signature Karaage (S)", price: 210 }, { name: "Cold Soba Noodles", price: 195 }, { name: "Umami Fried Rice", price: 95 }, { name: "Japanese Slaw", price: 60 }], reviews: [] },
    { id: 4, name: "BOK Chicken", loc: "Regis 2/F", rating: 95, price: "₱₱", hours: "10:00 AM - 2:00 AM", tags: ["Regis", "Regis 2/F", "Korean"], image: "/images/bok.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "6pc Double Fried Chicken", price: 195 }, { name: "Snow Cheese Poppers", price: 155 }, { name: "BOK Rice Bowl", price: 175 }], reviews: [] },
    { id: 5, name: "JAAM House of Sushi", loc: "Regis 2/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese"], image: "/images/jaam.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Sushi Platter (Mixed)", price: 250 }, { name: "California Maki", price: 180 }, { name: "Ebi Tempura (3pcs)", price: 195 }], reviews: [] },
    { id: 6, name: "Dim Dum Tom", loc: "Regis 2/F", rating: 87, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Chinese"], image: "/images/dim-dum.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Assorted Dimsum Box", price: 160 }, { name: "Beef Wonton Noodles", price: 185 }, { name: "Soy Chicken Rice", price: 170 }], reviews: [] },
    { id: 7, name: "Coco Milk Tea", loc: "Regis 2/F", rating: 92, price: "₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Drinks"], image: "/images/coco.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Panda Milk Tea", price: 130 }, { name: "3 Buddies Milk Tea", price: 145 }, { name: "Lemon Green Tea", price: 110 }], reviews: [] },
    { id: 8, name: "Subway", loc: "Regis 3/F", rating: 88, price: "₱₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Healthy"], image: "/images/subway.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "6-inch Roast Beef", price: 230 }, { name: "Footlong Upgrade", price: 160 }, { name: "Chocolate Chip Cookie", price: 50 }], reviews: [] },
    { id: 9, name: "Kim's Ramyun", loc: "Regis 3/F", rating: 90, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Korean"], image: "/images/kims.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Shin Ramyun Bowl", price: 180 }, { name: "Tuna Gimbap", price: 150 }, { name: "Tteokbokki", price: 165 }], reviews: [] },
    { id: 10, name: "Royal Tea", loc: "Regis 3/F", rating: 86, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/royal-tea.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Cheese Cream Matcha", price: 140 }, { name: "Royal Fruit Tea", price: 135 }, { name: "Oreo Cocoa", price: 125 }], reviews: [] },
    { id: 11, name: "Paotsin", loc: "Regis 3/F", rating: 97, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Budget"], image: "/images/paotsin.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shark's Fin w/ Green Rice", price: 100 }, { name: "Beef Siomai w/ Green Rice", price: 100 }, { name: "Laksa Noodles", price: 120 }, { name: "Fried Dumplings", price: 45 }], reviews: [] },
    { id: 12, name: "Fruitas", loc: "Regis 3/F", rating: 93, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/fruitas.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Buko Juice", price: 80 }, { name: "Mango Shake", price: 95 }, { name: "Four Seasons Shake", price: 110 }], reviews: [] },
    { id: 13, name: "Spudbae", loc: "Regis 3/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F"], image: "/images/spudbae.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fully Loaded Baked Potato", price: 150 }, { name: "Sour Cream Fries", price: 90 }, { name: "Cheesy Spuds", price: 110 }], reviews: [] },

    // --- NEAR ATENEO / KATIPUNAN ---
    { id: 14, name: "Busan Korean Restaurant", loc: "Katipunan", rating: 91, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Korean"], image: "/images/busan.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Beef Samgyup Set", price: 499 }, { name: "Dolsot Bibimbap", price: 250 }, { name: "Pork Cutlet", price: 280 }], reviews: [] },
    { id: 15, name: "Kanto Freestyle", loc: "Katipunan", rating: 94, price: "₱₱", hours: "24 Hours", tags: ["Near Ateneo", "Katipunan", "Breakfast"], image: "/images/kanto.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Batangas Beef Tapa", price: 160 }, { name: "Honey Garlic Chicken", price: 155 }, { name: "Mixed Berry Pancakes", price: 140 }, { name: "Fried Oreo", price: 90 }], reviews: [] },
    { id: 16, name: "Go Salads!", loc: "Katipunan", rating: 89, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Near Ateneo", "Katipunan", "Healthy"], image: "/images/go-salads.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hummus Salad", price: 190 }, { name: "Green Smoothie", price: 150 }, { name: "Chicken Pesto Wrap", price: 175 }], reviews: [] },
    { id: 17, name: "JT's Manukan", loc: "Katipunan", rating: 92, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Filipino"], image: "/images/jts.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Chicken Inasal Paa", price: 180 }, { name: "Garlic Rice", price: 35 }, { name: "Chicken Skin", price: 95 }, { name: "Batchoy", price: 145 }], reviews: [] },
    { id: 18, name: "Gino's Brick Oven Pizza", loc: "Katipunan", rating: 96, price: "₱₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Date Spot"], image: "/images/ginos.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Margherita Pizza", price: 380 }, { name: "Burrata", price: 450 }, { name: "Salted Egg Pasta", price: 320 }, { name: "Lemonade", price: 95 }], reviews: [] },
    { id: 19, name: "Zus Coffee", loc: "Katipunan", rating: 93, price: "₱₱", hours: "7:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Drinks"], image: "/images/zus.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "CEO Latte", price: 95 }, { name: "Spanish Latte", price: 110 }, { name: "Buttercrush Frappe", price: 145 }, { name: "Oat Milk Upgrade", price: 35 }], reviews: [] },
  ];

  const locations = ["All","Regis 1/F", "Regis 2/F", "Regis 3/F", "Katipunan", "Near Ateneo", ];
  const categories = ["Budget", "Study Spots", "Date Spot", "Korean", "Japanese", "Filipino", "Breakfast", "Fast"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter) || stall.loc.includes(activeFilter);
    const matchesPrice = priceFilter === "All" || stall.price === priceFilter;
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    // Budget filter logic
    let matchesBudget = true;
    if (budgetLimit) {
      const minPrices = stall.menu.map(item => item.price);
      const minPrice = Math.min(...minPrices);
      if (budgetLimit === 'Under ₱50') matchesBudget = minPrice < 50;
      else if (budgetLimit === '₱50-100') matchesBudget = minPrice >= 50 && minPrice <= 100;
      else if (budgetLimit === '₱100-150') matchesBudget = minPrice >= 100 && minPrice <= 150;
      else if (budgetLimit === '₱150-200') matchesBudget = minPrice >= 150 && minPrice <= 200;
      else if (budgetLimit === '₱200+') matchesBudget = minPrice >= 200;
    }
    return matchesFilter && matchesSearch && matchesPrice && matchesBudget;
  });

  const handleQuickDecide = () => {
    const pool = [...filteredStalls];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    setQuickDecideResult(shuffled.slice(0, 3));
  };

  return (
<div className="min-h-screen flex flex-col text-[#2003d4]" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/1.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search stalls or food..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2003d4]/20 bg-[#ffffff]/90"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
                    <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-[#ffffff]/10 rounded-full hover:bg-[#ffffff]/20 transition text-[#ffe500]" title="Advanced Filters">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </button>
          <Link href="/map" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-[#ffffff] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffe500] transition text-sm" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- WHITE BACKGROUND WRAPPER --- */}
      <div className="bg-[#ffffff] max-w-7xl mx-auto -mt-20 pt-20 flex-grow w-full">
      {/* --- HEADER --- */}
      <header className="py-12 px-8 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#2003d4]">Where To Dine</h2>
        <p className="text-[#2003d4]/70 text-lg mb-8">Browse all the spots across the Hill.</p>
        <button onClick={handleQuickDecide} className="bg-[#ffe500] text-[#2003d4] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
            ⚡ Quick Decide
        </button>
      </header>

  {/* --- QUICK DECIDE RESULTS MODAL --- */}
  {quickDecideResult && (
    <div className="fixed inset-0 bg-[#2003d4]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]">
      <div className="bg-[#ffffff] rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#2003d4]">Can't Decide? 🤔</h3>
          <button 
            onClick={() => setQuickDecideResult(null)} 
            className="text-red-500 hover:text-red-700 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {quickDecideResult.map(stall => (
            <div 
              key={stall.id} 
              className="border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition cursor-pointer flex flex-col h-full" 
              onClick={() => { setSelectedStall(stall); setQuickDecideResult(null); }}
            >
              {/* Image Container with consistent Aspect Ratio */}
              <div className="h-32 bg-gray-50 rounded-xl mb-3 overflow-hidden relative flex items-center justify-center">
                {stall.image ? (
                  <img 
                    src={stall.image} 
                    alt={stall.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { 
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"; 
                    }} 
                  />
                ) : (
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">No Image</span>
                )}
              </div>
  
              <h4 className="font-bold text-lg leading-tight text-[#2003d4]">{stall.name}</h4>
              <p className="text-gray-500 text-sm">{stall.loc}</p>
              
              {/* Bottom Info Section */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-1">
                  <span className="font-black text-[#2003d4]">{stall.rating}%</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">{stall.price}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleQuickDecide} 
          className="w-full mt-6 py-4 bg-[#ffe500] text-[#2003d4] rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#ffffff] border-2 border-[#ffe500] transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Re-roll!
        </button>
      </div>
    </div>
  )}

      {/* --- ADVANCED FILTER MODAL --- */}
      {isSearchModalOpen && (
          <div className="fixed inset-0 bg-[#2003d4]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]">
              <div className="bg-[#ffffff] rounded-3xl p-8 max-w-md w-full shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-[#2003d4]">Bite Filters</h3>
                      <button onClick={() => setIsSearchModalOpen(false)} className="text-red-500 hover:text-red-700 text-3xl font-bold">&times;</button>
                  </div>
                  {/* Budget Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Budget</h4>
                      <div className="flex flex-wrap gap-2">
                          {['Under ₱50', '₱50-100', '₱100-150', '₱150-200', '₱200+'].map(budget => (
                              <button 
                                  key={budget}
                                  onClick={() => setBudgetLimit(budgetLimit === budget ? null : budget)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${budgetLimit === budget ? 'bg-[#2003d4] text-[#ffffff]' : 'bg-gray-100 text-gray-600 hover:bg-[#ffe500]/20'}`}
                              >
                                  {budget}
                              </button>
                          ))}
                      </div>
                  </div>
                  {/* Location Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Location</h4>
                      <div className="flex flex-wrap gap-2">
                          {locations.map(loc => (
                              <button 
                                  key={loc}
                                  onClick={() => setActiveFilter(activeFilter === loc ? "All" : loc)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${activeFilter === loc ? 'bg-[#2003d4] text-[#ffffff]' : 'bg-gray-100 text-gray-600 hover:bg-[#ffe500]/20'}`}
                              >
                                  {loc}
                              </button>
                          ))}
                      </div>
                  </div>
                  {/* Category Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Category</h4>
                      <div className="flex flex-wrap gap-2">
                          {categories.map(cat => (
                              <button 
                                  key={cat}
                                  onClick={() => setActiveFilter(activeFilter === cat ? "All" : cat)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${activeFilter === cat ? 'bg-[#ffe500] text-[#2003d4]' : 'bg-gray-100 text-gray-600 hover:bg-[#ffe500]/20'}`}
                              >
                                  {cat}
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => { setActiveFilter("All"); setBudgetLimit(null); setSearchQuery(""); }} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">
                          Clear All
                      </button>
                      <button onClick={() => setIsSearchModalOpen(false)} className="flex-1 py-3 bg-[#2003d4] text-[#ffffff] rounded-xl font-medium hover:opacity-90 transition">
                          Apply
                      </button>
                  </div>
              </div>
          </div>
      )}
      <div className="px-8 pb-8">
          <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                      <button key={loc} onClick={() => setActiveFilter(loc)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === loc ? 'bg-[#2003d4] text-[#ffffff]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {loc}
                      </button>
                  ))}
              </div>

          </div>
          <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(activeFilter === cat ? "All" : cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === cat ? 'bg-[#ffe500] text-[#2003d4]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {cat}
                  </button>
              ))}
          </div>
      </div>

      {/* --- STALLS GRID --- */}
      <div className="px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStalls.map(stall => (
                  <div key={stall.id} className="border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer bg-[#ffffff]" onClick={() => setSelectedStall(stall)}>
                      <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden relative">
                          <img src={stall.image} alt={stall.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <span className="absolute top-2 right-2 bg-[#ffffff]/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#2003d4] shadow-sm">{stall.rating}%</span>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-[#2003d4]">{stall.name}</h3>
                          {stall.isBestValue && <span className="bg-[#ffe500] text-[#2003d4] text-xs font-bold px-2 py-1 rounded-full">Best Value</span>}
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{stall.loc}</p>
                      <div className="flex items-center gap-1 mb-2">
                          <span className="font-medium text-[#2003d4]">{stall.price}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-400 text-sm">{stall.hours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                          {stall.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tag}</span>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
      </div>

      {/* --- STALL DETAIL MODAL --- */}
      {selectedStall && (
          <div className="fixed inset-0 bg-[#2003d4]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]" onClick={() => setSelectedStall(null)}>
              <div className="bg-[#ffffff] rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h3 className="text-3xl font-bold text-[#2003d4]">{selectedStall.name}</h3>
                          <p className="text-gray-500">{selectedStall.loc}</p>
                      </div>
                      <div className="flex items-start gap-3">
                          {selectedStall.isBestValue && <span className="bg-[#ffe500] text-[#2003d4] text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">Best Value</span>}
                          <button onClick={() => setSelectedStall(null)} className="text-red-500 hover:text-red-700 text-3xl font-bold flex-shrink-0">&times;</button>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="text-xl font-bold text-[#2003d4]">{selectedStall.price}</div>
                      <div className="text-gray-500">{selectedStall.hours}</div>
                  </div>
                  
                  {/* EXPECTATION VS REALITY */}
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-[#2003d4]">📸 Reality Check</h4>
                      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-gray-100">
                          <div className="relative">
                              <img src={selectedStall.image} alt="Expectation" className="h-32 w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              <div className="absolute inset-0 flex flex-col justify-end">
                                  <span className="bg-black/60 text-[#ffffff] text-[8px] px-1.5 py-0.5 font-bold">Expectation</span>
                              </div>
                          </div>
                          <div className="relative">
                              <img 
                                  src={selectedStall.reviews.find(r => r.realityPhoto)?.realityPhoto || "/images/placeholder-reality.jpg"} 
                                  alt="Reality" 
                                  className="h-32 w-full object-cover" 
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 flex flex-col justify-end">
                                  <span className="bg-[#2003d4]/80 text-[#ffffff] text-[8px] px-1.5 py-0.5 font-bold">Student Reality</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-[#2003d4]">Menu</h4>
                      <div className="bg-gray-50 rounded-xl p-3 max-h-48 overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2">
                              {selectedStall.menu.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                      <span className="text-sm text-gray-700">{item.name}</span>
                                      <span className="font-medium text-sm text-[#2003d4]">₱{item.price}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <Link href="/map" style={{ textDecoration: "none" }}>
                          <button className="w-full mt-3 py-2 bg-[#2003d4] text-[#ffffff] rounded-lg font-bold hover:opacity-90 transition text-sm">
                              Go! 📍
                          </button>
                      </Link>
                  </div>
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-[#2003d4]">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedStall.tags.map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{tag}</span>
                          ))}
                      </div>
                  </div>
                  
                  {/* REVIEWS SECTION */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg text-[#2003d4]">Reviews</h4>
                          <span className="text-[#ffe500] font-black text-sm bg-[#2003d4] px-2 py-1 rounded">★ {(selectedStall.rating / 20).toFixed(1)}</span>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                          {selectedStall.reviews.length > 0 ? (
                              selectedStall.reviews.map(rev => (
                                  <div key={rev.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                      <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-black text-[#2003d4]">{rev.user}</span>
                                          <span className="text-xs text-gray-400">{rev.date}</span>
                                      </div>
                                      <div className="flex mb-2">
                                          {[...Array(5)].map((_, i) => (
                                              <span key={i} className={`text-sm ${i < rev.rating ? "text-[#ffe500]" : "text-gray-200"}`}>★</span>
                                          ))}
                                      </div>
                                      <p className="text-sm italic text-gray-600">"{rev.comment}"</p>
                                  </div>
                              ))
                          ) : (
                              <p className="text-sm text-gray-400 italic text-center py-4">No reviews yet. Help a fellow Eagle!</p>
                          )}
                      </div>

                      {/* REVIEW & EARN PROMPT */}
                      <div className="bg-[#2003d4]/5 border border-[#2003d4]/10 p-4 rounded-2xl flex items-center justify-between gap-3">
                          <div>
                              <p className="text-xs font-black text-[#2003d4] uppercase">Review & Earn</p>
                              <p className="text-xs text-[#2003d4]/70">Submit a photo to get a 10% voucher!</p>
                          </div>
                          <button onClick={() => setIsReviewModalOpen(true)} className="bg-[#2003d4] text-[#ffffff] text-xs px-3 py-1.5 rounded-full font-black hover:opacity-90 transition">Review</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

{/* --- CREATE REVIEW MODAL --- */}
      {isReviewModalOpen && selectedStall && (
          <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-6 z-[130]" onClick={() => setIsReviewModalOpen(false)}>
              <div 
                className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200" 
                onClick={e => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-[#003A70] leading-tight">Review {selectedStall.name}</h3>
                      <button onClick={() => setIsReviewModalOpen(false)} className="text-red-500 hover:text-red-700 text-2xl font-bold">&times;</button>
                  </div>

                  {/* Rating */}
                  <div className="mb-6 text-center">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-3">Rating</h4>
                      <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map(star => (
                              <button
                                  key={star}
                                  onClick={() => setReviewRating(star)}
                                  className={`text-3xl transition-transform active:scale-90 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-200'}`}
                              >
                                  ★
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-6">
                      <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-3">Your Review</h4>
                      <textarea
                          placeholder="Share your experience..."
                          className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/10 resize-none transition-all"
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                      />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                      <button
                          disabled={!reviewText.trim()}
                          onClick={() => {
                              alert(`Review submitted: ${reviewRating} stars`);
                              setIsReviewModalOpen(false);
                              setReviewText("");
                              setReviewRating(5);
                          }}
                          className="w-full py-4 bg-[#003A70] text-white rounded-2xl font-bold hover:bg-[#002a50] transition disabled:opacity-50 disabled:grayscale shadow-lg shadow-blue-900/20"
                      >
                          Submit Review
                      </button>
                      <button
                          onClick={() => setIsReviewModalOpen(false)}
                          className="w-full py-3 text-gray-400 text-sm font-medium hover:text-gray-600 transition"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}