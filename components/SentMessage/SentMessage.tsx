import Card from "../shared/Card";
import Button from "../shared/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAccount } from "wagmi";

const SentMessage = () => {
  const router = useRouter();
  const { chainId } = useAccount();
  const { hash, email, symbol, icon = "https://i.ibb.co/ZX63CHy/Expo-App-Icon-Splash.png" } = router.query;
  return (
    <Card>
      <div className="flex flex-col items-center font-sans sm:py-16 py-8">
        <div className="flex gap-1 flex-col sm:flex-row items-center text-dark-grey font-sans text-2xl font-semibold leading-loose tracking-tighter">
          Successfully sent
          <div className="flex gap-1 items-center">
            <Image
              src={Array.isArray(icon) ? icon[0] : icon}
              width={24}
              height={24}
              className="rounded-full"
              alt="Higher Icon"
            />
            <span className="text-blue">${symbol}</span>
          </div>
          to
        </div>
        <p className="text-dark-grey font-medium text-lg leading-loose tracking-tighter mt-4">
          {email}
        </p>
        <div className="flex gap-4 mt-8 sm:flex-row flex-col w-full sm:w-auto">
          <Link
            target="_blank"
            href={`https://basescan.org/tx/${hash}`}
            className="py-3 px-8 rounded-xl font-bold text-center font-sans text-base border border-blue border-solid text-blue"
          >
            View Transaction
          </Link>
          <Button
            content="Send Again"
            onClick={() => router.push("/send-money")}
          />
        </div>
      </div>
    </Card>
  );
};

export default SentMessage;
