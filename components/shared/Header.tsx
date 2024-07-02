import Image from "next/image";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Dispatch, Profiler, SetStateAction, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type MenuProps = {
  toggleMenu: () => void;
  setShare: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  setShare,
}: {
  setShare: Dispatch<SetStateAction<boolean>>;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticated, ready, exportWallet,logout } = usePrivy()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <div className="flex justify-between items-center p-6 md:py-0 border-b border-white border-opacity-20 w-full md:w-auto md:border-b-0">
      <Logo />
      <button className="md:hidden" onClick={toggleMenu}>
        <Image src="/menu.svg" width={24} height={24} alt="Hamburger Menu" />
      </button>
      <div className="md:flex gap-4 hidden">
        <button
          onClick={() => setShare(true)}
          className="py-2 px-2 flex items-center font-cabinet rounded-xl font-medium text-center font-sans text-base leading-loose bg-[#5C90FF]"
        >
          <span className="text-white font-cabinet mr-2">Share</span>
          <Image
          src="/directArrow.svg"
          alt="arrow"
          width={24}
          height={24}
        />

        </button>
        {
          (!authenticated && ready) ? (
          <>
          <Popover>
          <PopoverTrigger>
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-0 bg-white">
                    <Image
                      src={
                        "https://res.cloudinary.com/metapass/image/upload/v1712752332/pexels-codioful-_formerly-gradienta_-6985003_rbhkfe.jpg"
                      }
                      fill
                      alt="Avatar"
                    />
                  </div>
            </PopoverTrigger>
          <PopoverContent className="bg-white font-mono border-white w-[200px]">
              <div className="flex flex-col">
                <button onClick={logout} className="text-base text-black">
                <text className="font-sora">Logout</text> 
                </button>
                <button onClick={exportWallet} className="text-black font-sora pt-2 px-4  text-base">
                      Export Wallet
                    </button>
              </div>
              </PopoverContent>
            </Popover>
                </>
          ) : (
            <ConnectButton />
          )
        }
      </div>
      {menuOpen && <Menu toggleMenu={toggleMenu} setShare={setShare} />}

    </div>
  );
};


const Menu: React.FC<MenuProps> = ({ toggleMenu, setShare }) => {
  const { authenticated, ready, exportWallet,logout } = usePrivy()

  useEffect(() => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue z-40 flex flex-col items-center gap-8 py-10 px-8">
      <button
        className="self-end"
        onClick={() => {
          toggleMenu();
          document.body.style.overflow = "unset";
          document.documentElement.style.overflow = "unset";
        }}
      >
        <Image
          src="/close-white.svg"
          alt="Close button"
          width={24}
          height={24}
        />
      </button>
      <div className="flex flex-col gap-4 w-full items-center">
        <button
          onClick={() => setShare(true)}
          className="py-5 px-6 flex justify-center rounded-xl w-[60%] text-white font-semibold text-center font-sans text-base bg-[#5C90FF] leading-loose w-full"
        >
          Share
          <Image
          src="/directArrow.svg"
          alt="arrow"
          width={24}
          height={24}
          className="ml-2"
        />
        </button>
        
        {
          (!authenticated && ready) ? (
            <>
            <button onClick={exportWallet} className="bg-blue text-white font-sans font-bold text-lg py-2 px-6 rounded-lg">
              Export Wallet
            </button>
             <button onClick={logout} className="text-lg font-sans text-white font-bold">
             <text className="">Logout</text> 
            </button>
            </>
          ) : (
            <ConnectButton />
          )
        }
      </div>
    </div>
  );
};

export default Header;
