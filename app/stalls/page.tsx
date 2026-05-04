"use client";

import React, { useState } from 'react';
import Link from "next/link";

interface Menu {
  name: string;
  price: number;
}

interface Review {
  id: string;
  user: string;
  rating: number; 
  comment: string;
  isAnonymous: boolean;
  realityPhoto?: string; 
  date: string;
}

interface Stall {
  id: number;
  name: string;
  loc: string;
  rating: number; 
  price: string;
  hours: string;
  tags: string[];
  image: string;
  menu: Menu[];
  reviews: Review[];
  portionSize: "Small" | "Regular" | "Large";
  isBestValue: boolean;
}

export default function StallsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState("All");
  const [budgetLimit, setBudgetLimit] = useState<string | null>(null);
  const [quickDecideResult, setQuickDecideResult] = useState<Stall[] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const stalls: Stall[] = [
    // --- JSEC STALLS ---
    { id: 1, name: "Yatako", loc: "JSEC", rating: 98, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/yatako.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Tapa Bowl", price: 180 }, { name: "Chicken Teriyaki", price: 175 }, { name: "Salmon Aburi Bowl", price: 210 }, { name: "Extra Egg", price: 25 }], reviews: [{ id: "r1", user: "Anonymous Eagle", rating: 5, comment: "Actually looks like the photo! Beef is tender.", isAnonymous: true, date: "2026-04-12", realityPhoto: "/images/reality/yatako-tapa.jpg" }] },
    { id: 2, name: "The Breakfast Club", loc: "JSEC", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Breakfast"], image: "/images/breakfast-club.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fluffy Pancakes", price: 150 }, { name: "Breakfast Burrito", price: 185 }, { name: "French Toast", price: 160 }, { name: "Cold Brew", price: 120 }], reviews: [] },
    { id: 3, name: "ONDO", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/ondo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Beef Bulgogi Bowl", price: 190 }, { name: "Spicy Pork Rice", price: 180 }, { name: "Kimchi Fried Rice", price: 165 }, { name: "Fish Cake", price: 45 }], reviews: [] },
    { id: 4, name: "Suan Rak", loc: "JSEC", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Thai"], image: "/images/suan-rak.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pad Thai", price: 175 }, { name: "Green Curry Rice", price: 185 }, { name: "Thai Milk Tea", price: 90 }, { name: "Mango Sticky Rice", price: 120 }], reviews: [] },
    { id: 5, name: "The Middle Feast", loc: "JSEC", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Middle Eastern"], image: "/images/middle-feast.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shawarma Rice", price: 165 }, { name: "Falafel Wrap", price: 150 }, { name: "Hummus w/ Pita", price: 120 }, { name: "Kefta Skewer", price: 145 }], reviews: [] },
    { id: 6, name: "Tampai", loc: "JSEC", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/tampai.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fusion Rice Bowl", price: 170 }, { name: "Tampai Wings (4pcs)", price: 180 }, { name: "Truffle Fries", price: 110 }], reviews: [] },
    { id: 7, name: "Lucky Kat", loc: "JSEC", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Japanese"], image: "/images/lucky-kat.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Chicken Katsu", price: 185 }, { name: "Gyudon Bowl", price: 195 }, { name: "Katsu Sando", price: 160 }, { name: "Miso Soup", price: 40 }], reviews: [] },
    { id: 8, name: "Mongch", loc: "JSEC", rating: 87, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/mongch.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Signature Rice Meal", price: 160 }, { name: "Crispy Pork Chop", price: 155 }, { name: "Sweet Glazed Chicken", price: 160 }], reviews: [] },
    { id: 9, name: "Baoba", loc: "JSEC", rating: 94, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Drinks"], image: "/images/baoba.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Classic Milk Tea", price: 120 }, { name: "Wintermelon Tea", price: 110 }, { name: "Brown Sugar Latte", price: 140 }, { name: "Cream Cheese Top", price: 30 }], reviews: [] },
    { id: 10, name: "Hikori", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/hikori.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hibachi Grill Chicken", price: 195 }, { name: "Yakitori Skewer Set", price: 180 }, { name: "Grilled Corn", price: 75 }], reviews: [] },
    { id: 11, name: "Eagle Eatery", loc: "JSEC", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Budget"], image: "/images/eagle-eatery.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Student Meal A (Pork)", price: 99 }, { name: "Student Meal B (Chicken)", price: 99 }, { name: "Siomai Rice", price: 75 }, { name: "Extra Rice", price: 20 }], reviews: [] },
    { id: 12, name: "Wagwan", loc: "JSEC", rating: 86, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/wagwan.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Caribbean Rice Bowl", price: 180 }, { name: "Jerk Chicken Skewers", price: 190 }, { name: "Plantain Chips", price: 65 }], reviews: [] },
    { id: 13, name: "Kahlo", loc: "JSEC", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Mexican"], image: "/images/kahlo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Soft Tacos (2pcs)", price: 150 }, { name: "Cheese Quesadilla", price: 170 }, { name: "Loaded Nachos", price: 130 }, { name: "Horchata", price: 95 }], reviews: [] },
    { id: 14, name: "Aja!", loc: "JSEC", rating: 93, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Korean"], image: "/images/aja.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Classic Bibimbap", price: 170 }, { name: "Fried Mandu (5pcs)", price: 120 }, { name: "Japchae", price: 140 }], reviews: [] },
    { id: 15, name: "Lami", loc: "JSEC", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Filipino"], image: "/images/lami.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Bisaya Pork Humba", price: 175 }, { name: "Chicken Inasal Bowl", price: 165 }, { name: "Lechon Kawali Rice", price: 185 }], reviews: [] },
    { id: 16, name: "Nom Noms", loc: "JSEC", rating: 89, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC"], image: "/images/nom-noms.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Mozzarella Corn Dog", price: 95 }, { name: "Chicken Poppers", price: 140 }, { name: "Potato Wedges", price: 80 }], reviews: [] },
    { id: 17, name: "Hoi An", loc: "JSEC", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "JSEC", "Vietnamese"], image: "/images/hoi-an.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Pork Banh Mi", price: 155 }, { name: "Fresh Spring Rolls", price: 120 }, { name: "Beef Pho", price: 190 }], reviews: [] },

    // --- GONZAGA STALLS ---
    { id: 18, name: "1Gonz", loc: "Gonzaga ", rating: 85, price: "₱", hours: "7:00 AM - 6:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Budget"], image: "/images/1gonz.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Economy Rice (2 Viands)", price: 85 }, { name: "Pork Liempo Meal", price: 95 }, { name: "Giniling Rice", price: 75 }, { name: "Fried Egg", price: 15 }], reviews: [] },
    { id: 19, name: "Jamaican Patty", loc: "Gonzaga", rating: 94, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Snacks"], image: "/images/jamaican.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Beef Pinatubo (Spicy)", price: 75 }, { name: "Cheesy Beef", price: 85 }, { name: "Chicken Patty", price: 75 }], reviews: [] },
    { id: 20, name: "Day Off", loc: "Gonzaga", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F"], image: "/images/day-off.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Brewed Coffee", price: 110 }, { name: "Iced Caramel Macchiato", price: 145 }, { name: "Chocolate Croissant", price: 90 }, { name: "Ham & Cheese Savory", price: 110 }], reviews: [] },
    { id: 21, name: "TOMO Coffee", loc: "Gonzaga", rating: 96, price: "₱₱", hours: "7:30 AM - 6:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Drinks"], image: "/images/tomo-gonz.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Iced Latte", price: 140 }, { name: "Spanish Latte", price: 155 }, { name: "Matcha Berry", price: 165 }, { name: "Oat Milk Upgrade", price: 40 }], reviews: [] },
    { id: 22, name: "Get Bowl'd", loc: "Gonzaga", rating: 91, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Healthy"], image: "/images/get-bowld.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Classic Froyo", price: 150 }, { name: "Smoothie Bowl", price: 210 }, { name: "Greek Yogurt Parfait", price: 180 }, { name: "Extra Topping", price: 25 }], reviews: [] },
    { id: 23, name: "Simply", loc: "Gonzaga", rating: 87, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F"], image: "/images/simply.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Healthy Chicken Bowl", price: 120 }, { name: "Tuna Salad", price: 130 }, { name: "Fruit Cup", price: 75 }], reviews: [] },
    { id: 24, name: "Chunky Chicks", loc: "Gonzaga", rating: 92, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F"], image: "/images/chunky-chicks.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "2pc Fried Chicken", price: 160 }, { name: "Chicken Sandwich", price: 175 }, { name: "Chicken Poppers", price: 120 }, { name: "Gravy Rice", price: 30 }], reviews: [] },
    { id: 25, name: "Ghe!", loc: "Gonzaga", rating: 95, price: "₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 1/F", "Budget"], image: "/images/ghe.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Adobo Rice Meal", price: 110 }, { name: "Skinless Longganisa", price: 95 }, { name: "Tocino", price: 105 }], reviews: [] },
    { id: 26, name: "Colonel's Curry", loc: "2Gonz", rating: 90, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Colonel'sCurry.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Japanese Beef Curry", price: 170 }, { name: "Chicken Katsu Curry", price: 160 }, { name: "Curry Pan (Bread)", price: 55 }], reviews: [] },
    { id: 27, name: "Blue Cafe", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/BlueCafe.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 28, name: "Chillers", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Chillers.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 29, name: "Luckys", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Luckys.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 30, name: "Melteese", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Melteese.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 31, name: "Swirlicous", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Swirlicious.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 32, name: "Varda", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/Varda.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },
    { id: 33, name: "Yum Dum Dim", loc: "2Gonz", rating: 88, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Gonzaga 2/F"], image: "/images/YumDumDim.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hot Americano", price: 100 }, { name: "Chocolate Chip Cookie", price: 65 }, { name: "Ham & Cheese Melt", price: 120 }], reviews: [] },


    // --- RESIDENCE HALLS & OTHER ---
    { id: 34, name: "Ebais", loc: "University Residence Halls", rating: 89, price: "₱", hours: "6:00 AM - 8:00 PM", tags: ["Inside Campus", "Budget", "Residence Halls"], image: "/images/ebais.jpg", portionSize: "Large", isBestValue: true, menu: [{ name: "Dorm Student Meal", price: 90 }, { name: "Breakfast Silog Set", price: 85 }, { name: "Nilaga Bowl", price: 110 }], reviews: [] },
    { id: 35, name: "Kitchen City", loc: "International Residence Halls", rating: 86, price: "₱₱", hours: "7:00 AM - 8:00 PM", tags: ["Inside Campus", "Residence Halls"], image: "/images/kitchen-city.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Lunch Buffet", price: 150 }, { name: "A la carte Pasta", price: 130 }, { name: "Fresh Juice", price: 60 }], reviews: [] },
    { id: 36, name: "Iggy's", loc: "School of Theology", rating: 94, price: "₱", hours: "8:00 AM - 4:00 PM", tags: ["Inside Campus", "Budget"], image: "/images/iggys.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Home-cooked Viand", price: 100 }, { name: "Beef Tapa", price: 115 }, { name: "Sinigang", price: 120 }], reviews: [] },
    { id: 37, name: "ISO", loc: "ISO", rating: 85, price: "₱₱", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus"], image: "/images/iso.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "ISO Set Meal", price: 130 }, { name: "Club Sandwich", price: 110 }, { name: "Turon (2pcs)", price: 45 }], reviews: [] },
    { id: 38, name: "Rizal Library", loc: "Rizal Library", rating: 88, price: "₱₱", hours: "8:00 AM - 6:00 PM", tags: ["Inside Campus", "Study Spots"], image: "/images/rizal-lib.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Exam Fuel (Double Shot)", price: 140 }, { name: "Tuna Pesto Sandwich", price: 120 }, { name: "Hot Tea", price: 90 }], reviews: [] },

    // --- REGIS CENTER ---
    { id: 39, name: "Domino's Pizza", loc: "Regis 1/F", rating: 82, price: "₱₱", hours: "10:00 AM - 10:00 PM", tags: ["Regis", "Regis 1/F", "Fast"], image: "/images/dominos.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Regular Pepperoni", price: 299 }, { name: "Creamy Carbonara", price: 199 }, { name: "Cheesy Breadsticks", price: 120 }], reviews: [] },
    { id: 40, name: "The Coffee Bean & Tea Leaf", loc: "Regis 1/F", rating: 91, price: "₱₱", hours: "7:00 AM - 11:00 PM", tags: ["Regis", "Regis 1/F", "Study Spots"], image: "/images/cbtl.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "African Sunrise Iced Tea", price: 185 }, { name: "Vanilla Latte", price: 175 }, { name: "Blueberry Muffin", price: 110 }], reviews: [] },
    { id: 41, name: "Tetsuo", loc: "Regis 2/F", rating: 94, price: "₱₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese", "Date Spot"], image: "/images/tetsuo.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Signature Karaage (S)", price: 210 }, { name: "Cold Soba Noodles", price: 195 }, { name: "Umami Fried Rice", price: 95 }, { name: "Japanese Slaw", price: 60 }], reviews: [] },
    { id: 42, name: "BOK Chicken", loc: "Regis 2/F", rating: 95, price: "₱₱", hours: "10:00 AM - 2:00 AM", tags: ["Regis", "Regis 2/F", "Korean"], image: "/images/bok.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "6pc Double Fried Chicken", price: 195 }, { name: "Snow Cheese Poppers", price: 155 }, { name: "BOK Rice Bowl", price: 175 }], reviews: [] },
    { id: 43, name: "JAAM House of Sushi", loc: "Regis 2/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Japanese"], image: "/images/jaam.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Sushi Platter (Mixed)", price: 250 }, { name: "California Maki", price: 180 }, { name: "Ebi Tempura (3pcs)", price: 195 }], reviews: [] },
    { id: 44, name: "Dim Dum Tom", loc: "Regis 2/F", rating: 87, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Chinese"], image: "/images/dim-dum.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Assorted Dimsum Box", price: 160 }, { name: "Beef Wonton Noodles", price: 185 }, { name: "Soy Chicken Rice", price: 170 }], reviews: [] },
    { id: 45, name: "Coco Milk Tea", loc: "Regis 2/F", rating: 92, price: "₱₱", hours: "11:00 AM - 9:00 PM", tags: ["Regis", "Regis 2/F", "Drinks"], image: "/images/coco.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Panda Milk Tea", price: 130 }, { name: "3 Buddies Milk Tea", price: 145 }, { name: "Lemon Green Tea", price: 110 }], reviews: [] },
    { id: 46, name: "Subway", loc: "Regis 3/F", rating: 88, price: "₱₱", hours: "9:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Healthy"], image: "/images/subway.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "6-inch Roast Beef", price: 230 }, { name: "Footlong Upgrade", price: 160 }, { name: "Chocolate Chip Cookie", price: 50 }], reviews: [] },
    { id: 47, name: "Kim's Ramyun", loc: "Regis 3/F", rating: 90, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Korean"], image: "/images/kims.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Shin Ramyun Bowl", price: 180 }, { name: "Tuna Gimbap", price: 150 }, { name: "Tteokbokki", price: 165 }], reviews: [] },
    { id: 48, name: "Royal Tea", loc: "Regis 3/F", rating: 86, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/royal-tea.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Cheese Cream Matcha", price: 140 }, { name: "Royal Fruit Tea", price: 135 }, { name: "Oreo Cocoa", price: 125 }], reviews: [] },
    { id: 49, name: "Paotsin", loc: "Regis 3/F", rating: 97, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Budget"], image: "/images/paotsin.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Shark's Fin w/ Green Rice", price: 100 }, { name: "Beef Siomai w/ Green Rice", price: 100 }, { name: "Laksa Noodles", price: 120 }, { name: "Fried Dumplings", price: 45 }], reviews: [] },
    { id: 50, name: "Fruitas", loc: "Regis 3/F", rating: 93, price: "₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F", "Drinks"], image: "/images/fruitas.jpg", portionSize: "Small", isBestValue: false, menu: [{ name: "Buko Juice", price: 80 }, { name: "Mango Shake", price: 95 }, { name: "Four Seasons Shake", price: 110 }], reviews: [] },
    { id: 51, name: "Spudbae", loc: "Regis 3/F", rating: 89, price: "₱₱", hours: "10:00 AM - 9:00 PM", tags: ["Regis", "Regis 3/F"], image: "/images/spudbae.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Fully Loaded Baked Potato", price: 150 }, { name: "Sour Cream Fries", price: 90 }, { name: "Cheesy Spuds", price: 110 }], reviews: [] },

    // --- NEAR ATENEO / KATIPUNAN ---
    { id: 52, name: "Busan Korean Restaurant", loc: "Katipunan", rating: 91, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Korean"], image: "/images/busan.jpg", portionSize: "Large", isBestValue: false, menu: [{ name: "Beef Samgyup Set", price: 499 }, { name: "Dolsot Bibimbap", price: 250 }, { name: "Pork Cutlet", price: 280 }], reviews: [] },
    { id: 53, name: "Kanto Freestyle", loc: "Katipunan", rating: 94, price: "₱₱", hours: "24 Hours", tags: ["Near Ateneo", "Katipunan", "Breakfast"], image: "/images/kanto.jpg", portionSize: "Regular", isBestValue: true, menu: [{ name: "Batangas Beef Tapa", price: 160 }, { name: "Honey Garlic Chicken", price: 155 }, { name: "Mixed Berry Pancakes", price: 140 }, { name: "Fried Oreo", price: 90 }], reviews: [] },
    { id: 54, name: "Go Salads!", loc: "Katipunan", rating: 89, price: "₱₱", hours: "10:00 AM - 8:00 PM", tags: ["Near Ateneo", "Katipunan", "Healthy"], image: "/images/go-salads.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Hummus Salad", price: 190 }, { name: "Green Smoothie", price: 150 }, { name: "Chicken Pesto Wrap", price: 175 }], reviews: [] },
    { id: 55, name: "JT's Manukan", loc: "Katipunan", rating: 92, price: "₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Filipino"], image: "/images/jts.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Chicken Inasal Paa", price: 180 }, { name: "Garlic Rice", price: 35 }, { name: "Chicken Skin", price: 95 }, { name: "Batchoy", price: 145 }], reviews: [] },
    { id: 56, name: "Gino's Brick Oven Pizza", loc: "Katipunan", rating: 96, price: "₱₱₱", hours: "11:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Date Spot"], image: "/images/ginos.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "Margherita Pizza", price: 380 }, { name: "Burrata", price: 450 }, { name: "Salted Egg Pasta", price: 320 }, { name: "Lemonade", price: 95 }], reviews: [] },
    { id: 57, name: "Zus Coffee", loc: "Katipunan", rating: 93, price: "₱₱", hours: "7:00 AM - 10:00 PM", tags: ["Near Ateneo", "Katipunan", "Drinks"], image: "/images/zus.jpg", portionSize: "Regular", isBestValue: false, menu: [{ name: "CEO Latte", price: 95 }, { name: "Spanish Latte", price: 110 }, { name: "Buttercrush Frappe", price: 145 }, { name: "Oat Milk Upgrade", price: 35 }], reviews: [] },
  ];

  const locations = ["All", "Inside Campus", "JSEC", "Gonzaga 1/F", "Gonzaga 2/F", "Regis 1/F", "Regis 2/F", "Regis 3/F", "Katipunan", "Near Ateneo", "Residence Halls"];
  const categories = ["Budget", "Study Spots", "Date Spot", "Korean", "Japanese", "Filipino", "Breakfast", "Fast"];

  const filteredStalls = stalls.filter(stall => {
    const matchesFilter = activeFilter === "All" || stall.tags.includes(activeFilter) || stall.loc.includes(activeFilter);
    const matchesPrice = priceFilter === "All" || stall.price === priceFilter;
    const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase());
    // Budget filter logic
    let matchesBudget = true;
    if (budgetLimit) {
      const minPrices = stall.menu.map(item => item.price);
      const minPrice = Math.min(...minPrices);
      if (budgetLimit === 'Under ₱50') matchesBudget = minPrice < 50;
      else if (budgetLimit === '₱50-100') matchesBudget = minPrice >= 50 && minPrice <= 100;
      else if (budgetLimit === '₱100-150') matchesBudget = minPrice >= 100 && minPrice <= 150;
      else if (budgetLimit === '₱150-200') matchesBudget = minPrice >= 150 && minPrice <= 200;
      else if (budgetLimit === '₱200+') matchesBudget = minPrice >= 200;
    }
    return matchesFilter && matchesSearch && matchesPrice && matchesBudget;
  });

  const handleQuickDecide = () => {
    const pool = [...filteredStalls];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    setQuickDecideResult(shuffled.slice(0, 3));
  };

  return (
<div className="min-h-screen flex flex-col text-gray-900" style={{ backgroundImage: "url('/images/ADMU_1.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      {/* --- NAVBAR --- */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-[#001a4d]/90 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img src="/images/logo_campusbites.png" alt="Campus Bites" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Search stalls or food..."
            className="hidden md:block border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20 bg-white/90"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
                    <button onClick={() => setIsSearchModalOpen(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-[#003A70]" title="Advanced Filters">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </button>
          <Link href="/map" className="bg-[#FFD700] text-[#003A70] px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition text-sm shadow" style={{ textDecoration: "none" }}>
            Map
          </Link>
          <Link href="/login" className="bg-white text-[#003A70] px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </nav>

      {/* --- WHITE BACKGROUND WRAPPER --- */}
      <div className="bg-white max-w-7xl mx-auto -mt-20 pt-20 flex-grow w-full">
      {/* --- HEADER --- */}
      <header className="py-12 px-8 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[#003A70]">All Food Stalls</h2>
        <p className="text-gray-600 text-lg mb-8">Browse all the spots across the Hill.</p>
        <button onClick={handleQuickDecide} className="bg-[#FFD700] text-[#003A70] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
            ⚡ Quick Decide
        </button>
      </header>

  {/* --- QUICK DECIDE RESULTS MODAL --- */}
  {quickDecideResult && (
    <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#003A70]">Can't Decide? 🤔</h3>
          <button 
            onClick={() => setQuickDecideResult(null)} 
            className="text-red-500 hover:text-red-700 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {quickDecideResult.map(stall => (
            <div 
              key={stall.id} 
              className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition cursor-pointer flex flex-col h-full" 
              onClick={() => { setSelectedStall(stall); setQuickDecideResult(null); }}
            >
              {/* Image Container with consistent Aspect Ratio */}
              <div className="h-32 bg-gray-100 rounded-xl mb-3 overflow-hidden relative flex items-center justify-center">
                {stall.image ? (
                  <img 
                    src={stall.image} 
                    alt={stall.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { 
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image"; 
                    }} 
                  />
                ) : (
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">No Image</span>
                )}
              </div>
  
              <h4 className="font-bold text-lg leading-tight">{stall.name}</h4>
              <p className="text-gray-500 text-sm">{stall.loc}</p>
              
              {/* Bottom Info Section */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-1">
                  <span className="font-black text-[#003A70]">{stall.rating}%</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">{stall.price}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleQuickDecide} 
          className="w-full mt-6 py-4 bg-[#FFD700] text-[#003A70] rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Re-roll!
        </button>
      </div>
    </div>
  )}

      {/* --- ADVANCED FILTER MODAL --- */}
      {isSearchModalOpen && (
          <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-[#003A70]">Advanced Filters</h3>
                      <button onClick={() => setIsSearchModalOpen(false)} className="text-red-500 hover:text-red-700 text-3xl font-bold">&times;</button>
                  </div>
                  {/* Budget Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Budget</h4>
                      <div className="flex flex-wrap gap-2">
                          {['Under ₱50', '₱50-100', '₱100-150', '₱150-200', '₱200+'].map(budget => (
                              <button 
                                  key={budget}
                                  onClick={() => setBudgetLimit(budgetLimit === budget ? null : budget)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${budgetLimit === budget ? 'bg-[#003A70] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                              >
                                  {budget}
                              </button>
                          ))}
                      </div>
                  </div>
                  {/* Location Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Location</h4>
                      <div className="flex flex-wrap gap-2">
                          {locations.map(loc => (
                              <button 
                                  key={loc}
                                  onClick={() => setActiveFilter(activeFilter === loc ? "All" : loc)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${activeFilter === loc ? 'bg-[#003A70] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                              >
                                  {loc}
                              </button>
                          ))}
                      </div>
                  </div>
                  {/* Category Filter */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Category</h4>
                      <div className="flex flex-wrap gap-2">
                          {categories.map(cat => (
                              <button 
                                  key={cat}
                                  onClick={() => setActiveFilter(activeFilter === cat ? "All" : cat)}
                                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${activeFilter === cat ? 'bg-[#FFD700] text-[#003A70]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                              >
                                  {cat}
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => { setActiveFilter("All"); setBudgetLimit(null); setSearchQuery(""); }} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">
                          Clear All
                      </button>
                      <button onClick={() => setIsSearchModalOpen(false)} className="flex-1 py-3 bg-[#003A70] text-white rounded-xl font-medium hover:bg-blue-800 transition">
                          Apply
                      </button>
                  </div>
              </div>
          </div>
      )}
      <div className="px-8 pb-8">
          <div className="flex justify-between items-center mb-4">
              <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                      <button key={loc} onClick={() => setActiveFilter(loc)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === loc ? 'bg-[#003A70] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {loc}
                      </button>
                  ))}
              </div>

          </div>
          <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(activeFilter === cat ? "All" : cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === cat ? 'bg-[#FFD700] text-[#003A70]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {cat}
                  </button>
              ))}
          </div>
      </div>

      {/* --- STALLS GRID --- */}
      <div className="px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStalls.map(stall => (
                  <div key={stall.id} className="border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition duration-300 transform hover:scale-110 cursor-pointer bg-white" onClick={() => setSelectedStall(stall)}>
                      <div className="h-40 bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                          <img src={stall.image} alt={stall.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#003A70]">{stall.rating}%</span>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{stall.name}</h3>
                          {stall.isBestValue && <span className="bg-[#FFD700] text-[#003A70] text-xs font-bold px-2 py-1 rounded-full">Best Value</span>}
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{stall.loc}</p>
                      <div className="flex items-center gap-1 mb-2">
                          <span className="font-medium">{stall.price}</span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-400 text-sm">{stall.hours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                          {stall.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tag}</span>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </div>
      </div>

      {/* --- STALL DETAIL MODAL --- */}
      {selectedStall && (
          <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-4 z-[120]" onClick={() => setSelectedStall(null)}>
              <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h3 className="text-3xl font-bold text-[#003A70]">{selectedStall.name}</h3>
                          <p className="text-gray-500">{selectedStall.loc}</p>
                      </div>
                      <div className="flex items-start gap-3">
                          {selectedStall.isBestValue && <span className="bg-[#FFD700] text-[#003A70] text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">Best Value</span>}
                          <button onClick={() => setSelectedStall(null)} className="text-red-500 hover:text-red-700 text-3xl font-bold flex-shrink-0">&times;</button>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="text-xl">{selectedStall.price}</div>
                      <div className="text-gray-500">{selectedStall.hours}</div>
                  </div>
                  
                  {/* EXPECTATION VS REALITY */}
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">📸 Reality Check</h4>
                      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-gray-100">
                          <div className="relative">
                              <img src={selectedStall.image} alt="Expectation" className="h-32 w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              <div className="absolute inset-0 flex flex-col justify-end">
                                  <span className="bg-black/60 text-white text-[8px] px-1.5 py-0.5 font-bold">Expectation</span>
                              </div>
                          </div>
                          <div className="relative">
                              <img 
                                  src={selectedStall.reviews.find(r => r.realityPhoto)?.realityPhoto || "/images/placeholder-reality.jpg"} 
                                  alt="Reality" 
                                  className="h-32 w-full object-cover" 
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 flex flex-col justify-end">
                                  <span className="bg-blue-600/80 text-white text-[8px] px-1.5 py-0.5 font-bold">Student Reality</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">Menu</h4>
                      <div className="bg-gray-50 rounded-xl p-3 max-h-48 overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2">
                              {selectedStall.menu.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                      <span className="text-sm">{item.name}</span>
                                      <span className="font-medium text-sm">₱{item.price}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <Link href="/map" style={{ textDecoration: "none" }}>
                          <button className="w-full mt-3 py-2 bg-[#003A70] text-white rounded-lg font-bold hover:bg-blue-800 transition text-sm">
                              Go! 📍
                          </button>
                      </Link>
                  </div>
                  <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedStall.tags.map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                          ))}
                      </div>
                  </div>
                  
                  {/* REVIEWS SECTION */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg">Reviews</h4>
                          <span className="text-yellow-500 font-bold text-sm">★ {(selectedStall.rating / 20).toFixed(1)}</span>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                          {selectedStall.reviews.length > 0 ? (
                              selectedStall.reviews.map(rev => (
                                  <div key={rev.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                      <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-black text-blue-800">{rev.user}</span>
                                          <span className="text-xs text-gray-400">{rev.date}</span>
                                      </div>
                                      <div className="flex mb-2">
                                          {[...Array(5)].map((_, i) => (
                                              <span key={i} className={`text-sm ${i < rev.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                                          ))}
                                      </div>
                                      <p className="text-sm italic text-gray-600">"{rev.comment}"</p>
                                  </div>
                              ))
                          ) : (
                              <p className="text-sm text-gray-400 italic text-center py-4">No reviews yet. Help a fellow Eagle!</p>
                          )}
                      </div>

                      {/* REVIEW & EARN PROMPT */}
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between gap-3">
                          <div>
                              <p className="text-xs font-black text-blue-900 uppercase">Review & Earn</p>
                              <p className="text-xs text-blue-700">Submit a photo to get a 10% voucher!</p>
                          </div>
                          <button onClick={() => setIsReviewModalOpen(true)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-black hover:bg-blue-700 transition">Review</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* --- CREATE REVIEW MODAL --- */}
      {isReviewModalOpen && selectedStall && (
          <div className="fixed inset-0 bg-[#003A70]/60 backdrop-blur-md flex items-center justify-center p-4 z-[130]" onClick={() => setIsReviewModalOpen(false)}>
              <div className="bg-white rounded-3xl p-8 max-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-[#003A70]">Review {selectedStall.name}</h3>
                      <button onClick={() => setIsReviewModalOpen(false)} className="text-red-500 hover:text-red-700 text-3xl font-bold">&times;</button>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Rating</h4>
                      <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map(star => (
                              <button
                                  key={star}
                                  onClick={() => setReviewRating(star)}
                                  className={`text-3xl transition ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                  ★
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3">Your Review</h4>
                      <textarea
                          placeholder="Share your experience..."
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A70]/20 resize-none"
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                      />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                      <button
                          onClick={() => setIsReviewModalOpen(false)}
                          className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
                      >
                          Cancel
                      </button>
                      <button
                          onClick={() => {
                              alert(`Review submitted: ${reviewRating} stars - "${reviewText}"`);
                              setIsReviewModalOpen(false);
                              setReviewText("");
                              setReviewRating(5);
                          }}
                          className="flex-1 py-3 bg-[#003A70] text-white rounded-xl font-medium hover:bg-blue-800 transition disabled:opacity-50"
                          disabled={!reviewText.trim()}
                      >
                          Submit
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}