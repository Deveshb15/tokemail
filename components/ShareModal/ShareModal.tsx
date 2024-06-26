import { TOKEN_NAME } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

const ShareModal = ({
  setShare,
}: {
  setShare: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-3xl py-12 px-6 md:px-12 relative md:w-fit w-screen mx-2">
      <button
        onClick={() => setShare(false)}
        className="absolute top-8 right-8"
      >
        <Image
          src="/close-icon.svg"
          alt="Close button"
          width={24}
          height={24}
        />
      </button>
      <h3 className="text-dark-grey text-center font-sans text-xl font-semibold leading-6 mt-2 mb-8">
        Share Tokemail with Friends
      </h3>
      <p className="text-dark-grey font-sans text-base font-medium leading-5">
        Copy link
      </p>
      <div className="bg-medium-grey flex justify-between py-4 md:px-8 px-4 rounded-xl w-full gap-10 mt-2">
        <p className="text-[#646464] font-sans text-base font-medium leading-5">
        tokemail.xyz
        </p>
        <button
          onClick={async () => {
            await window.navigator.clipboard.writeText("https://tokemail.xyz");
            toast.success("Link Copied!");
          }}
        >
          <Image
            src="/copy-icon.svg"
            alt="Copy button"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex justify-evenly mt-8">
        <Link
          href={`https://warpcast.com/~/compose?text=I%20just%20gifted%20some%20tokens%20on%20@base%20to%20onboard%20a%20friend%20on%20TOKEMAIL.xyz!&embeds[]=https://tokemail.xyz`}
          target="_blank"
          className="flex flex-col items-center gap-3"
        >
          <Image
            src="/warpcast-logo.svg"
            alt="Warpcast Logo"
            width={48}
            height={48}
          />
          <button className="text-black font-sans text-base leading-6 font-medium">
            Cast on Warpcast
          </button>
        </Link>
        <Link
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=I just gifted some tokens on @base to onboard a friend via tokemail.xyz!`}
          className="flex flex-col items-center gap-3"
        >
          <Image src="/x-logo.svg" alt="X Logo" width={48} height={48} />
          <button className="text-black font-sans text-base leading-6 font-medium">
            Tweet on X
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShareModal;
