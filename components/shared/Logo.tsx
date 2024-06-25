import { TOKEN_NAME } from "@/lib/utils";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      style={{fontFamily:'Sora'}}
      className="text-white text-center font-sora font-bold text-2xl leading-loose tracking-tight "
    >
      tokemail
    </Link>
  );
};

export default Logo;
