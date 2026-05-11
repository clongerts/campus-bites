"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { useSearchParams } from 'next/navigation';

// --- DATA CONFIG (Matched to your Filter Words) ---
const CAMPUS_LOCATIONS = {
  regis: {
    id: "Regis 1/F", // Exact match for your filters
    name: "Regis Center",
    info: "The ultimate 'off-campus' sanctuary. From post-class Popeyes fixes to focused study sessions in milk tea shops, it's the bridge between campus life and Katipunan’s bustling food scene.",
    category: "Commercial / Off-Campus",
    top: "20%", left: "26%",
    images: ["/images/assets/regis-1.jpg", "/images/assets/regis-2.jpg"] // Placeholder paths
  },
  gonzaga: {
    id: "Gonzaga 1/F", // Exact match for your filters
    name: "Gonzaga Hall",
    info: "The heart of student life. Home to the university bookstore and central cafeteria, it’s the hub for 'blue book' emergencies and classic budget-friendly campus meals.",
    category: "Academic / Dining",
    top: "38%", left: "61%",
    images: ["/images/assets/gonzaga-1.jpg", "/images/assets/gonzaga-2.jpg"]
  },
  jsec: {
    id: "JSEC",
    name: "JSEC",
    info: "A dynamic open-air food laboratory. Every year, student entrepreneurs launch fresh concepts here, making it the go-to spot for unique, rotating flavors.",
    category: "Dining / Business",
    top: "48%", left: "45%",
    images: ["/images/assets/jsec-1.jpg"]
  },
  iso: {
    id: "ISO",
    name: "ISO",
    info: "The cultural crossroads of campus. With its blend of student orgs, art exhibits, and cozy nooks, it’s where creativity meets community in the most unexpected ways.",
    category: "Academic / Residential",
    top: "10%", left: "63.5%",
    images: ["/images/assets/iso-1.jpg"]
  }
};

