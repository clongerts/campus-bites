"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { useSearchParams } from 'next/navigation';

export default function MapPage() {
  const [selectedStall, setSelectedStall] = useState<{
    name: string;
    info: string;
    category: string;
  } | null>(null);

  const imgRef = useRef<HTMLDivElement>(null);

  const stalls = {
    regis: {
      name: "Regis Center",
      info: "The ultimate 'off-campus' sanctuary. Whether you're grabbing a post-class Popeyes fix, studying in a milk tea shop, or getting school supplies, it's the bridge between campus life and Katipunan’s bustling food scene.",
      category: "Commercial / Off-Campus",
      top: "22%", left: "24%", 
    },
    gonzaga: {
      name: "Gonzaga Hall",
      info: "The heart of student life. Home to the university bookstore and the central cafeteria, it’s where you'll find everything from 'blue book' emergencies to classic budget-friendly meals and essential student services.",
      category: "Academic / Dining",
      top: "47%", left: "58.5%", 
    },
    jsec: {
      name: "JSEC",
      info: "A dynamic open-air food laboratory. Every year, student entrepreneurs launch fresh concepts here, making it the go-to spot for unique, rotating flavors and witnessing the university’s business spirit in action.",
      category: "Dining / Business",
      top: "64%", left: "44%", 
    },
  };

  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location');

  useEffect(() => {
    if (locationParam) {
      if (locationParam.includes('JSEC')) {
        setSelectedStall(stalls.jsec);
      } else if (locationParam.includes('Gonzaga')) {
        setSelectedStall(stalls.gonzaga);
      } else if (locationParam.includes('Regis')) {
        setSelectedStall(stalls.regis);
      }
    }
  }, [locationParam]);

  const onUpdate = useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty("transform", value);
      imgRef.current.style.setProperty("-webkit-transform", value);
    }
  }, []);

  return (
    <main className="relative min-h-screen text-gray-900 pt-4 md:pt-8 px-4 overflow-x-hidden">
      {/* --- FIXED BACKGROUND IMAGE --- */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/ADMU_1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark/Blur Overlay to ensure contrast */}
      <div className="fixed inset-0 z-0 bg-slate-900/20 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8">
        
        {/* Header */}
        <div className="lg:col-span-4 flex justify-between items-center bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#003A70]">Campus Map</h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium italic">Pinch/Scroll to zoom • Drag to pan</p>
          </div>
          {selectedStall && (
            <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-full hidden md:block animate-in fade-in zoom-in-95">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">
                Viewing: {selectedStall.name}
              </p>
            </div>
          )}
        </div>

        {/* --- MAP SECTION --- */}
        <div className="lg:col-span-3 relative h-[450px] lg:h-[750px] bg-slate-300 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl touch-none">
          <QuickPinchZoom 
            onUpdate={onUpdate} 
            wheelScaleFactor={500} 
            tapZoomFactor={1.5}
            minScale={1}
            maxScale={5}
          >
            <div ref={imgRef} className="relative w-full h-full will-change-transform">
              <img 
                src="/images/map.png"
                alt="ADMU Campus Map"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Interactive Pins */}
              {Object.entries(stalls).map(([key, stall]) => (
                <div
                  key={key}
                  style={{ top: stall.top, left: stall.left }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStall(stall);
                  }}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 md:border-4 border-white shadow-xl transition-all duration-300 ${
                    selectedStall?.name === stall.name ? "bg-yellow-400 scale-125" : "bg-[#003A70] hover:scale-110"
                  }`}>
                    <span className="text-white text-xs md:text-sm">📍</span>
                  </div>
                  
                  {/* Tooltip (Desktop only) */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#003A70] px-3 py-1 rounded-lg text-xs font-black shadow-lg opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {stall.name}
                  </div>
                </div>
              ))}
            </div>
          </QuickPinchZoom>

          {/* Zoom Instruction Overlay */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-xl shadow-lg border border-slate-200 pointer-events-none z-40">
            <p className="text-[8px] md:text-[10px] font-black text-[#003A70] uppercase tracking-tighter">
              Scroll or Pinch to Explore
            </p>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="lg:col-span-1">
          <div className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 shadow-xl min-h-[400px] lg:min-h-[500px] flex flex-col justify-between h-full ${
            selectedStall ? "bg-[#003A70]/95 backdrop-blur-md text-white" : "bg-white/90 backdrop-blur-md border border-slate-200"
          }`}>
            
            <div className="flex-1">
              {selectedStall ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60">
                    {selectedStall.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black mt-2 md:mt-4 mb-4 md:mb-6 leading-tight">
                    {selectedStall.name}
                  </h3>
                  <p className={`${selectedStall ? 'text-blue-100' : 'text-gray-600'} text-base md:text-lg leading-relaxed mb-6 md:mb-8`}>
                    {selectedStall.info}
                  </p>
                  <button 
                    onClick={() => setSelectedStall(null)}
                    className="text-xs font-bold text-yellow-400 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    ✕ Close Details
                  </button>
                </div>
              ) : (
                <div className="py-10 md:py-20 text-center">
                  <div className="text-4xl md:text-5xl mb-4 md:mb-6 opacity-20">🧭</div>
                  <p className="text-slate-400 text-base md:text-lg font-bold px-4">
                    Tap a pin on the map to see details
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 md:space-y-4 pt-6 md:pt-8 border-t border-white/10 mt-auto">
              {selectedStall && (
                <Link 
                  href={`/stalls?filter=${selectedStall.name === "Regis Center" ? "Regis" : selectedStall.name === "Gonzaga Hall" ? "Gonzaga" : "JSEC"}`}
                  className={`block w-full text-center py-4 md:py-5 rounded-2xl font-extrabold text-base md:text-lg transition-all shadow-lg ${
                    selectedStall ? "bg-yellow-400 text-[#003A70] hover:bg-yellow-300" : "bg-[#003A70] text-white hover:bg-[#002a50]"
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  View Stalls
                </Link>
              )}
              <Link 
                href="/stalls" 
                className={`block w-full text-center py-4 md:py-5 rounded-2xl font-extrabold text-base md:text-lg transition-all shadow-lg ${
                  selectedStall ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#003A70] text-white hover:bg-[#002a50]"
                }`}
                style={{ textDecoration: 'none' }}
              >
                Browse All Stalls
              </Link>
              <Link href="/" className={`block text-center text-xs md:text-sm font-bold transition-opacity py-2 ${selectedStall ? 'text-blue-200 hover:text-white' : 'text-slate-400 hover:text-[#003A70]'}`} style={{ textDecoration: 'none' }}>
                ← Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}