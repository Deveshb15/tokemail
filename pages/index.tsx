import Home from "@/components/screens/Home";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col  items-center justify-between md:p-16 pb-6">
      <Home />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.VERCEL_URL || "http://localhost:3000";
  const frameMetadata = await getFrameMetadata(`${url}/api/`);
  return {
    other: frameMetadata,
  };
}
