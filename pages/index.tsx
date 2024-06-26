import Home from "@/components/screens/Home";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export default function HomePage() {
  return (
    // <div style={{
    //   backgroundImage: "url('/noisebg.png')",
    //   backgroundSize: 'cover',
    //   height: '100vh', 
    //   width: '100vw',
    // }}>
    //   <div style={{
    //         background: "conic-gradient(from 0deg at 50% 50%, #4681FF 0deg, #0B40FF 185.4deg, #0934FF 360deg)"
    //   }}>
    // <main className="flex h-screen flex-col justify-center md:p-16 pb-6">
    //   <Home />
    // </main>
    // </div>
    // </div>
    <div style={{
      position: 'relative', // Establishes a positioning context for the overlay
      height: '100vh',
      width: '100vw',
    }}>
      {/* Debugging: Increase specificity or use!important if necessary */}
      <div style={{
        backgroundImage: "url('/noisebg.png')", // Ensure this path is correct
        backgroundSize: 'cover',
        position: 'absolute', // Positions the noise background behind the overlay
        zIndex: -1, // Ensures the noise background stays behind the overlay
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        /* Debugging: Add!important if needed */
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center center',
      }}></div>
    
      <div style={{
        position: 'absolute', // Positions the overlay on top of the noise background
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black overlay
        zIndex: 0, // Ensures the overlay is between the noise background and the content
      }}></div>
    
      <div style={{
        background: "conic-gradient(from 0deg at 50% 50%, #4681FF 0deg, #0B40FF 185.4deg, #0934FF 360deg)",
        position: 'relative', // Ensures the content is above the overlay
        zIndex: 1, // Lifts the content above the overlay
      }}>
        <main className="flex h-screen flex-col justify-center md:p-16 pb-6">
          <Home />
        </main>
      </div>
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