function MapInner() {
  const [selectedStall, setSelectedStall] = useState<typeof CAMPUS_LOCATIONS.regis | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const pinchZoomRef = useRef<any>(null); 
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location');

  useEffect(() => {
    if (!locationParam) return;
    const found = Object.values(CAMPUS_LOCATIONS).find(loc => 
      locationParam.toLowerCase().includes(loc.id.toLowerCase())
    );
    if (found) setSelectedStall(found);
  }, [locationParam]);

  const onUpdate = useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty("transform", value);
      imgRef.current.style.setProperty("-webkit-transform", value);
    }
  }, []);

  const handleZoomIn = () => {
    if (pinchZoomRef.current) {
      pinchZoomRef.current.scaleTo({
        scale: pinchZoomRef.current.scale * 1.5,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
  };

  const handleZoomOut = () => {
    if (pinchZoomRef.current) {
      pinchZoomRef.current.scaleTo({
        scale: pinchZoomRef.current.scale / 1.5,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
  };

  return (
    <div className="relative z-10 max-w-[1700px] mx-auto h-full flex flex-col gap-4 md:gap-6">
      {/* Header with Theme Colors */}
      <header className="flex-none flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/50 shadow-xl">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#2003d4] flex items-center gap-2">
            <span className="bg-[#2003d4] text-[#ffe500] p-1.5 rounded-xl text-lg">🦅</span> 
            Campus Map
          </h1>
          <p className="text-slate-500 text-[10px] md:text-xs font-medium italic">Pinch to zoom • Drag to pan</p>
        </div>
        <Link href="/" className="px-6 py-2 rounded-full bg-slate-200/50 hover:bg-[#ffe500] hover:text-[#2003d4] text-[#2003d4] font-bold text-sm transition-all shadow-sm text-center" style={{ textDecoration: 'none' }}>
          Home
        </Link>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-2">
        <div className="lg:col-span-7 xl:col-span-8 relative bg-slate-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white/40 shadow-2xl touch-none h-full">
          <QuickPinchZoom 
            ref={pinchZoomRef} 
            onUpdate={onUpdate} 
            wheelScaleFactor={800} 
            minScale={1}
            maxScale={5}
          >
            <div ref={imgRef} className="relative w-full h-full cursor-grab active:cursor-grabbing will-change-transform flex items-center justify-center">
              <img 
                src="/images/assets/map.png"
                alt="Campus Map"
                className="w-full h-full object-contain high-res-render"
              />

              {Object.entries(CAMPUS_LOCATIONS).map(([key, loc]) => (
                <div
                  key={key}
                  style={{ top: loc.top, left: loc.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStall(loc);
                    }}
                    className={`relative group transition-all duration-500 flex flex-col items-center ${selectedStall?.id === loc.id ? "scale-125" : "hover:scale-110"}`}
                  >
                    <span className={`absolute -top-10 px-3 py-1 bg-white shadow-xl rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all duration-300 pointer-events-none whitespace-nowrap text-[#2003d4] ${selectedStall?.id === loc.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}>
                      {loc.name}
                    </span>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white shadow-lg flex items-center justify-center transition-colors ${selectedStall?.id === loc.id ? "bg-[#ffe500]" : "bg-[#2003d4]"}`}>
                      <span className="text-sm md:text-lg">📍</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </QuickPinchZoom>

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-2 z-50">
            <button onClick={handleZoomIn} className="w-12 h-12 bg-white/90 border border-slate-200 rounded-xl shadow-xl flex items-center justify-center text-2xl font-bold text-[#2003d4] hover:bg-[#ffe500] active:scale-90 transition-all">+</button>
            <button onClick={handleZoomOut} className="w-12 h-12 bg-white/90 border border-slate-200 rounded-xl shadow-xl flex items-center justify-center text-2xl font-bold text-[#2003d4] hover:bg-[#ffe500] active:scale-90 transition-all">−</button>
          </div>
        </div>

        {/* Info Panel with Added Images */}
        <div className="lg:col-span-5 xl:col-span-4 h-full min-h-0">
          <aside className={`h-full flex flex-col rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 shadow-2xl overflow-hidden ${selectedStall ? "bg-[#2003d4] text-white" : "bg-white/90"}`}>
            {selectedStall ? (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ffe500] text-[#2003d4] text-[10px] font-black uppercase mb-4 w-fit">{selectedStall.category}</div>
                  <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight leading-none">{selectedStall.name}</h2>
                  <p className="text-blue-100/90 text-sm md:text-base leading-relaxed mb-6">{selectedStall.info}</p>
                  
                  {/* Location Images Section */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {selectedStall.images.map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden bg-white/10 border border-white/20">
                        <img src={img} alt={`${selectedStall.name} view ${i+1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/stalls?filter=${encodeURIComponent(selectedStall.id)}`}
                    className="block w-full py-4 bg-[#ffe500] text-[#2003d4] rounded-2xl font-black text-center mb-4 hover:scale-[1.02] active:scale-95 transition-all shadow-lg no-underline"
                  >
                    VIEW DINING SPOTS AT {selectedStall.name.toUpperCase()}
                  </Link>

                  <button onClick={() => setSelectedStall(null)} className="w-full text-[10px] font-black text-[#ffe500] hover:text-white transition-colors uppercase tracking-[0.2em] py-2">
                    ✕ Close Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="text-5xl mb-4 drop-shadow-lg opacity-80">🧭</div>
                <h3 className="text-xl font-black text-[#2003d4] mb-2">Explore Ateneo</h3>
                <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8">Tap a marker on the map to discover what's inside.</p>
                <Link href="/stalls" className="block w-full py-4 bg-[#2003d4] text-white rounded-2xl font-black text-base hover:bg-[#1a02b0] transition-all shadow-lg" style={{ textDecoration: 'none' }}>Browse All Stalls</Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <main className="relative h-screen w-full text-slate-900 font-sans overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="fixed inset-0 z-0 bg-[url('/images/assets/ADMU_1.jpg')] bg-cover bg-center bg-fixed" />
      <div className="fixed inset-0 z-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none" />
      
      <Suspense fallback={<div className="text-white">Loading Map...</div>}>
        <MapInner />
      </Suspense>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,229,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,229,0,0.6); }
        .high-res-render { image-rendering: -webkit-optimize-contrast; backface-visibility: hidden; }
      `}</style>
    </main>
  );
}