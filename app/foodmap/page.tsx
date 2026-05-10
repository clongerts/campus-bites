"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { useSearchParams } from 'next/navigation';

const CAMPUS_LOCATIONS = {
  regis: {
    id: "Regis",
    name: "Regis Center",
    info: "The ultimate 'off-campus' sanctuary. From post-class Popeyes fixes to focused study sessions in milk tea shops, it's the bridge between campus life and Katipunan’s bustling food scene.",
    category: "Commercial / Off-Campus",
    top: "20%", left: "26%",
  },
  gonzaga: {
    id: "Gonzaga",
    name: "Gonzaga Hall",
    info: "The heart of student life. Home to the university bookstore and central cafeteria, it’s the hub for 'blue book' emergencies and classic budget-friendly campus meals.",
    category: "Academic / Dining",
    top: "38%", left: "61%",
  },
  jsec: {
    id: "JSEC",
    name: "JSEC",
    info: "A dynamic open-air food laboratory. Every year, student entrepreneurs launch fresh concepts here, making it the go-to spot for unique, rotating flavors.",
    category: "Dining / Business",
    top: "48%", left: "45%",
  },
  admu: {
    id: "ISO",
    name: "ISO",
    info: "The cultural crossroads of campus. With its blend of student orgs, art exhibits, and cozy nooks, it’s where creativity meets community in the most unexpected ways.",
    category: "Academic / Residential",
    top: "10%", left: "63.5%",
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
      <header className="flex-none flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] border border-white/50 shadow-xl">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#003A70] flex items-center gap-2">
            <span className="bg-[#003A70] text-white p-1.5 rounded-xl text-lg">🦅</span> 
            Campus Map
          </h1>
          <p className="text-slate-500 text-[10px] md:text-xs font-medium italic">Pinch to zoom • Drag to pan</p>
        </div>
        <Link href="/" className="px-6 py-2 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all shadow-sm text-center" style={{ textDecoration: 'none' }}>
          Home
        </Link>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-2">
        <div className="lg:col-span-8 relative bg-slate-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white/40 shadow-2xl touch-none h-full">
          <QuickPinchZoom 
            ref={pinchZoomRef} 
            onUpdate={onUpdate} 
            wheelScaleFactor={800} 
            minScale={1}
            maxScale={5}
          >
            <div ref={imgRef} className="relative w-full h-full cursor-grab active:cursor-grabbing will-change-transform flex items-center justify-center">
              <img 
                src="/images/map.png"
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
                    <span className={`absolute -top-10 px-3 py-1 bg-white shadow-xl rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all duration-300 pointer-events-none whitespace-nowrap ${selectedStall?.id === loc.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}>
                      {loc.name}
                    </span>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white shadow-lg flex items-center justify-center transition-colors ${selectedStall?.id === loc.id ? "bg-yellow-400" : "bg-[#003A70]"}`}>
                      <span className="text-sm md:text-lg">📍</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </QuickPinchZoom>

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-2 z-50">
            <button onClick={handleZoomIn} className="w-12 h-12 bg-white/90 border border-slate-200 rounded-xl shadow-xl flex items-center justify-center text-2xl font-bold text-[#003A70] hover:bg-white active:scale-90 transition-all">+</button>
            <button onClick={handleZoomOut} className="w-12 h-12 bg-white/90 border border-slate-200 rounded-xl shadow-xl flex items-center justify-center text-2xl font-bold text-[#003A70] hover:bg-white active:scale-90 transition-all">−</button>
          </div>
        </div>

        <div className="lg:col-span-4 h-full min-h-0">
          <aside className={`h-full flex flex-col rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 shadow-2xl overflow-hidden ${selectedStall ? "bg-[#003A70]/95 text-white" : "bg-white/90"}`}>
            {selectedStall ? (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-10">
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-[#003A70] text-[10px] font-black uppercase mb-4 w-fit">{selectedStall.category}</div>
                <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">{selectedStall.name}</h2>
                <p className="text-blue-100/90 text-sm md:text-lg leading-relaxed mb-6">{selectedStall.info}</p>
                
                {/* DYNAMIC FILTER BUTTON*/}
                <Link 
                  href={`/stalls?filter=${encodeURIComponent(selectedStall.id)}`}
                  className="w-full py-4 bg-yellow-400 text-[#003A70] rounded-2xl font-black text-center mb-4 hover:bg-white transition-all shadow-lg no-underline"
                >
                  GO TO STALL
                </Link>

                <button onClick={() => setSelectedStall(null)} className="text-[10px] font-black text-yellow-400 hover:text-white transition-colors uppercase tracking-[0.2em] mt-auto">✕ Close Details</button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="text-5xl mb-4 drop-shadow-lg opacity-80">🧭</div>
                <h3 className="text-xl font-black text-[#003A70] mb-2">Explore Ateneo</h3>
                <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8">Tap a marker on the map to discover what's inside.</p>
                <Link href="/stalls" className="block w-full py-4 bg-[#003A70] text-white rounded-2xl font-black text-base hover:bg-[#002a50] transition-all shadow-lg" style={{ textDecoration: 'none' }}>Browse All Stalls</Link>
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
      <div className="fixed inset-0 z-0 bg-[url('/images/ADMU_1.jpg')] bg-cover bg-center bg-fixed" />
      <div className="fixed inset-0 z-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none" />
      
      <Suspense fallback={<div className="text-white">Loading Map...</div>}>
        <MapInner />
      </Suspense>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .high-res-render { image-rendering: -webkit-optimize-contrast; backface-visibility: hidden; }
      `}</style>
    </main>
  );
}