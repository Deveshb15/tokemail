import Home from "@/components/screens/Home";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <div style={{
      backgroundImage: "url('/noisebg.png')",
      backgroundSize: 'cover',
      height: '100vh', 
      width: '100vw',
    }}>
  
    <main className="flex h-screen flex-col justify-center md:p-16 pb-6">
      <Home />
    </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.VERCEL_URL || "http://localhost:3000";
  const frameMetadata = await getFrameMetadata(`${url}/api/`);
  return {
    other: frameMetadata,
  };
}
