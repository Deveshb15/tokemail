import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../shared/Logo";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TOKEN_NAME } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";

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
  const [showConnect, setShowConnect] = useState(false);

  const handleSendNowClick = () => {
    setShowConnect(true);
  };

  useEffect(() => {
    if (isConnected) router.push("/dashboard");
  }, [isConnected]);

  useEffect(() => {
    if (authenticated && ready) router.push("/claim/dashboard");
  }, [authenticated, ready]);

  return (
    <div className="flex flex-col font-geist min-h-screen  text-white">
      <div className="flex justify-between w-full p-6">
        <h1 className="text-2xl font-sora font-bold">tokemail</h1>
        <div className="flex space-x-4">
          <button className="md:px-4 flex md:py-2 bg-[#5C90FF] font-semibold rounded-full hover:bg-blue-600">
            Add your token
            <Image
          src="/directArrow.svg"
          alt="arrow"
          width={24}
          height={24}
          className="ml-2"
        />             
            </button>
            {!authenticated ? (
        !showConnect ? (
          <button
            onClick={handleSendNowClick}
            className="px-4 flex py-2 text-blue font-geist font-semibold bg-white rounded-full hover:bg-blue-600"
          >
            Send now
            <Image
          src="/rightArrow.svg"
          alt="arrow"
          width={24}
          height={24}
          className="ml-2"
        />        
          </button>
        ) : (
          <ConnectButton />
        )
      ) : (authenticated && ready) ? (
        <button
          onClick={exportWallet}
          className="bg-purple text-white font-sans font-bold text-lg py-2 px-6 rounded-lg"
        >
          Export Wallet
        </button>
      ) : (
        <ConnectButton />
      )}
        </div>
      </div>

      <div className="flex flex-col items-start justify-end flex-grow text-center">
        <div className="flex items-center">
        <h2 className="md:text-[110px] font-bold">Send</h2>
        <Image
            src="/tokens.svg"
            alt="All Tokens"
            width={70}
            height={70}
            className="w-40 h-40"
          />
        <h2 className="md:text-5xl lg:text-7xl font-bold">Your tokens</h2>
   
        </div>
        <div className="flex items-center ">
        <h2 className="mt-8 md:text-5xl lg:text-[212px] font-bold">Base→Email</h2>
     
        <Image
            src="/anyone.svg"
            alt="to anyone"
            width={70}
            height={70}
            className="w-40 h-40 flex right-0 justifty-end absolute mr-24 mt-32"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
