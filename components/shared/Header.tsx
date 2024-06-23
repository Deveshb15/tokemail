import Image from "next/image";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

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
          className="py-3 px-6 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose border border-dark-purple border-solid"
        >
          Share
        </button>
        <ConnectButton />
      </div>
      {menuOpen && <Menu toggleMenu={toggleMenu} setShare={setShare} />}
    </div>
  );
};

const Menu: React.FC<MenuProps> = ({ toggleMenu, setShare }) => {
  const { authenticated, ready, exportWallet } = usePrivy()
  
  useEffect(() => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#2E085D] z-40 flex flex-col items-center gap-8 py-10 px-8">
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
          className="py-5 px-6 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose border border-dark-purple border-solid w-full"
        >
          Share
        </button>
        {
          (authenticated && ready) ? (
            <button onClick={exportWallet} className="bg-purple text-white font-sans font-bold text-lg py-4 px-8 rounded-lg">
              Export Wallet
            </button>
          ) : (
            <ConnectButton />
          )
        }
      </div>
    </div>
  );
};

export default Header;
