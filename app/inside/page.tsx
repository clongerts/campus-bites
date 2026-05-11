"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";

// --- INTERFACES ---
interface Menu { name: string; price: number; }
interface Review { id: string; user: string; rating: number; comment: string; isAnonymous: boolean; realityPhoto?: string; date: string; }
interface Stall {
  id: number;
  name: string;
  loc: string;
  mainLoc: "Within Ateneo" | "Outside Ateneo";
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

export default function WhereToDine() {
  const [activeMainTab, setActiveMainTab] = useState<"Within Ateneo" | "Outside Ateneo">("Within Ateneo");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);

  useEffect(() => { document.title = "Where To Dine"; }, []);

  // --- FULL RESTORED DATA ---
  const stalls: Stall[] = [
    { id: 1, name: "Yatako", loc: "JSEC", mainLoc: "Within Ateneo", rating: 98, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/JSEC/Yatako.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }, { name: "Chicken Teriyaki", price: 175 }, { name: "Salmon Aburi Bowl", price: 210 }, { name: "Extra Egg", price: 25 }], reviews: [{ id: "r1", user: "Anonymous Eagle", rating: 5, comment: "Actually looks like the photo! Beef is tender.", isAnonymous: true, date: "2026-04-12", realityPhoto: "/images/reality/yatako-tapa.jpg" }] },
    { id: 2, name: "The Breakfast Club", loc: "JSEC", mainLoc: "Within Ateneo", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Breakfast"], image: "/images/JSEC/tbc.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fluffy Pancakes", price: 150 }, { name: "Breakfast Burrito", price: 185 }, { name: "French Toast", price: 160 }, { name: "Cold Brew", price: 120 }], reviews: [] },
    { id: 3, name: "ONDO", loc: "JSEC", mainLoc: "Within Ateneo", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/JSEC/ondo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Beef Bulgogi Bowl", price: 190 }, { name: "Spicy Pork Rice", price: 180 }, { name: "Kimchi Fried Rice", price: 165 }, { name: "Fish Cake", price: 45 }], reviews: [] },
    { id: 4, name: "Suan Rak", loc: "JSEC", mainLoc: "Within Ateneo", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Thai"], image: "/images/JSEC/suanrak.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pad Thai", price: 175 }, { name: "Green Curry Rice", price: 185 }, { name: "Thai Milk Tea", price: 90 }, { name: "Mango Sticky Rice", price: 120 }], reviews: [] },
    { id: 5, name: "The Middle Feast", loc: "JSEC", mainLoc: "Within Ateneo", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Middle Eastern"], image: "/images/JSEC/middlefeast.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shawarma Rice", price: 165 }, { name: "Falafel Wrap", price: 150 }, { name: "Hummus w/ Pita", price: 120 }, { name: "Kefta Skewer", price: 145 }], reviews: [] },
    { id: 6, name: "Tampai", loc: "JSEC", mainLoc: "Within Ateneo", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/JSEC/tampai.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fusion Rice Bowl", price: 170 }, { name: "Tampai Wings (4pcs)", price: 180 }, { name: "Truffle Fries", price: 110 }], reviews: [] },
    { id: 7, name: "Lucky Kat", loc: "JSEC", mainLoc: "Within Ateneo", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/JSEC/luckykat.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Chicken Katsu", price: 185 }, { name: "Gyudon Bowl", price: 195 }, { name: "Katsu Sando", price: 160 }, { name: "Miso Soup", price: 40 }], reviews: [] },
    { id: 8, name: "Mongch", loc: "JSEC", mainLoc: "Within Ateneo", rating: 87, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/JSEC/monch.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Signature Rice Meal", price: 160 }, { name: "Crispy Pork Chop", price: 155 }, { name: "Sweet Glazed Chicken", price: 160 }], reviews: [] },
    { id: 9, name: "Baoba", loc: "JSEC", mainLoc: "Within Ateneo", rating: 94, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Drinks"], image: "/images/JSEC/baoba.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Classic Milk Tea", price: 120 }, { name: "Wintermelon Tea", price: 110 }, { name: "Brown Sugar Latte", price: 140 }, { name: "Cream Cheese Top", price: 30 }], reviews: [] },
    { id: 10, name: "Hikori", loc: "JSEC", mainLoc: "Within Ateneo", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/JSEC/hikori.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hibachi Grill Chicken", price: 195 }, { name: "Yakitori Skewer Set", price: 180 }, { name: "Grilled Corn", price: 75 }], reviews: [] },
    { id: 11, name: "Eagle Eatery", loc: "JSEC", mainLoc: "Within Ateneo", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Budget"], image: "/images/JSEC/eagle-eatery.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Student Meal A (Pork)", price: 99 }, { name: "Student Meal B (Chicken)", price: 99 }, { name: "Siomai Rice", price: 75 }, { name: "Extra Rice", price: 20 }], reviews: [] },
    { id: 12, name: "Wagwan", loc: "JSEC", mainLoc: "Within Ateneo", rating: 86, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/JSEC/wagwan.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Caribbean Rice Bowl", price: 180 }, { name: "Jerk Chicken Skewers", price: 190 }, { name: "Plantain Chips", price: 65 }], reviews: [] },
    { id: 13, name: "Kahlo", loc: "JSEC", mainLoc: "Within Ateneo", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Mexican"], image: "/images/JSEC/kahlo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Soft Tacos (2pcs)", price: 150 }, { name: "Cheese Quesadilla", price: 170 }, { name: "Loaded Nachos", price: 130 }, { name: "Horchata", price: 95 }], reviews: [] },
    { id: 14, name: "Aja!", loc: "JSEC", mainLoc: "Within Ateneo", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/JSEC/aja.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Classic Bibimbap", price: 170 }, { name: "Fried Mandu (5pcs)", price: 120 }, { name: "Japchae", price: 140 }], reviews: [] },
    { id: 15, name: "Lami", loc: "JSEC", mainLoc: "Within Ateneo", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Filipino"], image: "/images/JSEC/lami.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Bisaya Pork Humba", price: 175 }, { name: "Chicken Inasal Bowl", price: 165 }, { name: "Lechon Kawali Rice", price: 185 }], reviews: [] },
    { id: 16, name: "Nom Noms", loc: "JSEC", mainLoc: "Within Ateneo", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/JSEC/nomnoms.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Mozzarella Corn Dog", price: 95 }, { name: "Chicken Poppers", price: 140 }, { name: "Potato Wedges", price: 80 }], reviews: [] },
    { id: 17, name: "Hoi An", loc: "JSEC", mainLoc: "Within Ateneo", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Vietnamese"], image: "/images/JSEC/hoian.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pork Banh Mi", price: 155 }, { name: "Fresh Spring Rolls", price: 120 }, { name: "Beef Pho", price: 190 }], reviews: [] },

    { id: 18, name: "Yum Dum Dim", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 98, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/yumdumdim.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }, { name: "Chicken Teriyaki", price: 175 }, { name: "Salmon Aburi Bowl", price: 210 }, { name: "Extra Egg", price: 25 }], reviews: [{ id: "r1", user: "Anonymous Eagle", rating: 5, comment: "Actually looks like the photo! Beef is tender.", isAnonymous: true, date: "2026-04-12", realityPhoto: "/images/reality/yatako-tapa.jpg" }] },
    { id: 19, name: "Chillers", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 88, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Drinks"], image: "/images/chillers.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fruit Shake", price: 65 }, { name: "Iced Tea", price: 40 }], reviews: [] },
    { id: 20, name: "Colonel's Curry", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 85, price: "₱", hours: "7:00 AM - 6:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Budget"], image: "/images/colonelscurry.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Economy Rice (2 Viands)", price: 85 }, { name: "Pork Liempo Meal", price: 95 }, { name: "Giniling Rice", price: 75 }, { name: "Fried Egg", price: 15 }], reviews: [] },
    { id: 21, name: "Jamaican Patty", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 94, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Snacks"], image: "/images/jamaicanpatty.png", portionSize: "Small", isBestValue: false, menu: [{ name: "Beef Pinatubo (Spicy)", price: 75 }, { name: "Cheesy Beef", price: 85 }, { name: "Chicken Patty", price: 75 }], reviews: [] },
    { id: 22, name: "Chunky Chicks", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F"], image: "/images/chunkychicks.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "2pc Fried Chicken", price: 160 }, { name: "Chicken Sandwich", price: 175 }, { name: "Chicken Poppers", price: 120 }, { name: "Gravy Rice", price: 30 }], reviews: [] },
    { id: 23, name: "Day Off", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Cafe"], image: "/images/dayoff.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Iced Latte", price: 120 }, { name: "Cold Brew", price: 130 }], reviews: [] },
    { id: 24, name: "Get Bowld", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Rice Bowls"], image: "/images/getbowld.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Beef Gyudon", price: 190 }, { name: "Katsudon", price: 185 }], reviews: [] },
    { id: 25, name: "Ghe!", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Budget"], image: "/images/ghe.png", portionSize: "Regular", isBestValue: true, menu: [{ name: "Adobo Rice Meal", price: 110 }, { name: "Skinless Longganisa", price: 95 }, { name: "Tocino", price: 105 }], reviews: [] },
    { id: 26, name: "Luckys", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 87, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Budget"], image: "/images/luckys.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Sizzling Sisig", price: 99 }, { name: "Chicken Pastil", price: 75 }], reviews: [] },
    { id: 27, name: "Potato Corner", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 96, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Snacks"], image: "/images/potatocorner.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Mega Fries", price: 95 }, { name: "Giga Fries", price: 180 }], reviews: [] },
    { id: 28, name: "Simply", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Healthy"], image: "/images/simply.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Salad Bowl", price: 160 }, { name: "Fresh Juice", price: 90 }], reviews: [] },
    { id: 29, name: "Swirlicious", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 93, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Dessert"], image: "/images/swirlicious.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Soft Serve", price: 50 }, { name: "Swirl Cup", price: 75 }], reviews: [] },
    { id: 30, name: "Tomo", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 94, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Japanese"], image: "/images/tomo.png", portionSize: "Regular", isBestValue: false, menu: [{ name: "Sushi Roll", price: 150 }, { name: "Ramen", price: 220 }], reviews: [] },
    { id: 31, name: "Varda", loc: "Gonzaga", mainLoc: "Within Ateneo", rating: 92, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Burgers"], image: "/images/Varda.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Varda Burger", price: 85 }, { name: "Cheeseburger", price: 95 }], reviews: [] },
    
    { id: 34, name: "Ebais", loc: "Residence Halls", mainLoc: "Within Ateneo", rating: 89, price: "₱", hours: "6:00 AM - 8:00 PM", tags: ["Inside Campus", "Budget", "Residence Halls"], image: "/images/ebais.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Dorm Student Meal", price: 90 }, { name: "Breakfast Silog Set", price: 85 }, { name: "Nilaga Bowl", price: 110 }], reviews: [] },
    { id: 36, name: "Iggy's", loc: "Theology", mainLoc: "Within Ateneo", rating: 94, price: "₱", hours: "8:00 AM - 4:00 PM", tags: ["Inside Campus", "Budget"], image: "/images/iggys.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Home-cooked Viand", price: 100 }, { name: "Beef Tapa", price: 115 }, { name: "Sinigang", price: 120 }], reviews: [] },
    { id: 38, name: "Rizal Library", loc: "Library", mainLoc: "Within Ateneo", rating: 88, price: "₱₱", hours: "8:00 AM - 6:00 PM", tags: ["Inside Campus", "Study Spots"], image: "/images/rizal-lib.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Exam Fuel (Double Shot)", price: 140 }, { name: "Tuna Pesto Sandwich", price: 120 }, { name: "Hot Tea", price: 90 }], reviews: [] },

  ];

  const locations = ["JSEC", "Gonzaga", "Residence Halls", "Theology", "ISO", "Library", "Katipunan"];
  const categories = ["All", "Japanese", "Korean", "Thai", "Mexican", "Filipino", "Budget", "Breakfast", "Drinks", "Snacks"];

  return (
    <div className="min-h-screen flex flex-col text-gray-900" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      
      {/* --- FILTER MODAL --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#2003d4] text-white">
              <h2 className="font-black uppercase tracking-tight">Search & Filters</h2>
              <button onClick={() => setIsSearchModalOpen(false)} className="hover:rotate-90 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-[#2003d4]/40 mb-3 tracking-widest">Main Location</p>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                  {["Within Ateneo", "Outside Ateneo"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMainTab(tab as any)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeMainTab === tab ? "bg-[#2003d4] text-white shadow-md" : "text-gray-500 hover:text-[#2003d4]"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#2003d4]/40 mb-3 tracking-widest">Food Category</p>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${categoryFilter === cat ? "bg-[#ffe500] border-[#ffe500] text-[#2003d4]" : "border-gray-200 text-gray-500 hover:border-[#2003d4]"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsSearchModalOpen(false)} className="w-full bg-[#2003d4] text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg active:scale-[0.98] transition-transform">
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/1.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search stalls..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2003d4]/20 bg-[#ffffff]/90"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-[#ffffff]/10 rounded-full hover:bg-[#ffffff]/20 transition text-[#ffe500]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          <Link href="/foodmap" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold text-sm shadow">Map</Link>
          <Link href="/login" className="bg-[#ffffff] text-[#2003d4] px-5 py-2 rounded-full font-bold text-sm">Login</Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        {locations.map((location, idx) => {
          const locationStalls = stalls.filter(s => 
            s.loc === location && 
            s.mainLoc === activeMainTab &&
            (categoryFilter === "All" || s.tags.includes(categoryFilter)) &&
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (locationStalls.length === 0) return null;
          const isBlueSection = idx % 2 === 0;

          return (
            <section key={location} className={`${isBlueSection ? "bg-[#2003d4]" : "bg-[#f8f9ff]"} py-16 px-4`}>
              <div className="max-w-5xl mx-auto">
                <h2 className={`text-center text-4xl font-black mb-10 uppercase tracking-tighter ${isBlueSection ? "text-[#ffffff]" : "text-[#2003d4]"}`}>
                  {location}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {locationStalls.map(stall => (
                    <button onClick={() => setSelectedStall(stall)} key={stall.id} className="text-left group flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:-translate-y-1">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img src={stall.image} alt={stall.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 bg-[#2003d4] text-[#ffe500] px-2 py-0.5 rounded-full text-[10px] font-black">
                          {stall.rating}%
                        </div>
                      </div>
                      <div className="p-3 flex flex-col flex-grow bg-white">
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-[#2003d4] text-[11px] uppercase truncate pr-1">{stall.name}</h3>
                          <span className="text-[#2003d4]/40 font-bold text-[9px]">{stall.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {stall.tags.slice(0, 1).map(tag => (
                            <span key={tag} className="bg-gray-100 text-[#2003d4]/60 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* --- STALL DETAIL MODAL (Constrained Width/Height) --- */}
        {selectedStall && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* max-w-md and h-[85vh] strictly set to look like the image */}
            <div className="bg-white rounded-[2rem] w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100">
              <button onClick={() => setSelectedStall(null)} className="absolute top-5 right-5 z-20 bg-white/90 rounded-full p-2 hover:bg-white shadow-sm text-gray-500">
                ✕
              </button>

              <div className="p-7">
                {/* Reality Check */}
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2">📷 Reality Check</h4>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-44 shadow-inner">
                    <div className="relative">
                      <img src={selectedStall.image} className="w-full h-full object-cover" alt="Expectation" />
                      <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">Expectation</span>
                    </div>
                    <div className="bg-[#f2f6ff] flex items-center justify-center relative">
                      <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">Student Reality</span>
                      {selectedStall.reviews[0]?.realityPhoto ? (
                        <img src={selectedStall.reviews[0].realityPhoto} className="w-full h-full object-cover" alt="Reality" />
                      ) : (
                        <span className="text-gray-400 text-[10px] text-center px-6 leading-relaxed font-medium italic">No photo uploaded yet.</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4">Menu</h4>
                  <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-50">
                    {selectedStall.menu.length > 0 ? selectedStall.menu.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[13px]">
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        <span className="font-black text-gray-900">₱{item.price}</span>
                      </div>
                    )) : (
                       <p className="text-xs text-gray-400 italic">Menu data unavailable.</p>
                    )}
                  </div>
                </div>

                {/* Go! Button */}
                <button className="w-full bg-[#003580] hover:bg-[#002a66] text-white py-4 rounded-2xl font-black mb-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-colors">
                  Go! 📍
                </button>

                {/* Tags */}
                <div className="flex gap-2 mb-10 flex-wrap">
                  {selectedStall.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Reviews */}
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="font-black text-lg">Reviews</h4>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="font-black text-sm">{(selectedStall.rating / 20).toFixed(1)}</span>
                    </div>
                  </div>
                  {selectedStall.reviews.length > 0 ? selectedStall.reviews.map((rev) => (
                    <div key={rev.id} className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 mb-4">
                      <div className="flex justify-between text-[11px] text-gray-400 mb-2">
                        <span className="font-black text-[#2003d4]">{rev.user}</span>
                        <span className="font-medium">{rev.date}</span>
                      </div>
                      <div className="text-yellow-500 text-[10px] mb-2 tracking-widest">{"★".repeat(rev.rating)}</div>
                      <p className="text-[13px] italic text-gray-600 leading-relaxed">"{rev.comment}"</p>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-400 italic text-center py-4">No reviews yet. Be the first!</p>
                  )}
                </div>

                {/* Review and Earn */}
                <div className="mt-8 bg-[#eef4ff] p-5 rounded-2xl flex justify-between items-center border border-blue-100 shadow-sm">
                  <div className="pr-2">
                    <p className="text-[10px] font-black text-[#003580] uppercase tracking-tighter">Review & Earn</p>
                    <p className="text-[11px] text-[#003580] font-medium leading-tight mt-1">Submit a photo to get a 10% voucher!</p>
                  </div>
                  <button className="bg-[#1a5fff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-md shadow-blue-500/30 shrink-0 transition-colors">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#ffffff] py-8 text-center border-t border-slate-100">
        <p className="text-[#2003d4] text-[10px] font-black uppercase tracking-widest">Where To Dine • Ateneo 2026</p>
      </footer>
    </div>
  );
}