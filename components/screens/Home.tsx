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

  // useEffect(() => {
  //   if (isConnected) router.push("/dashboard");
  // }, [isConnected]);

  useEffect(() => {
    if (authenticated && ready) router.push("/claim/dashboard");
  }, [authenticated, ready]);

  return (
  
    <div className="flex flex-col font-geist min-h-screen  text-white">
      <div className="flex justify-between w-full p-6">
        <h1 className="text-2xl font-sora font-bold">tokemail</h1>
        <div className="flex space-x-4">
          <button className="hidden md:flex md:px-4 flex md:py-2 bg-[#5C90FF] font-semibold rounded-full hover:bg-blue-600">
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
          <ConnectButton label="Send Now" />
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

      <div className="flex flex-col items-start justify-end mb-10 flex-grow text-center">
        <div className="flex flex-col px-4 md:p-0 md:flex-row items-start md:items-center"  style={{"lineHeight":0}}>
        <h2 className="text-6xl md:text-7xl lg:text-[110px] font-bold">Send</h2>
        <div className="flex items-center bg-[#4480FF] h-10 md:h-20 px-2 rounded-2xl">
        <Image
            src="/tokens.svg"
            alt="All Tokens"
            width={70}
            height={70}
            className="w-20 md:w-40 h-20 md:h-40"
          />
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold">Your tokens</h2>
        </div>   
        </div>
        <div className="px-4 md:p-0 flex items-center relative">
  <div className="hidden md:flex">
    <h2 className="md:text-9xl font-bold lg:text-[212px] font-bold">Base→Email</h2>
    <Image
      src="/anyone.svg"
      alt="to anyone"
      width={70}
      height={70}
      className="w-28 md:w-40 h-28 md:h-40 absolute right-[-6rem] mt-8 top-1/2 transform -translate-y-1/2"
    />
  </div>
  <div className="md:hidden flex flex-col relative">
    <h2 className="text-start font-bold text-8xl">Base→</h2>
    <div className="flex items-center">
      <h2 className="text-8xl font-bold">Email</h2>
      <Image
        src="/anyone.svg"
        alt="to anyone"
        width={70}
        height={70}
        className="w-28 h-28 mt-3 ml-[-1rem] flex-shrink-0"
      />
    </div>
  </div>
</div>
      </div>
    </div>
  );
};
export default Home;
