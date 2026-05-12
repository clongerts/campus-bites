"use client";

import Link from "next/link";

export default function ReviewsPage() {
  const reviews = [
    { img: "/images/assets/rev1.png", text: "Great food and so affordable too!", user: "Anonymous", stall: "ISO", date: "2 days ago" },
    { img: "/images/assets/rev2.png", text: "The food is so good! Will miss it next year :(", user: "Anonymous", stall: "Yatako", date: "3 days ago" },
    { img: "/images/assets/rev3.png", text: "My favorite salad stall in ateneo!", user: "Anonymous", stall: "Simply", date: "1 week ago" },
    { img: "/images/assets/rev1.png", text: "Best coffee to get through finals week.", user: "Student A", stall: "Brewed", date: "Jan 12, 2026" },
    { img: "/images/assets/rev2.png", text: "The portion sizes here are massive!", user: "Hungry Eagle", stall: "Grill City", date: "Jan 10, 2026" },
    { img: "/images/assets/rev3.png", text: "Healthy and fresh options every day.", user: "Wellness Fan", stall: "Green Bowl", date: "Jan 08, 2026" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* --- BLUE TOP NAV --- */}
      <section className="bg-[#2003d4] py-4 px-8 flex justify-between items-center">
        <Link href="/">
          <img src="/images/assets/2.png" alt="Logo" className="h-12 w-auto object-contain" />
        </Link>
        <h1 className="text-white font-black text-xl tracking-tighter uppercase">Community Shoutouts</h1>
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

      {/* --- REVIEWS GRID AREA --- */}
      <main
        className="flex-grow relative py-16 px-8"
        style={{
          backgroundImage: "url('/images/assets/HomeBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-white font-black text-5xl italic tracking-tighter uppercase drop-shadow-lg">
              What's the Verdict?
            </h2>
            <p className="text-white/80 font-bold mt-2 tracking-widest text-sm">REAL REVIEWS FROM REAL STUDENTS</p>
          </header>

          {/* Grid of Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div 
                key={i} 
                className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white/20 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={review.img} 
                    className="w-16 h-16 rounded-full border-4 border-[#2003d4] object-cover" 
                    alt="user"
                  />
                  <div>
                    <p className="font-black text-[#2003d4] text-sm uppercase">{review.user}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Dining at: {review.stall}</p>
                  </div>
                </div>
                
                <div className="flex text-[#ffe500] text-sm mb-3">★★★★★</div>
                
                <p className="text-gray-800 italic font-medium leading-relaxed mb-4">
                  "{review.text}"
                </p>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{review.date}</span>
                  <button className="text-[#2003d4] text-[10px] font-black hover:underline">HELPFUL? (12)</button>
                </div>
              </div>
            ))}
          </div>

          {/* --- SUBMIT A REVIEW CTA --- */}
          <div className="mt-20 bg-[#ffe500] p-12 rounded-[3rem] shadow-2xl flex flex-col items-center text-center">
            <h3 className="text-black font-black text-3xl uppercase tracking-tighter mb-4">
              Had a Great Meal?
            </h3>
            <p className="text-black/70 font-bold max-w-md mb-8">
              Share your campus bites with the community and get featured on our "Shoutouts of the Week"!
            </p>
            <button className="bg-black text-white px-10 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg">
              WRITE A REVIEW
            </button>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-400 tracking-[0.3em]">
          © 2026 CAMPUS BITES | MADE FOR THE HUNGRY
        </p>
      </footer>
    </div>
  );
}