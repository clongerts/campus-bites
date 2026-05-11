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
  menuImage?: string;       // NEW
  expectationImage?: string; // NEW
  realityImage?: string;     // NEW
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

  // --- FULL DATA ---
  const stalls: Stall[] = [
    // -- JSEC ---
    { id: 1, name: "Yatako", loc: "JSEC", rating: 5, price: "₱150-200", tags: ["JSEC", "Japanese"], image: "/images/JSEC/Yatako.jpg", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }, { name: "Chicken Teriyaki", price: 175 }, { name: "Salmon Aburi Bowl", price: 210 }, { name: "Extra Egg", price: 25 }], reviews: [{ id: "r1", user: "Anonymous Eagle", rating: 5, comment: "Actually looks like the photo! Beef is tender.", isAnonymous: true, date: "2026-04-12", realityPhoto: "/images/reality/yatako-tapa.jpg" }] },
    { id: 2, name: "The Breakfast Club", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Breakfast"], image: "/images/JSEC/TBC.jpg", isBestValue: false, menu: [{ name: "Fluffy Pancakes", price: 150 }, { name: "Breakfast Burrito", price: 185 }, { name: "French Toast", price: 160 }, { name: "Cold Brew", price: 120 }], reviews: [] },
    { id: 3, name: "ONDO", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Korean"], image: "/images/JSEC/ondo.jpg", isBestValue: false, menu: [{ name: "Beef Bulgogi Bowl", price: 190 }, { name: "Spicy Pork Rice", price: 180 }, { name: "Kimchi Fried Rice", price: 165 }, { name: "Fish Cake", price: 45 }], reviews: [] },
    { id: 4, name: "Suan Rak", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Thai"], image: "/images/JSEC/suanrak.jpg", isBestValue: false, menu: [{ name: "Pad Thai", price: 175 }, { name: "Green Curry Rice", price: 185 }, { name: "Thai Milk Tea", price: 90 }, { name: "Mango Sticky Rice", price: 120 }], reviews: [] },
    { id: 5, name: "The Middle Feast", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Middle Eastern"], image: "/images/JSEC/middlefeast.jpg", isBestValue: true, menu: [{ name: "Shawarma Rice", price: 165 }, { name: "Falafel Wrap", price: 150 }, { name: "Hummus w/ Pita", price: 120 }, { name: "Kefta Skewer", price: 145 }], reviews: [] },
    { id: 6, name: "Tampai", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC"], image: "/images/JSEC/tampai.jpg", isBestValue: false, menu: [{ name: "Fusion Rice Bowl", price: 170 }, { name: "Tampai Wings (4pcs)", price: 180 }, { name: "Truffle Fries", price: 110 }], reviews: [] },
    { id: 7, name: "Lucky Kat", loc: "JSEC", rating: 5, price: "₱150-200", tags: ["JSEC", "Japanese"], image: "/images/JSEC/luckykat.jpg", isBestValue: false, menu: [{ name: "Chicken Katsu", price: 185 }, { name: "Gyudon Bowl", price: 195 }, { name: "Katsu Sando", price: 160 }, { name: "Miso Soup", price: 40 }], reviews: [] },
    { id: 8, name: "Mongch", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC"], image: "/images/JSEC/monch.jpg", isBestValue: false, menu: [{ name: "Signature Rice Meal", price: 160 }, { name: "Crispy Pork Chop", price: 155 }, { name: "Sweet Glazed Chicken", price: 160 }], reviews: [] },
    { id: 9, name: "Baoba", loc: "JSEC", rating: 5, price: "₱100-150", tags: ["JSEC", "Drinks"], image: "/images/JSEC/Baoba.jpg", isBestValue: false, menu: [{ name: "Classic Milk Tea", price: 120 }, { name: "Wintermelon Tea", price: 110 }, { name: "Brown Sugar Latte", price: 140 }, { name: "Cream Cheese Top", price: 30 }], reviews: [] },
    { id: 10, name: "Hikori", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC"], image: "/images/JSEC/hikori.jpg", isBestValue: false, menu: [{ name: "Hibachi Grill Chicken", price: 195 }, { name: "Yakitori Skewer Set", price: 180 }, { name: "Grilled Corn", price: 75 }], reviews: [] },
    { id: 11, name: "Eagle Eatery", loc: "JSEC", rating: 5, price: "₱50-100", tags: ["JSEC", "Budget"], image: "/images/JSEC/eagle-eatery.jpg", isBestValue: true, menu: [{ name: "Student Meal A (Pork)", price: 99 }, { name: "Student Meal B (Chicken)", price: 99 }, { name: "Siomai Rice", price: 75 }, { name: "Extra Rice", price: 20 }], reviews: [] },
    { id: 12, name: "Wagwan", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC"], image: "/images/JSEC/wagwan.PNG", isBestValue: false, menu: [{ name: "Caribbean Rice Bowl", price: 180 }, { name: "Jerk Chicken Skewers", price: 190 }, { name: "Plantain Chips", price: 65 }], reviews: [] },
    { id: 13, name: "Kahlo", loc: "JSEC", rating: 5, price: "₱150-200", tags: ["JSEC", "Mexican"], image: "/images/JSEC/kahlo.jpg", isBestValue: false, menu: [{ name: "Soft Tacos (2pcs)", price: 150 }, { name: "Cheese Quesadilla", price: 170 }, { name: "Loaded Nachos", price: 130 }, { name: "Horchata", price: 95 }], reviews: [] },
    { id: 14, name: "Aja!", loc: "JSEC", rating: 5, price: "₱150-200", tags: ["JSEC", "Korean"], image: "/images/JSEC/aja.jpg", isBestValue: false, menu: [{ name: "Classic Bibimbap", price: 170 }, { name: "Fried Mandu (5pcs)", price: 120 }, { name: "Japchae", price: 140 }], reviews: [] },
    { id: 15, name: "Lami", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Filipino"], image: "/images/JSEC/lami.jpg", isBestValue: false, menu: [{ name: "Bisaya Pork Humba", price: 175 }, { name: "Chicken Inasal Bowl", price: 165 }, { name: "Lechon Kawali Rice", price: 185 }], reviews: [] },
    { id: 16, name: "Nom Noms", loc: "JSEC", rating: 4, price: "₱100-150", tags: ["JSEC"], image: "/images/JSEC/nomnoms.PNG", isBestValue: false, menu: [{ name: "Mozzarella Corn Dog", price: 95 }, { name: "Chicken Poppers", price: 140 }, { name: "Potato Wedges", price: 80 }], reviews: [] },
    { id: 17, name: "Hoi An", loc: "JSEC", rating: 4, price: "₱150-200", tags: ["JSEC", "Vietnamese"], image: "/images/JSEC/hoian.PNG", isBestValue: false, menu: [{ name: "Pork Banh Mi", price: 155 }, { name: "Fresh Spring Rolls", price: 120 }, { name: "Beef Pho", price: 190 }], reviews: [] },
  
// -- GONZ ---
  { id: 18, name: "Yum Dum Dim", loc: "Gonzaga", rating: 5, price: "₱150-200", tags: ["Gonzaga 2/F","Japanese"], image: "/images/Gonzaga/yumdumdim.jpg", menuImage: "/images/Gonzaga/menus/yumdumdimmenu.jpg", expectationImage: "/images/Gonzaga/yumdumdim.jpg", realityImage: "/images/reality/yumdumdim-real.jpg", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }, { name: "Chicken Teriyaki", price: 175 }, { name: "Salmon Aburi Bowl", price: 210 }, { name: "Extra Egg", price: 25 }], reviews: [{ id: "g1", user: "BlueEagle99", rating: 5, comment: "Best dimsum on campus, hands down.", isAnonymous: false, date: "2026-05-01" }] },
  { id: 19, name: "Chillers", loc: "Gonzaga", rating: 4, price: "₱50-100", tags: ["Gonzaga 2/F","Drinks"], image: "/images/Gonzaga/chillers.jpg", menuImage: "/images/Gonzaga/menus/chillersmenu.jpg", expectationImage: "/images/Gonzaga/chillers.jpg", realityImage: "/images/reality/chillers-real.jpg", isBestValue: false, menu: [{ name: "Fruit Shake", price: 65 }, { name: "Iced Tea", price: 40 }], reviews: [{ id: "g2", user: "HydrationNation", rating: 4, comment: "Perfect for the heat, though lines get long.", isAnonymous: true, date: "2026-04-28" }] },
  { id: 20, name: "Colonel's Curry", loc: "Gonzaga", rating: 4, price: "₱50-100", tags: ["Gonzaga 2/F", "Budget"], image: "/images/Gonzaga/colonelscurry.jpg", menuImage: "/images/Gonzaga/menus/colonelscurrymenu.jpg", expectationImage: "/images/Gonzaga/colonelscurry.jpg", realityImage: "/images/reality/colonelscurry-real.jpg", isBestValue: true, menu: [{ name: "Economy Rice (2 Viands)", price: 85 }, { name: "Pork Liempo Meal", price: 95 }, { name: "Giniling Rice", price: 75 }, { name: "Fried Egg", price: 15 }], reviews: [{ id: "g3", user: "BudgetKing", rating: 4, comment: "Reliable student meal. The liempo is great.", isAnonymous: false, date: "2026-05-02" }] },
  { id: 21, name: "Jamaican Patty", loc: "Gonzaga", rating: 5, price: "₱50-100", tags: ["Gonzaga 1/F", "Snacks"], image: "/images/Gonzaga/jamaicanpatty.png", menuImage: "/images/Gonzaga/menus/jamaicanmenu.jpg", expectationImage: "/images/Gonzaga/jamaicanpatty.png", realityImage: "/images/reality/jamaicanpatty-real.jpg", isBestValue: false, menu: [{ name: "Beef Pinatubo (Spicy)", price: 75 }, { name: "Cheesy Beef", price: 85 }, { name: "Chicken Patty", price: 75 }], reviews: [{ id: "g4", user: "SpiceLover", rating: 5, comment: "Pinatubo is actually spicy! Love it.", isAnonymous: true, date: "2026-05-05" }] },
  { id: 22, name: "Chunky Chicks", loc: "Gonzaga", rating: 4, price: "₱150-200", tags: ["Gonzaga 1/F"], image: "/images/Gonzaga/chunkychicks.png", menuImage: "/images/Gonzaga/menus/chunkychicksmenu.jpg", expectationImage: "/images/Gonzaga/chunkychicks.png", realityImage: "/images/reality/chunkychicks-real.jpg", isBestValue: false, menu: [{ name: "2pc Fried Chicken", price: 160 }, { name: "Chicken Sandwich", price: 175 }, { name: "Chicken Poppers", price: 120 }, { name: "Gravy Rice", price: 30 }], reviews: [{ id: "g5", user: "ProteinPal", rating: 4, comment: "Portions are huge. Good value.", isAnonymous: false, date: "2026-05-08" }] },
  { id: 23, name: "Day Off", loc: "Gonzaga", rating: 4, price: "₱100-150", tags: ["Gonzaga 1/F","Cafe"], image: "/images/Gonzaga/dayoff.png", menuImage: "/images/Gonzaga/menus/dayoffmenu.jpg", expectationImage: "/images/Gonzaga/dayoff.png", realityImage: "/images/reality/dayoff-real.jpg", isBestValue: false, menu: [{ name: "Iced Latte", price: 120 }, { name: "Cold Brew", price: 130 }], reviews: [{ id: "g6", user: "CaffeineFiend", rating: 4, comment: "Solid cold brew to get through Theo.", isAnonymous: true, date: "2026-05-10" }] },
  { id: 24, name: "Get Bowld", loc: "Gonzaga", rating: 4, price: "₱150-200", tags: ["Gonzaga 2/F","Rice Bowls"], image: "/images/Gonzaga/getbowld.png", menuImage: "/images/Gonzaga/menus/getbowldmenu.jpg", expectationImage: "/images/Gonzaga/getbowld.png", realityImage: "/images/reality/getbowld-real.jpg", isBestValue: false, menu: [{ name: "Beef Gyudon", price: 190 }, { name: "Katsudon", price: 185 }], reviews: [{ id: "g7", user: "RiceBowlFan", rating: 4, comment: "Very filling and the beef is tender.", isAnonymous: false, date: "2026-05-03" }] },
  { id: 25, name: "Ghe!", loc: "Gonzaga", rating: 5, price: "₱100-150", tags: ["Gonzaga 1/F", "Budget"], image: "/images/Gonzaga/ghe.png", menuImage: "/images/Gonzaga/menus/ghemenu.jpg", expectationImage: "/images/Gonzaga/ghe.png", realityImage: "/images/reality/ghe-real.jpg", isBestValue: true, menu: [{ name: "Adobo Rice Meal", price: 110 }, { name: "Skinless Longganisa", price: 95 }, { name: "Tocino", price: 105 }], reviews: [{ id: "g8", user: "LolaVibes", rating: 5, comment: "Tastes like home. Adobo is top notch.", isAnonymous: false, date: "2026-04-30" }] },
  { id: 26, name: "Luckys", loc: "Gonzaga", rating: 4, price: "₱50-100", tags: ["Gonzaga 2/F","Budget"], image: "/images/Gonzaga/luckys.jpg", menuImage: "/images/Gonzaga/menus/luckysmenu.jpg", expectationImage: "/images/Gonzaga/luckys.jpg", realityImage: "/images/reality/luckys-real.jpg", isBestValue: true, menu: [{ name: "Sizzling Sisig", price: 99 }, { name: "Chicken Pastil", price: 75 }], reviews: [{ id: "g9", user: "SisigScholar", rating: 4, comment: "Cheap and satisfying sisig.", isAnonymous: true, date: "2026-05-01" }] },
  { id: 27, name: "Potato Corner", loc: "Gonzaga", rating: 5, price: "₱50-100", tags: ["Gonzaga 1/F","Snacks"], image: "/images/Gonzaga/potatocorner.png", menuImage: "/images/Gonzaga/menus/potatocornermenu.jpg", expectationImage: "/images/Gonzaga/potatocorner.png", realityImage: "/images/reality/potatocorner-real.jpg", isBestValue: false, menu: [{ name: "Mega Fries", price: 95 }, { name: "Giga Fries", price: 180 }], reviews: [{ id: "g10", user: "FryGuy", rating: 5, comment: "Always fresh and well-seasoned.", isAnonymous: false, date: "2026-05-09" }] },
  { id: 28, name: "Simply", loc: "Gonzaga", rating: 4, price: "₱150-200", tags: ["Gonzaga 1/F","Healthy"], image: "/images/Gonzaga/simply.png", menuImage: "/images/Gonzaga/menus/simplymenu.jpg", expectationImage: "/images/Gonzaga/simply.png", realityImage: "/images/reality/simply-real.jpg", isBestValue: false, menu: [{ name: "Salad Bowl", price: 160 }, { name: "Fresh Juice", price: 90 }], reviews: [{ id: "g11", user: "HealthNut", rating: 4, comment: "Hard to find healthy food on campus, this is a gem.", isAnonymous: false, date: "2026-05-04" }] },
  { id: 29, name: "Swirlicious", loc: "Gonzaga", rating: 5, price: "₱50-100", tags: ["Gonzaga 2/F","Dessert"], image: "/images/Gonzaga/swirlicious.jpg", menuImage: "/images/Gonzaga/menus/swirliciousmenu.jpg", expectationImage: "/images/Gonzaga/swirlicious.jpg", realityImage: "/images/reality/swirlicious-real.jpg", isBestValue: false, menu: [{ name: "Soft Serve", price: 50 }, { name: "Swirl Cup", price: 75 }], reviews: [{ id: "g12", user: "SweetTooth", rating: 5, comment: "Best soft serve for the price.", isAnonymous: true, date: "2026-05-06" }] },
  { id: 30, name: "Tomo", loc: "Gonzaga", rating: 5, price: "₱150-200", tags: ["Gonzaga 1/F","Japanese"], image: "/images/Gonzaga/tomo.png", menuImage: "/images/Gonzaga/menus/tomomenu.jpg", expectationImage: "/images/Gonzaga/tomo.png", realityImage: "/images/reality/tomo-real.jpg", isBestValue: false, menu: [{ name: "Sushi Roll", price: 150 }, { name: "Ramen", price: 220 }], reviews: [{ id: "g13", user: "SushiMaster", rating: 5, comment: "The ramen broth is surprisingly rich.", isAnonymous: false, date: "2026-05-07" }] },
  { id: 31, name: "Varda", loc: "Gonzaga", rating: 5, price: "₱50-100", tags: ["Gonzaga 2/F","Burgers"], image: "/images/Gonzaga/Varda.jpg", menuImage: "/images/Gonzaga/menus/vardamenu.jpg", expectationImage: "/images/Gonzaga/Varda.jpg", realityImage: "/images/reality/varda-real.jpg", isBestValue: true, menu: [{ name: "Varda Burger", price: 85 }, { name: "Cheeseburger", price: 95 }], reviews: [{ id: "g14", user: "BurgerKing", rating: 5, comment: "Unbeatable price for a good burger.", isAnonymous: true, date: "2026-05-08" }] },
    // -- Others ---
    { id: 34, name: "Ebais", loc: "Residence Halls", rating: 4, price: "₱50-100", tags: ["Budget", "Residence Halls"], image: "/images/ebais.png", isBestValue: true, menu: [{ name: "Dorm Student Meal", price: 90 }, { name: "Breakfast Silog Set", price: 85 }, { name: "Nilaga Bowl", price: 110 }], reviews: [] },
    { id: 35, name: "IRH", loc: "Residence Halls", rating: 4, price: "₱50-100", tags: ["Budget", "Residence Halls"], image: "/images/IRH.png", isBestValue: true, menu: [{ name: "Dorm Student Meal", price: 90 }, { name: "Breakfast Silog Set", price: 85 }, { name: "Nilaga Bowl", price: 110 }], reviews: [] },
    { id: 36, name: "Iggy's", loc: "Theology", rating: 5, price: "₱100-150", tags: ["Budget"], image: "/images/iggys.jpg", isBestValue: true, menu: [{ name: "Home-cooked Viand", price: 100 }, { name: "Beef Tapa", price: 115 }, { name: "Sinigang", price: 120 }], reviews: [] },
    { id: 38, name: "Rizal Library", loc: "Library", rating: 4, price: "₱100-150", tags: ["Rizal","Study Spots"], image: "/images/rizal-lib.jpg", isBestValue: false, menu: [{ name: "Exam Fuel (Double Shot)", price: 140 }, { name: "Tuna Pesto Sandwich", price: 120 }, { name: "Hot Tea", price: 90 }], reviews: [] },
  ];

  const locations = ["JSEC", "Gonzaga", "Residence Halls", "Theology", "ISO", "Library"];

  return (
    <div className="min-h-screen flex flex-col text-gray-900" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      
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
                  {["Budget", "Study Spots", "Date Spot", "Korean", "Japanese", "Filipino", "Breakfast", "Fast"].map((cat) => (
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
                      <button 
                        key={s} 
                        type="button"
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(s)}
                        className={`transition-colors duration-200 ${
                          s <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-200"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your meal..." 
                  className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none border-none focus:ring-2 focus:ring-blue-100 resize-none"
                ></textarea>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                   <p className="text-[10px] font-black text-blue-500">UPLOAD REALITY PHOTO</p>
                </div>
                <button 
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  className={`w-full py-4 rounded-2xl font-black uppercase text-xs shadow-lg transition-all ${
                    rating > 0 
                    ? "bg-[#2003d4] text-white shadow-blue-200 active:scale-[0.98]" 
                    : "bg-gray-300 text-gray-100 cursor-not-allowed"
                  }`}
                >
                  Post Review
                </button>
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
         <Link href="/foodmap" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
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
                    <div className="relative">
                      <img src={selectedStall.expectationImage} className="w-full h-full object-cover" alt="Expectation" />
                      <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">Expectation</span>
                        <span className="text-gray-400 text-[10px] text-center px-6 leading-relaxed font-medium italic">No photo uploaded yet.</span>
                         <div className="absolute inset-0 flex flex-col justify-end">
                          <span className="bg-black/60 text-[#ffffff] text-[8px] px-1.5 py-0.5 font-bold">Expectation</span>
                         </div>
                      
                      {/* --- PERSISTENT EXPECTATION OVERLAY --- */}
                      <div className="absolute bottom-0 left-0 w-full bg-black/50 py-1.5 z-10 text-center">
                        <span className="text-white text-[9px] font-black uppercase tracking-wider">Expectation</span>
                      </div>
                    </div>

                    <div className="bg-[#f2f6ff] flex items-center justify-center relative">
                      <span className="absolute bottom-2 left-2 text-[8px] font-bold bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">Student Reality</span>
                      {selectedStall.reviews[0]?.realityPhoto ? (
                        <img src={selectedStall.reviews[0].realityPhoto} className="w-full h-full object-cover" alt="Reality" />
                      ) : (
                        <span className="text-gray-400 text-[10px] text-center px-6 leading-relaxed font-medium italic">No photo uploaded yet.</span>
                      )}

                      {/* --- PERSISTENT REALITY OVERLAY --- */}
                      <div className="absolute bottom-0 left-0 w-full bg-black/50 py-1.5 z-10 text-center">
                        <span className="text-white text-[9px] font-black uppercase tracking-wider">Reality</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- BEST SELLERS SECTION --- */}
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

                {/* --- MENU PHOTO SECTION --- */}
                <div className="mb-8">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2">📋 Full Menu</h4>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[4/3] relative group">
                    <img 
                      src={selectedStall.menuImage} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300" 
                      alt="Full Menu" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">Tap to enlarge menu</p>
                    </div>
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