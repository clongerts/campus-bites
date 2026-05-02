"use client";
import { useState } from "react";
import Link from "next/link";

export default function MapPage() {
  // State to track which stall/building is currently selected
  const [selectedStall, setSelectedStall] = useState<{
    name: string;
    info: string;
    category: string;
  } | null>(null);

  // Data for the interactive stalls/buildings
  const stalls = {
    union: {
      name: "Student Union",
      info: "The main food court featuring 5 different stalls including the famous chicken meals.",
      category: "Food Court",
    },
    cafe: {
      name: "Library Cafe",
      info: "Specialty coffee, quick pastries, and reliable Wi-Fi for studying.",
      category: "Cafe",
    },
    jollibee: {
      name: "Jollibee Katipunan",
      info: "Home of the famous Chickenjoy and Jolly Spaghetti near Gate 3.",
      category: "Fast Food",
    },
  };

  // Base Tailwind classes for all interactive SVG groups
  const interactiveGroupClasses = "cursor-pointer transition-transform duration-300 ease-out origin-center hover:scale-110";

  return (
    <main className="bg-white min-h-screen text-gray-900 pt-12">
      {/* --- MAIN CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Massive Interactive Map */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-[#003A70]">Campus Map</h1>
              <p className="text-gray-500 font-medium">Interactive Discovery Tool</p>
            </div>
            <p className="text-sm text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-full">
              {selectedStall ? `Selected: ${selectedStall.name}` : "Select a location"}
            </p>
          </div>

          {/* Map Container */}
          <div className="border-[6px] border-[#003A70] rounded-[2.5rem] bg-[#f1f5f9] p-2 shadow-2xl relative overflow-hidden h-[800px]">
            <svg 
              viewBox="0 0 800 800" 
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Map Base */}
              <rect width="800" height="800" fill="#e2e8f0" rx="30" />
              
              {/* Decorative Paths (Roads) */}
              <path d="M -50,400 Q 400,350 850,500" fill="none" stroke="#cbd5e1" strokeWidth="50" />
              <path d="M 400,-50 L 400,850" fill="none" stroke="#cbd5e1" strokeWidth="30" strokeDasharray="15,15" />

              {/* --- Student Union INTERACTIVE GROUP --- */}
              <g 
                className={interactiveGroupClasses}
                onClick={() => setSelectedStall(stalls.union)}
              >
                <rect
                  x="480" y="350" width="180" height="120" rx="15"
                  fill={selectedStall?.name === stalls.union.name ? "#FFD700" : "#003A70"}
                  className="shadow-lg transition-colors duration-300"
                />
                <text 
                  x="570" y="415" 
                  textAnchor="middle" 
                  fill={selectedStall?.name === stalls.union.name ? "#003A70" : "white"} 
                  fontSize="16" fontWeight="bold" 
                  className="pointer-events-none select-none transition-colors duration-300"
                >
                  Student Union
                </text>
              </g>

              {/* --- Library Cafe INTERACTIVE GROUP --- */}
              <g 
                className={interactiveGroupClasses}
                onClick={() => setSelectedStall(stalls.cafe)}
              >
                <circle
                  cx="320" cy="220" r="60"
                  fill={selectedStall?.name === stalls.cafe.name ? "#FFD700" : "#003A70"}
                  className="transition-colors duration-300"
                />
                <text 
                  x="320" y="225" 
                  textAnchor="middle" 
                  fill={selectedStall?.name === stalls.cafe.name ? "#003A70" : "white"} 
                  fontSize="14" fontWeight="bold" 
                  className="pointer-events-none select-none transition-colors duration-300"
                >
                  Library Cafe
                </text>
              </g>

              {/* --- Jollibee INTERACTIVE GROUP --- */}
              <g 
                className={interactiveGroupClasses}
                onClick={() => setSelectedStall(stalls.jollibee)}
              >
                <circle
                  cx="180" cy="620" r="55"
                  fill={selectedStall?.name === stalls.jollibee.name ? "#FFD700" : "#003A70"}
                  className="transition-colors duration-300"
                />
                <text 
                  x="180" y="625" 
                  textAnchor="middle" 
                  fill={selectedStall?.name === stalls.jollibee.name ? "#003A70" : "white"} 
                  fontSize="14" fontWeight="bold" 
                  className="pointer-events-none select-none transition-colors duration-300"
                >
                  Jollibee
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Information Sidebar */}
        <div className="lg:col-span-1">
          <div className={`sticky top-8 p-8 border-2 rounded-[2rem] transition-all duration-500 shadow-2xl h-fit ${
            selectedStall 
              ? "border-[#FFD700] bg-[#fffef2]" 
              : "border-gray-200 bg-white"
          }`}>
            
            {selectedStall ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#003A70] bg-[#e6efff] px-4 py-1.5 rounded-full">
                  {selectedStall.category}
                </span>
                <h3 className="text-4xl font-black text-[#003A70] mt-6 mb-4 leading-none">
                  {selectedStall.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {selectedStall.info}
                </p>
                <button 
                  onClick={() => setSelectedStall(null)}
                  className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  ✕ Close Details
                </button>
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="text-5xl mb-6 opacity-20">📍</div>
                <p className="text-gray-400 text-lg font-medium leading-tight">
                  Select a location on the map to see more information.
                </p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col gap-4">
              <Link 
                href="/stalls" 
                className="w-full text-center py-5 bg-[#003A70] text-white rounded-2xl font-bold hover:bg-blue-900 hover:-translate-y-1 transition-all text-lg shadow-lg"
                style={{ textDecoration: "none" }}
              >
                Browse All Stalls
              </Link>

              <Link 
                href="/" 
                className="text-gray-500 text-center font-bold hover:text-[#003A70] transition-colors py-2"
                style={{ textDecoration: "none" }}
              >
                ← Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}