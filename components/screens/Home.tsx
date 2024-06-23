import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../shared/Logo";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TOKEN_NAME } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";

const Home = () => {
  const router = useRouter();

  const { data: gifts } = useQuery({
    queryKey: ["homeGiftCounter"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tips").select("*");
      if (!error && data.length > 0) {
        return data.length;
      } else {
        return 0;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const { isConnected } = useAccount();
  const { authenticated, ready, exportWallet } = usePrivy()

  useEffect(() => {
    if (isConnected) router.push("/dashboard");
  }, [isConnected]);

  console.log("AUTHENTICATED ", authenticated, ready);
  useEffect(() => {
    if (authenticated && ready) router.push("/claim/dashboard");
  }, [authenticated, ready]);

  return (
    <>
      <div className="py-6 md:py-0 border-b border-white border-opacity-20 w-full md:w-auto md:border-b-0 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex flex-col items-center p-6 sm:p-0">
        {/* <p className="text-white text-center font-sans text-base flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
          </span>
          {gifts ? gifts : 100} Gifts Sent
        </p> */}
        <h2
          style={{ lineHeight: "120%" }}
          className="text-white text-center font-mono sm:text-6xl text-4xl font-bold uppercase tracking-tight mt-6 mb-12 [text-shadow:_0_4px_0_rgb(146_97_225_/_100%)]"
        >
          Onboard your friends
          <br /> onchain with{" "}
          <span className="text-purple">${TOKEN_NAME}</span>
        </h2>
        {
          (authenticated && ready) ? (
            <button onClick={exportWallet} className="bg-purple text-white font-sans font-bold text-lg py-2 px-6 rounded-lg">
              Export Wallet
            </button>
          ) : (
            <ConnectButton />
          )
        }
      </div>
    </>
  );
};

export default Home;
