"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#2003d4] py-5 px-8 flex flex-col items-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <Link href="wheretodine" className="group transition-transform duration-300 active:scale-95">
            <img
              src="/images/assets/2.png"
              alt="Campus Bites Hero"
              className="h-64 md:h-100 lg:h-60 w-auto object-contain animate-in fade-in zoom-in duration-700 group-hover:scale-105 transition-transform"
            />
          </Link>
          <div className="h-4"></div>
        </div>
      </section>

      {/* --- WHITE NAV BAR --- */}
      <nav className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-center gap-12 md:gap-24">
          {["HOME", "ABOUT US", "WHERE TO DINE", "FOOD MAP", "BITE DEALS"].map((item) => (
            <Link
              key={item}
              href={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/ /g, "")}`}
              className="text-xs font-black text-black hover:text-[#2003d4] transition-colors tracking-tighter"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

{/* --- MAIN CONTENT AREA --- */}
      <main
        className="flex-grow relative flex flex-col"
        style={{
          backgroundImage: "url('/images/assets/HomeBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

        {/* Flex Container - Reduced pt-16 to pt-6 to lessen the gap shown in image_d28ad8.png */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-6 pb-4 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
          
          {/* Special Shoutouts (Floating Card) */}
          <Link href="/reviews" className="w-full max-w-sm block">
            <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 shadow-2xl border border-white/20 animate-in slide-in-from-left duration-700 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(32,3,212,0.3)] transition-all cursor-pointer">
              <h3 className="text-black font-black text-center text-xl leading-tight mb-8 uppercase tracking-tighter">
                Special Shoutouts<br/>of the Week!
              </h3>
              
              <div className="space-y-5">
                {[
                  { img: "/images/assets/rev1.png", text: "Great food and so affordable too!", user: "Anonymous, ISO" },
                  { img: "/images/assets/rev2.png", text: "The food is so good! Will miss it next year :(", user: "Anonymous, Yatako" },
                  { img: "/images/assets/rev3.png", text: "My favorite salad stall in ateneo!", user: "Anonymous, Simply" }
                ].map((review, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-gray-100 hover:bg-white transition-colors">
                    <img src={review.img} className="w-14 h-14 rounded-full border-2 border-[#2003d4] object-cover shrink-0" />
                    <div>
                      <div className="flex text-[#ffe500] text-xs mb-1">★★★★★</div>
                      <p className="text-[10px] italic font-medium text-gray-700 leading-tight">"{review.text}"</p>
                      <p className="text-[9px] font-bold text-[#2003d4] mt-2 text-right">-{review.user}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-[#2003d4] text-[9px] font-black tracking-widest uppercase animate-bounce">
                  View All Reviews →
                </p>
              </div>
            </div>
          </Link>

          {/* Download App (Floating Card) */}
          <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 shadow-2xl border border-white/20 w-full max-w-sm animate-in slide-in-from-bottom lg:slide-in-from-right duration-700 delay-100 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(32,3,212,0.3)] transition-all cursor-default">
            <h3 className="text-black font-black text-center text-xl leading-tight mb-8 uppercase tracking-tighter">
              Download Our App!
            </h3>
            <p className="text-[12px] text-gray-600 text-center mb-6 font-medium">
              Scan the QR code to take <br/> Campus Bites on the go!
            </p>
            <div className="flex justify-center p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <img 
                src="/images/assets/qr-code.png" 
                alt="QR Code" 
                className="w-40 h-40 object-contain hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="mt-8 flex justify-center">
                <span className="bg-[#2003d4] text-white text-[10px] px-6 py-2 rounded-full font-black tracking-widest animate-pulse">
                    AVAILABLE NOW
                </span>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <footer className="text-center py-4 text-white text-[10px] font-bold tracking-widest relative z-10">
          © 2026 CAMPUS BITES
        </footer>
      </main>
     </div>
  );
}