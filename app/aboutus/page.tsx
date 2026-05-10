"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#ffffff]/10 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#2003d4] backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/1.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">

          <Link href="/map" className="bg-[#ffe500] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffffff] transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-[#ffffff] text-[#2003d4] px-5 py-2 rounded-full font-bold hover:bg-[#ffe500] transition text-sm" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="min-h-[calc(100vh-72px)] w-full bg-[#3b27ba] flex items-center justify-center p-6 md:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Image with Rounded Corners */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[40px] shadow-2xl">
            <Image
              src="/aboutus.png" 
              alt="Students eating burgers and fries"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="text-white space-y-4 px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              About Us
            </h1>
            <p className="text-lg md:text-xl leading-relaxed font-light opacity-90 max-w-md">
              Campus Bites was created by five DECSC 25 students with the aim of 
              addressing the lack of accessible and reliable food information on 
              campus through a centralized and student-driven platform.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}