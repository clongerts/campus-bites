import Link from "next/link";

export default function MapPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Campus Map</h1>
      <p>Find food stalls across campus</p>
      
      <div style={{ marginTop: "2rem", padding: "2rem", border: "2px solid #ccc", borderRadius: "8px", minHeight: "400px" }}>
        <p style={{ color: "#666" }}>Map placeholder - add your campus map here</p>
      </div>
      
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" style={{ color: "#0070f3" }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}