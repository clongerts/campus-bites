"use client";

import React, { useState } from 'react';

// --- INTERFACES ---
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

const CampusBitesHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState("All");
  const [budgetLimit, setBudgetLimit] = useState<number | null>(null);
  const [quickDecideResult, setQuickDecideResult] = useState<Stall[] | null>(null);

  const stalls: Stall[] = [
    // --- JSEC STALLS ---
    { id: 1, name: "Yatako", loc: "JSEC", rating: 98, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Breakfast"], image: "/images/yatako.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }], reviews: [] },
    { id: 2, name: "The Breakfast Club", loc: "JSEC", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Breakfast"], image: "/images/breakfast-club.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pancakes", price: 150 }], reviews: [] },
    { id: 3, name: "ONDO", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/ondo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Beef Bowl", price: 190 }], reviews: [] },
    { id: 4, name: "Suan Rak", loc: "JSEC", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Thai"], image: "/images/suan-rak.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pad Thai", price: 175 }], reviews: [] },
    { id: 5, name: "The Middle Feast", loc: "JSEC", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Middle Eastern"], image: "/images/middle-feast.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shawarma Rice", price: 165 }], reviews: [] },
    { id: 6, name: "Tampai", loc: "JSEC", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/tampai.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fusion Rice", price: 170 }], reviews: [] },
    { id: 7, name: "Lucky Kat", loc: "JSEC", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/lucky-kat.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Katsu", price: 185 }], reviews: [] },
    { id: 8, name: "Mongch", loc: "JSEC", rating: 87, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/mongch.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Rice Meal", price: 160 }], reviews: [] },
    { id: 9, name: "Baoba", loc: "JSEC", rating: 94, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Drinks"], image: "/images/baoba.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Milk Tea", price: 120 }], reviews: [] },
    { id: 10, name: "Hikori", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/hikori.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Grill", price: 195 }], reviews: [] },
    { id: 11, name: "Eagle Eatery", loc: "JSEC", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Budget"], image: "/images/eagle-eatery.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Student Meal", price: 99 }], reviews: [] },
    { id: 12, name: "Wagwan", loc: "JSEC", rating: 86, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/wagwan.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Caribbean Rice", price: 180 }], reviews: [] },
    { id: 13, name: "Kahlo", loc: "JSEC", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Mexican"], image: "/images/kahlo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Tacos", price: 150 }], reviews: [] },
    { id: 14, name: "Aja!", loc: "JSEC", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/aja.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Bibimbap", price: 170 }], reviews: [] },
    { id: 15, name: "Lami", loc: "JSEC", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Filipino"], image: "/images/lami.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Bisaya Dishes", price: 165 }], reviews: [] },
    { id: 16, name: "Nom Noms", loc: "JSEC", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/nom-noms.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Snacks", price: 140 }], reviews: [] },
    { id: 17, name: "Hoi An", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Vietnamese"], image: "/images/hoi-an.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Banh Mi", price: 155 }], reviews: [] },

    // --- GONZAGA STALLS ---
    { id: 18, name: "1Gonz", loc: "Gonzaga", rating: 85, price: "₱", hours: "7:00 AM - 6:00 PM", tags: ["Inside Campus", "Gonzaga", "Budget"], image: "/images/1gonz.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Economy Rice", price: 85 }], reviews: [] },
    { id: 19, name: "Jamaican Patty", loc: "Gonzaga", rating: 94, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga", "Snacks"], image: "/images/jamaican.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Beef Patty", price: 75 }], reviews: [] },
    { id: 20, name: "Day Off", loc: "Gonzaga", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga"], image: "/images/day-off.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Coffee", price: 130 }], reviews: [] },
    { id: 21, name: "TOMO Coffee", loc: "Gonzaga", rating: 96, price: "₱₱", hours: "7:30 AM - 6:00 PM", tags: ["Inside Campus", "Gonzaga", "Drinks"], image: "/images/tomo-gonz.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Iced Latte", price: 140 }], reviews: [] },
    { id: 22, name: "Get Bowl’d", loc: "Gonzaga", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga", "Healthy"], image: "/images/get-bowld.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Froyo", price: 180 }], reviews: [] },
    { id: 23, name: "Simply", loc: "Gonzaga", rating: 87, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga"], image: "/images/simply.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Healthy Bowl", price: 120 }], reviews: [] },
    { id: 24, name: "Chunky Chicks", loc: "Gonzaga", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga"], image: "/images/chunky-chicks.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fried Chicken", price: 160 }], reviews: [] },
    { id: 25, name: "Ghe!", loc: "Gonzaga", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga", "Budget"], image: "/images/ghe.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Rice Meal", price: 110 }], reviews: [] },

    // --- 2GONZ ---
    { id: 26, name: "Colonel’s Curry", loc: "2Gonz", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "2Gonz"], image: "/images/colonel-curry.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Beef Curry", price: 170 }], reviews: [] },
    { id: 27, name: "2 Gonz Cafe", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "2Gonz"], image: "/images/2gonz-cafe.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Coffee", price: 120 }], reviews: [] },

    // --- RESIDENCE HALLS & OTHER ---
    { id: 28, name: "Ebais", loc: "University Residence Halls", rating: 89, price: "₱", hours: "6:00 AM - 8:00 PM", tags: ["Inside Campus", "Budget", "Residence Halls"], image: "/images/ebais.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Dorm Meal", price: 90 }], reviews: [] },
    { id: 29, name: "Kitchen City", loc: "International Residence Halls", rating: 86, price: "₱₱", hours: "7:00 AM - 8:00 PM", tags: ["Inside Campus", "Residence Halls"], image: "/images/kitchen-city.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Buffet style", price: 150 }], reviews: [] },
    { id: 30, name: "Iggy’s", loc: "School of Theology", rating: 94, price: "₱", hours: "8:00 AM - 4:00 PM", tags: ["Inside Campus", "Budget"], image: "/images/iggys.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Home-cooked", price: 100 }], reviews: [] },
    { id: 31, name: "ISO", loc: "ISO", rating: 85, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus"], image: "/images/iso.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Canteen meal", price: 130 }], reviews: [] },
    { id: 32, name: "Rizal Library", loc: "Rizal Library", rating: 88, price: "₱₱", hours: "8:00 AM - 6:00 PM", tags: ["Inside Campus", "Study Spots"], image: "/images/rizal-lib.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Coffee", price: 140 }], reviews: [] },

    // --- REGIS CENTER ---
    { id: 33, name: "Domino’s Pizza", loc: "Regis 1/F", rating: 82, price: "₱₱", hours: "10:00 AM - 10:00 PM", tags: ["Regis", "Regis 1/F", "Fast"], image: "/images/dominos.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Pizza", price: 299 }], reviews: [] },
    { id: 34, name: "CBTL", loc: "Regis 1/F", rating: 91, price: "₱₱", hours: "7:00 AM - 11:00 PM", tags: ["Regis", "Regis 1/F", "Study Spots"], image: "/images/cbtl.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Iced Tea", price: 185 }], reviews: [] },
    { id: 35, name: "Tetsuo", loc: "Regis 2/F", rating: 94, price: "₱₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese", "Date Spot"], image: "/images/tetsuo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Karaage", price: 210 }], reviews: [] },
    { id: 36, name: "BOK Chicken", loc: "Regis 2/F", rating: 95, price: "₱₱", hours: "10:00 AM - 2:00 AM", tags: ["Regis", "Regis 2/F", "Korean"], image: "/images/bok.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "6pc Chicken", price: 195 }], reviews: [] },
    { id: 37, name: "JAAM House of Sushi", loc: "Regis 2/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese"], image: "/images/jaam.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Sushi Platter", price: 250 }], reviews: [] },
    { id: 38, name: "Dim Dum Tom", loc: "Regis 2/F", rating: 87, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Chinese"], image: "/images/dim-dum.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Dimsum", price: 160 }], reviews: [] },
    { id: 39, name: "Coco Milk Tea", loc: "Regis 2/F", rating: 92, price: "₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Drinks"], image: "/images/coco.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Panda Milk Tea", price: 130 }], reviews: [] },
    { id: 40, name: "Subway", loc: "Regis 3/F", rating: 88, price: "₱₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Healthy"], image: "/images/subway.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Sub", price: 230 }], reviews: [] },
    { id: 41, name: "Kim-s Ramyun", loc: "Regis 3/F", rating: 90, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Korean"], image: "/images/kims.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Ramyun", price: 180 }], reviews: [] },
    { id: 42, name: "Royal Tea", loc: "Regis 3/F", rating: 86, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/royal-tea.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Milk Tea", price: 120 }], reviews: [] },
    { id: 43, name: "Paotsin", loc: "Regis 3/F", rating: 97, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Budget"], image: "/images/paotsin.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shark's Fin Rice", price: 100 }], reviews: [] },
    { id: 44, name: "Fruitas", loc: "Regis 3/F", rating: 93, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/fruitas.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Juice", price: 80 }], reviews: [] },
    { id: 45, name: "Spudbae", loc: "Regis 3/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F"], image: "/images/spudbae.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Baked Potato", price: 150 }], reviews: [] },

    // --- NEAR ATENEO / KATIPUNAN ---
    { id: 46, name: "Busan Korean Restaurant", loc: "Katipunan", rating: 91, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Korean"], image: "/images/busan.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Samgyup", price: 499 }], reviews: [] },
    { id: 47, name: "Kanto Freestyle", loc: "Katipunan", rating: 94, price: "₱₱", hours: "24 Hours", tags: ["Near Ateneo", "Katipunan", "Breakfast"], image: "/images/kanto.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Tapa", price: 160 }], reviews: [] },
    { id: 48, name: "Go Salads!", loc: "Katipunan", rating: 89, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Near Ateneo", "Katipunan", "Healthy"], image: "/images/go-salads.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Salad", price: 190 }], reviews: [] },
    { id: 49, name: "JT’s Manukan", loc: "Katipunan", rating: 92, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Filipino"], image: "/images/jts.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Inasal", price: 180 }], reviews: [] },
    { id: 50, name: "Gino’s Brick Oven Pizza", loc: "Katipunan", rating: 96, price: "₱₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Date Spot"], image: "/images/ginos.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Margherita", price: 380 }], reviews: [] },
    { id: 51, name: "Zus Coffee", loc: "Katipunan", rating: 93, price: "₱₱", hours: "7:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Drinks"], image: "/images/zus.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Spanish Latte", price: 110 }], reviews: [] },
  ];

  const locations = ["All", "Inside Campus", "JSEC", "Gonzaga", "Regis 1/F", "Regis 2/F", "Regis 3/F", "Katipunan", "Near Ateneo", "Residence Halls"];
  const categories = ["Budget", "Study Spots", "Date Spot", "Korean", "Japanese", "Filipino", "Breakfast", "Fast"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter) || stall.loc.includes(activeFilter);
    const matchesPrice = priceFilter === "All" || stall.price === priceFilter;
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBudget = !budgetLimit || stall.menu.some(item => item.price <= budgetLimit);
    return matchesFilter && matchesSearch && matchesPrice && matchesBudget;
  });

  const handleQuickDecide = () => {
    const pool = [...filteredStalls];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    setQuickDecideResult(shuffled.slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-[#003A70] tracking-tight">Campus Bites</h1>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search stalls or food..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-[#003A70]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          <button className="bg-[#003A70] text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition text-sm">Login</button>
        </div>
      </nav>

      {/* --- HEADER --- */}
      <header className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">Eat like an Eagle.</h2>
        <p className="text-gray-500 text-lg mb-8">Discover all {stalls.length} spots across the Hill.</p>
        <button onClick={handleQuickDecide} className="bg-[#FFD700] text-[#003A70] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
            ⚡ Quick Decide
        </button>
      </header>

      {/* --- QUICK DECIDE RESULTS MODAL --- */}
      {quickDecideResult && (
          <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]">
              <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-[#003A70]">Eagle Picks</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Randomized for you</p>
                      </div>
                      <button onClick={() => setQuickDecideResult(null)} className="text-gray-400 hover:text-gray-900 font-bold text-xl">✕</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {quickDecideResult.map(stall => (
                          <div key={stall.id} onClick={() => {setSelectedStall(stall); setQuickDecideResult(null);}} className="cursor-pointer border border-gray-100 p-4 rounded-2xl hover:bg-blue-50 transition-all group">
                              <div className="h-24 bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                                  <img src={stall.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                              </div>
                              <h4 className="font-bold text-sm leading-tight">{stall.name}</h4>
                              <p className="text-[10px] text-gray-500 mt-1">{stall.loc}</p>
                          </div>
                      ))}
                  </div>
                  <button onClick={handleQuickDecide} className="w-full py-4 bg-[#FFD700] text-[#003A70] rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Re-roll!
                  </button>
              </div>
          </div>
      )}

      {/* --- TOP BAR LOCATION FILTERS --- */}
      <div className="flex gap-3 justify-center mb-12 px-8 overflow-x-auto no-scrollbar max-w-7xl mx-auto">
        {locations.map((filter) => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full transition-all whitespace-nowrap border-2 font-semibold text-xs ${
              activeFilter === filter 
              ? "bg-[#003A70] border-[#003A70] text-white shadow-md" 
              : "border-gray-100 text-gray-400 hover:border-[#003A70] hover:text-[#003A70]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* --- MAIN GRID --- */}
      <main className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStalls.map((stall) => (
            <div key={stall.id} onClick={() => setSelectedStall(stall)} className="group border border-gray-100 rounded-2xl hover:shadow-xl transition-all bg-white overflow-hidden cursor-pointer relative">
              {stall.isBestValue && <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">Best Value</div>}
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                  <img src={stall.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#003A70] z-20">{stall.rating}%</span>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold group-hover:text-[#003A70] transition mb-1 leading-tight">{stall.name}</h4>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>{stall.loc}</span>
                  <span className="text-green-700 font-bold">{stall.price}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {stall.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[8px] uppercase font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- DETAIL MODAL --- */}
      {selectedStall && (
        <div className="fixed inset-0 bg-[#003A70]/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button onClick={() => setSelectedStall(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition">✕</button>
            <h2 className="text-3xl font-black text-[#003A70] mb-6">{selectedStall.name}</h2>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-extrabold text-[#003A70] uppercase text-xs mb-4">Menu Selection</h3>
              <ul className="space-y-3">
                {selectedStall.menu.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span>{item.name}</span>
                    <span className="font-bold text-[#003A70]">₱{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setSelectedStall(null)} className="w-full mt-8 bg-[#003A70] text-white py-4 rounded-2xl font-bold">Back to Stalls</button>
          </div>
        </div>
      )}

      {/* --- ADVANCED FILTER MODAL --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsSearchModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 font-bold">✕</button>
            <h2 className="text-3xl font-black mb-8 text-gray-900">Filter Search</h2>
            
            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Budget Item</label>
              <div className="flex flex-wrap gap-2">
                {[100, 150, 200].map(price => (
                  <button key={price} onClick={() => setBudgetLimit(budgetLimit === price ? null : price)} className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${budgetLimit === price ? "bg-green-700 text-white border-green-700" : "border-gray-100 text-gray-500"}`}>Under ₱{price}</button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map(loc => (
                  <button key={loc} onClick={() => setActiveFilter(loc)} className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${activeFilter === loc ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-500"}`}>{loc}</button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Preference</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(opt => (
                  <button key={opt} onClick={() => setActiveFilter(opt)} className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all ${activeFilter === opt ? "bg-[#003A70] text-white border-[#003A70]" : "border-gray-100 text-gray-500"}`}>{opt}</button>
                ))}
              </div>
            </div>

            <button onClick={() => setIsSearchModalOpen(false)} className="w-full py-5 bg-[#003A70] text-white rounded-2xl font-black text-sm">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusBitesHome;