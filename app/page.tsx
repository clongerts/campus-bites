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
              src="/images/2.png"
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
        className="flex-grow relative"
        style={{
          backgroundImage: "url('/images/HomeBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 flex justify-center lg:justify-start">
          {/* Special Shoutouts (Floating Card) */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white/20 w-full max-w-sm animate-in slide-in-from-left duration-500">
            <h3 className="text-black font-black text-center text-xl leading-tight mb-8 uppercase">
              Special Shoutouts<br/>of the Week!
            </h3>
            
            <div className="space-y-6">
              {[
                { img: "/images/rev1.png", text: "Great food and so affordable too!", user: "Anonymous, ISO" },
                { img: "/images/rev2.png", text: "The food is so good! Will miss it next year :(", user: "Anonymous, Yatako" },
                { img: "/images/rev3.png", text: "My favorite salad stall in ateneo!", user: "Anonymous, Simply" }
              ].map((review, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <img src={review.img} className="w-14 h-14 rounded-full border-2 border-[#2003d4] object-cover shrink-0" />
                  <div>
                    <div className="flex text-[#ffe500] text-xs mb-1">★★★★★</div>
                    <p className="text-[10px] italic font-medium text-gray-700 leading-tight">"{review.text}"</p>
                    <p className="text-[9px] font-bold text-[#2003d4] mt-2 text-right">-{review.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <footer className="text-center py-0 text-white text-[10px] font-bold tracking-widest relative z-10">
          © 2026 Campus Bites
        </footer>
      </main>
    </div>
  );
}