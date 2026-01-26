export default function StallDetail({ params }: { params: { id: string } }) {
  // This is where you would fetch data based on the ID
  return (
    <div className="max-w-4xl mx-auto py-20 px-8">
      <h1 className="text-6xl font-black mb-4">Store Details</h1>
      <p className="text-gray-500 text-xl font-medium">Coming soon: Full menu, reviews, and maps for {params.id}.</p>
    </div>
  );
}