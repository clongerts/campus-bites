"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- INTERFACES ---
interface Menu { name: string; price: number; }
interface Review { id: string; user: string; rating: number; comment: string; isAnonymous: boolean; realityPhoto?: string; date: string; }
interface Stall {
  id: number;
  name: string;
  loc: string;
  rating: number; 
  price: string;
  tags: string[];
  image: string;
  menuImage?: string;
  expectationImage?: string;
  realityImage?: string;
  menu: Menu[];
  reviews: Review[];
  isBestValue: boolean;
}

export default function WhereToDine() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);

  // --- QUICK DECIDE STATES ---
  const [isQuickDecideOpen, setIsQuickDecideOpen] = useState(false);
  // UPDATED: Initialized as an array to support 3 columns
  const [randomStalls, setRandomStalls] = useState<Stall[]>([]); 
  const [isSpinning, setIsSpinning] = useState(false);

  const [filters, setFilters] = useState({ budget: '', location: 'All', category: '' });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (!selectedStall) return;
    console.log("Submitting:", { stallId: selectedStall.id, rating, comment });
    setRating(0);
    setComment("");
    setIsReviewModalOpen(false);
  };

  useEffect(() => { document.title = "Where To Dine"; }, []);

  // --- QUICK DECIDE LOGIC (UPDATED FOR 3 COLUMNS) ---
  const handleQuickDecide = () => {
    setIsQuickDecideOpen(true);
    setIsSpinning(true);
    
    let count = 0;
    const interval = setInterval(() => {
      // Pick 3 random unique stalls
      const shuffled = [...stalls].sort(() => 0.5 - Math.random());
      const selection = shuffled.slice(0, 3);
      
      setRandomStalls(selection);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  // --- FULL DATA ---
  const stalls: Stall[] = [
 // --- REGIS CENTER ---
    { id: 40, name: "Domino's Pizza", loc: "Regis Center", rating: 4, price: "₱200+", tags: ["Regis 1/F", "Fast"], image: "/images/dominos.jpg", menuImage: "/images/menus/dominos-menu.jpg", expectationImage: "/images/dominos.jpg", realityImage: "/images/reality/dominos-real.jpg", isBestValue: false, menu: [{ name: "Regular Pepperoni", price: 299 }, { name: "Creamy Carbonara", price: 199 }, { name: "Cheesy Breadsticks", price: 120 }], reviews: [] },
    { id: 41, name: "The Coffee Bean & Tea Leaf", loc: "Regis Center", rating: 5, price: "₱150-200", tags: ["Regis 1/F", "Study Spots"], image: "/images/cbtl.jpg", menuImage: "/images/menus/cbtl-menu.jpg", expectationImage: "/images/cbtl.jpg", realityImage: "/images/reality/cbtl-real.jpg", isBestValue: false, menu: [{ name: "African Sunrise Iced Tea", price: 185 }, { name: "Vanilla Latte", price: 175 }, { name: "Blueberry Muffin", price: 110 }], reviews: [] },
    { id: 42, name: "Tetsuo", loc: "Regis Center", rating: 5, price: "₱200+", tags: ["Regis 2/F", "Japanese", "Date Spot"], image: "/images/Regis/tetsuo.jpg", menuImage: "/images/menus/tetsuo-menu.jpg", expectationImage: "/images/tetsuo.jpg", realityImage: "/images/reality/tetsuo-real.jpg", isBestValue: false, menu: [{ name: "Signature Karaage (S)", price: 210 }, { name: "Cold Soba Noodles", price: 195 }, { name: "Umami Fried Rice", price: 95 }, { name: "Japanese Slaw", price: 60 }], reviews: [] },
    { id: 43, name: "BOK Chicken", loc: "Regis Center", rating: 5, price: "₱150-200", tags: ["Regis 2/F", "Korean"], image: "/images/Regis/BOK.jpg", menuImage: "/images/menus/bok-menu.jpg", expectationImage: "/images/bok.jpg", realityImage: "/images/reality/bok-real.jpg", isBestValue: false, menu: [{ name: "6pc Double Fried Chicken", price: 195 }, { name: "Snow Cheese Poppers", price: 155 }, { name: "BOK Rice Bowl", price: 175 }], reviews: [] },
    { id: 44, name: "JAAM House of Sushi", loc: "Regis Center", rating: 4, price: "₱150-200", tags: ["Regis 2/F", "Japanese"], image: "/images/jaam.jpg", menuImage: "/images/menus/jaam-menu.jpg", expectationImage: "/images/jaam.jpg", realityImage: "/images/reality/jaam-real.jpg", isBestValue: false, menu: [{ name: "Sushi Platter (Mixed)", price: 250 }, { name: "California Maki", price: 180 }, { name: "Ebi Tempura (3pcs)", price: 195 }], reviews: [] },
    { id: 45, name: "Dim Dum Tom", loc: "Regis Center", rating: 4, price: "₱150-200", tags: ["Regis 2/F", "Chinese"], image: "/images/dim-dum.jpg", menuImage: "/images/menus/dimdumtom-menu.jpg", expectationImage: "/images/dim-dum.jpg", realityImage: "/images/reality/dimdumtom-real.jpg", isBestValue: false, menu: [{ name: "Assorted Dimsum Box", price: 160 }, { name: "Beef Wonton Noodles", price: 185 }, { name: "Soy Chicken Rice", price: 170 }], reviews: [] },
    { id: 46, name: "Coco Milk Tea", loc: "Regis Center", rating: 5, price: "₱100-150", tags: ["Regis 2/F", "Drinks"], image: "/images/coco.jpg", menuImage: "/images/menus/coco-menu.jpg", expectationImage: "/images/coco.jpg", realityImage: "/images/reality/coco-real.jpg", isBestValue: false, menu: [{ name: "Panda Milk Tea", price: 130 }, { name: "3 Buddies Milk Tea", price: 145 }, { name: "Lemon Green Tea", price: 110 }], reviews: [] },
    { id: 47, name: "Subway", loc: "Regis Center", rating: 4, price: "₱200+", tags: ["Regis 3/F", "Healthy"], image: "/images/Regis/subway.jpg", menuImage: "/images/menus/subway-menu.jpg", expectationImage: "/images/subway.jpg", realityImage: "/images/reality/subway-real.jpg", isBestValue: false, menu: [{ name: "6-inch Roast Beef", price: 230 }, { name: "Footlong Upgrade", price: 160 }, { name: "Chocolate Chip Cookie", price: 50 }], reviews: [] },
    { id: 48, name: "Kim's Ramyun", loc: "Regis Center", rating: 5, price: "₱150-200", tags: ["Regis 3/F", "Korean"], image: "/images/kims.jpg", menuImage: "/images/menus/kims-menu.jpg", expectationImage: "/images/kims.jpg", realityImage: "/images/reality/kims-real.jpg", isBestValue: false, menu: [{ name: "Shin Ramyun Bowl", price: 180 }, { name: "Tuna Gimbap", price: 150 }, { name: "Tteokbokki", price: 165 }], reviews: [] },
    { id: 49, name: "Royal Tea", loc: "Regis Center", rating: 4, price: "₱100-150", tags: ["Regis 3/F", "Drinks"], image: "/images/royal-tea.jpg", menuImage: "/images/menus/royaltea-menu.jpg", expectationImage: "/images/royal-tea.jpg", realityImage: "/images/reality/royaltea-real.jpg", isBestValue: false, menu: [{ name: "Cheese Cream Matcha", price: 140 }, { name: "Royal Fruit Tea", price: 135 }, { name: "Oreo Cocoa", price: 125 }], reviews: [] },
    { id: 50, name: "Paotsin", loc: "Regis Center", rating: 5, price: "₱50-100", tags: ["Regis 3/F", "Budget"], image: "/images/Regis/paotsin.jpeg", menuImage: "/images/menus/paotsin-menu.jpg", expectationImage: "/images/paotsin.jpg", realityImage: "/images/reality/paotsin-real.jpg", isBestValue: true, menu: [{ name: "Shark's Fin w/ Green Rice", price: 100 }, { name: "Beef Siomai w/ Green Rice", price: 100 }, { name: "Laksa Noodles", price: 120 }, { name: "Fried Dumplings", price: 45 }], reviews: [] },

    // --- NEAR ATENEO / KATIPUNAN ---
    { id: 51, name: "Busan Korean Restaurant", loc: "Katipunan", rating: 5, price: "₱200+", tags: ["Near Ateneo", "Korean"], image: "/images/busan.jpg", menuImage: "/images/menus/busan-menu.jpg", expectationImage: "/images/busan.jpg", realityImage: "/images/reality/busan-real.jpg", isBestValue: false, menu: [{ name: "Beef Samgyup Set", price: 499 }, { name: "Dolsot Bibimbap", price: 250 }, { name: "Pork Cutlet", price: 280 }], reviews: [] },
    { id: 52, name: "Kanto Freestyle", loc: "Katipunan", rating: 5, price: "₱150-200", tags: ["Near Ateneo", "Breakfast"], image: "/images/kanto.jpg", menuImage: "/images/menus/kanto-menu.jpg", expectationImage: "/images/kanto.jpg", realityImage: "/images/reality/kanto-real.jpg", isBestValue: true, menu: [{ name: "Batangas Beef Tapa", price: 160 }, { name: "Honey Garlic Chicken", price: 155 }, { name: "Mixed Berry Pancakes", price: 140 }, { name: "Fried Oreo", price: 90 }], reviews: [] },
    { id: 53, name: "Go Salads!", loc: "Katipunan", rating: 4, price: "₱150-200", tags: ["Near Ateneo", "Healthy"], image: "/images/go-salads.jpg", menuImage: "/images/menus/gosalads-menu.jpg", expectationImage: "/images/go-salads.jpg", realityImage: "/images/reality/gosalads-real.jpg", isBestValue: false, menu: [{ name: "Hummus Salad", price: 190 }, { name: "Green Smoothie", price: 150 }, { name: "Chicken Pesto Wrap", price: 175 }], reviews: [] },
    { id: 54, name: "JT's Manukan", loc: "Katipunan", rating: 5, price: "₱150-200", tags: ["Near Ateneo", "Filipino"], image: "/images/jts.jpg", menuImage: "/images/menus/jts-menu.jpg", expectationImage: "/images/jts.jpg", realityImage: "/images/reality/jts-real.jpg", isBestValue: false, menu: [{ name: "Chicken Inasal Paa", price: 180 }, { name: "Garlic Rice", price: 35 }, { name: "Chicken Skin", price: 95 }, { name: "Batchoy", price: 145 }], reviews: [] },
    { id: 55, name: "Gino's Brick Oven Pizza", loc: "Katipunan", rating: 5, price: "₱200+", tags: ["Near Ateneo", "Date Spot"], image: "/images/ginos.jpg", menuImage: "/images/menus/ginos-menu.jpg", expectationImage: "/images/ginos.jpg", realityImage: "/images/reality/ginos-real.jpg", isBestValue: false, menu: [{ name: "Margherita Pizza", price: 380 }, { name: "Burrata", price: 450 }, { name: "Salted Egg Pasta", price: 320 }, { name: "Lemonade", price: 95 }], reviews: [] },
    { id: 56, name: "Zus Coffee", loc: "Katipunan", rating: 5, price: "₱100-150", tags: ["Near Ateneo", "Drinks"], image: "/images/zus.jpg", menuImage: "/images/menus/zus-menu.jpg", expectationImage: "/images/zus.jpg", realityImage: "/images/reality/zus-real.jpg", isBestValue: false, menu: [{ name: "CEO Latte", price: 95 }, { name: "Spanish Latte", price: 110 }, { name: "Buttercrush Frappe", price: 145 }, { name: "Oat Milk Upgrade", price: 35 }], reviews: [] }, 
  ];

  const locations = ["Regis Center", "Katipunan", "Esteban Abada", "Gate 2.5",];

  return (
    <div className="min-h-screen flex flex-col text-gray-900" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      
      {/* --- QUICK DECIDE MODAL (UPDATED 3-COLUMN LAYOUT) --- */}
      {isQuickDecideOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#2003d4]/40 backdrop-blur-xl">
          <div className="bg-white rounded-[3rem] w-full max-w-5xl overflow-hidden shadow-2xl p-8 md:p-12 text-center relative border-4 border-[#ffe500]">
            
            <button onClick={() => setIsQuickDecideOpen(false)} className="absolute top-8 right-8 z-10 hover:rotate-90 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>

            <h2 className="text-[#2003d4] font-black text-4xl mb-2 italic">LUCKY BITES!</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-10">Fate has picked three options for you...</p>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 transition-all duration-300 ${isSpinning ? "scale-95 opacity-50 grayscale" : "scale-100"}`}>
              {randomStalls.length > 0 ? (
                randomStalls.map((stall, index) => (
                  <div key={stall?.id || index} className="flex flex-col items-center p-4 rounded-[2rem] bg-blue-50/50 border-2 border-transparent hover:border-[#ffe500] transition-colors group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-8 border-[#ffe500] shadow-xl mb-6 group-hover:scale-105 transition-transform">
                      <img src={stall?.image} className="w-full h-full object-cover" alt={stall?.name} />
                    </div>
                    <h3 className="text-xl font-black text-[#2003d4] uppercase line-clamp-1">{stall?.name}</h3>
                    <p className="text-[#2003d4]/60 font-bold text-xs mb-4">{stall?.loc}</p>
                    
                    <button 
                      onClick={() => { setSelectedStall(stall); setIsQuickDecideOpen(false); }}
                      className="mt-auto w-full bg-[#2003d4] text-[#ffe500] py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-blue-700 transition-all"
                    >
                      Select This
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-10 text-gray-300 font-bold italic">Gathering recommendations...</div>
              )}
            </div>

            <div className="max-w-xs mx-auto">
               <button onClick={handleQuickDecide} disabled={isSpinning} className="w-full bg-gray-100 text-[#2003d4] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all border-b-4 border-gray-300">
                {isSpinning ? "Spinning..." : "Re-roll All"}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FILTER MODAL --- */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 flex justify-between items-center bg-white text-[#2003d4]">
              <h2 className="text-2xl font-black tracking-tight">Bite Filters</h2>
              <button onClick={() => setIsSearchModalOpen(false)} className="hover:rotate-90 transition-transform p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-8 space-y-7">
              <div>
                <p className="text-sm font-black text-[#2003d4] mb-3">Budget</p>
                <div className="flex flex-wrap gap-2">
                  {["Under ₱50", "₱50-100", "₱100-150", "₱150-200", "₱200+"].map((b) => (
                    <button key={b} onClick={() => setFilters({ ...filters, budget: b })} className={`px-4 py-2 text-[11px] font-bold rounded-full transition-all ${filters.budget === b ? "bg-[#2003d4] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{b}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-[#2003d4] mb-3">Location</p>
                <div className="flex flex-wrap gap-2">
                  {["All", "JSEC", "Gonzaga", "Residence Halls", "Theology", "Library"].map((loc) => (
                    <button key={loc} onClick={() => setFilters({ ...filters, location: loc })} className={`px-4 py-2 text-[11px] font-bold rounded-full transition-all ${filters.location === loc ? "bg-[#2003d4] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{loc}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-black text-[#2003d4] mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {["Budget", "Study Spots", "Date Spot", "Asian", "Breakfast", "Fast"].map((cat) => (
                    <button key={cat} onClick={() => setFilters({ ...filters, category: cat })} className={`px-4 py-2 text-[11px] font-bold rounded-full transition-all ${filters.category === cat ? "bg-[#2003d4] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setFilters({ budget: '', location: 'All', category: '' })} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">Clear All</button>
                <button onClick={() => setIsSearchModalOpen(false)} className="flex-1 bg-[#2003d4] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-transform">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- REVIEW MODAL --- */}
      {isReviewModalOpen && selectedStall && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-[#2003d4]">New Review</h2>
                <button onClick={() => setIsReviewModalOpen(false)} className="hover:rotate-90 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Reviewing: {selectedStall.name}</p>
             <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-500">Rating</label>
                  <div className="flex gap-2 text-2xl mt-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} className={`transition-colors duration-200 ${s <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-200"}`}>★</button>
                    ))}
                  </div>
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about your meal..." className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none border-none focus:ring-2 focus:ring-blue-100 resize-none"></textarea>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                   <p className="text-[10px] font-black text-blue-500">UPLOAD REALITY PHOTO</p>
                </div>
                <button onClick={handleSubmitReview} disabled={rating === 0} className={`w-full py-4 rounded-2xl font-black uppercase text-xs shadow-lg transition-all ${rating > 0 ? "bg-[#2003d4] text-white shadow-blue-200 active:scale-[0.98]" : "bg-gray-300 text-gray-100 cursor-not-allowed"}`}>Post Review</button>
             </div>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/assets/1.png" alt="Campus Bites" className="h-8 object-contain" />
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
         <Link href="/foodmap" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>Map</Link>
          <Link href="/login" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm" style={{ textDecoration: "none" }}>Login</Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        
        {/* --- QUICK DECIDE HERO SECTION (NEW POSITION) --- */}
        <section className="bg-[#2003d4] pt-20 pb-10 px-4 text-center">
           <div className="max-w-2xl mx-auto">
              <h1 className="text-white text-5xl font-black mb-6 tracking-tighter leading-none">CAN'T DECIDE?</h1>
              <p className="text-blue-200 text-sm mb-8 font-medium">Let fate pick your next Campus Bite. Click below for a random recommendation.</p>
              <button 
                onClick={handleQuickDecide}
                className="bg-[#ffe500] text-[#2003d4] px-10 py-5 rounded-3xl font-black text-lg uppercase tracking-tight shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 border-b-4 border-[#d4be00]"
              >
                 <span>✨</span> QUICK DECIDE
              </button>
           </div>
        </section>

        {locations.map((location, idx) => {
          const locationStalls = stalls.filter(s => 
            s.loc === location && 
            (filters.location === "All" || s.loc === filters.location) &&
            (filters.budget === "" || s.price === filters.budget) &&
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
                        <div className="absolute top-2 right-2 bg-[#2003d4] text-[#ffe500] px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-0.5">
                            <span>{stall.rating}</span><span className="text-[8px]">★</span>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col flex-grow bg-white">
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-[#2003d4] text-[11px] uppercase truncate pr-1">{stall.name}</h3>
                          <span className="text-[#2003d4]/60 font-bold text-[9px]">{stall.price}</span>
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

        {/* --- STALL DETAIL MODAL --- */}
        {selectedStall && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100">
              <button onClick={() => setSelectedStall(null)} className="absolute top-5 right-5 z-20 hover:rotate-90 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-7">
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2">📷 Reality Check</h4>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-44 shadow-inner">
                    <div className="relative h-full w-full overflow-hidden bg-[#f2f6ff] flex items-center justify-center">
                      {selectedStall.expectationImage ? (
                        <img src={selectedStall.expectationImage} className="w-full h-full object-cover" alt="Expectation" />
                      ) : (
                        <span className="text-gray-400 text-[10px] text-center px-6 leading-relaxed font-medium italic">No photo uploaded yet.</span>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-black/50 py-1.5 z-10 text-center">
                        <span className="text-white text-[9px] font-black uppercase tracking-wider">Expectation</span>
                      </div>
                    </div>
                    <div className="relative h-full w-full overflow-hidden bg-[#f2f6ff] flex items-center justify-center">
                      {selectedStall.realityImage ? (
                        <img src={selectedStall.realityImage} className="w-full h-full object-cover" alt="Reality" />
                      ) : (
                        <span className="text-gray-400 text-[10px] text-center px-6 leading-relaxed font-medium italic">No photo uploaded yet.</span>
                      )}
                      <div className="absolute bottom-0 left-0 w-full bg-black/50 py-1.5 z-10 text-center">
                        <span className="text-white text-[9px] font-black uppercase tracking-wider">Reality</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2">🔥 Best Sellers</h4>
                  <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-50">
                    {selectedStall.menu.length > 0 ? selectedStall.menu.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[13px]">
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        <span className="font-black text-gray-900">₱{item.price}</span>
                      </div>
                    )) : (
                       <p className="text-xs text-gray-400 italic">No best sellers listed.</p>
                    )}
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2">📋 Full Menu</h4>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[4/3] relative group">
                    {selectedStall.menuImage ? (
                       <img src={selectedStall.menuImage} className="w-full h-full object-cover" alt="Menu" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400 text-[10px] italic">Menu photo coming soon</span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => router.push("/foodmap")}
                  className="w-full bg-[#003580] hover:bg-[#002a66] text-white py-4 rounded-2xl font-black mb-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-colors"
                >
                  Go! 📍
                </button>

                <div className="flex gap-2 mb-10 flex-wrap">
                  {selectedStall.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight">{tag}</span>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="font-black text-lg">Reviews</h4>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="font-black text-sm">{selectedStall.rating.toFixed(1)}</span>
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

                <div className="mt-8 bg-[#eef4ff] p-5 rounded-2xl flex justify-between items-center border border-blue-100 shadow-sm">
                  <div className="pr-2">
                    <p className="text-[10px] font-black text-[#003580] uppercase tracking-tighter">Review & Earn</p>
                    <p className="text-[11px] text-[#003580] font-medium leading-tight mt-1">Submit a photo to get a 10% voucher!</p>
                  </div>
                  <button 
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-[#1a5fff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-md shadow-blue-500/30 shrink-0 transition-colors"
                  >
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