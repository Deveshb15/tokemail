import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center">
      <p className="text-white text-center font-sans text-base font-normal leading-loose flex items-center gap-2 ">
        From the House of
        <Link href="https://warpcast.com/~/channel/fbi" target="_blank">
          <Image src="/fbi-logo.svg" width={24} height={24} alt="FBI logo" />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
