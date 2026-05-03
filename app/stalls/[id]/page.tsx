import { notFound } from "next/navigation";

// 1. Define the type to match your data structure
interface Stall {
  id: number;
  name: string;
  loc: string;
  rating: number;
  price: string;
  hours: string;
  tags: string[];
  image: string;
  portionSize: string;
}

// 2. The data (I've included a sample based on your screenshot)
// PRO TIP: Move this array to a separate 'data.ts' file later!
const stalls: Stall[] = [
  { id: 9, name: "Baoba", loc: "JSEC", rating: 94, price: "PP", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Drinks"], image: "/images/baoba.jpg", portionSize: "Small" },
  { id: 10, name: "Hikori", loc: "JSEC", rating: 90, price: "P", hours: "8:00 AM - 5:00 PM", tags: ["Inside Campus", "Budget"], image: "/images/hikori.jpg", portionSize: "Regular" },
  // ... add your other 30+ stalls here
];

export default async function StallDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 3. Await the params (This fixes your build crash)
  const { id } = await params;
  
  // 4. Find the specific stall
  const stall = stalls.find((s) => s.id.toString() === id);

  // 5. If the ID doesn't exist in your array, show a 404
  if (!stall) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-8">
      <h1 className="text-6xl font-black mb-4">{stall.name}</h1>
      <div className="flex gap-4 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
          {stall.loc}
        </span>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
          ⭐ {stall.rating}
        </span>
      </div>
      
      <p className="text-gray-500 text-xl font-medium mb-8">
        Hours: {stall.hours} | Price: {stall.price}
      </p>

      <div className="p-10 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300">
        <p className="text-center text-gray-400">
          Coming soon: Full menu, reviews, and maps for {stall.name}.
        </p>
      </div>
    </div>
  );
}

// 6. Tell Next.js which IDs exist so it can pre-render them
export async function generateStaticParams() {
  return stalls.map((stall) => ({
    id: stall.id.toString(),
  }));
}