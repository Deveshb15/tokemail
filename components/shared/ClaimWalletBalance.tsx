import Image from "next/image";

import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";
import { Button } from "../ui/button";
import { formatEther } from "viem";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { HIGHER_CONTRACT_ADDRESS, SEPOLIA_CONTRACT_ADDRESS } from "@/lib/utils";
import { config } from "@/lib/config";
import { usePrivy } from "@privy-io/react-auth";

type WalletBalanceProps = {
  dashboard?: boolean;
};

type UserENS = {
  ens?: string;
  avatar?: string;
};

const ClaimWalletBalance: React.FC<WalletBalanceProps> = ({ dashboard }) => {
  const { user } = usePrivy();
  let address = user?.wallet?.address as `0x${string}` | undefined;
  console.log("ADDRESS ", address);
  const [ens, setEns] = useState<UserENS | null>(null);

  useEffect(() => {
    if (address) {
      axios
        .get<UserENS>("/api/ens", {
          params: {
            address,
          },
        })
        .then((res) => setEns(res.data))
        .catch((e) => console.log("ERROR ", e));
    }
  }, [address]);

  const { data: balanceData, isSuccess: balanceSuccess } = useBalance({
    address,
    // token: HIGHER_CONTRACT_ADDRESS,
  });

  console.log("BALANCE DATA ", balanceData);
  const { data: rateData } = useExchangeRate(8453);

  const router = useRouter();

  return (
    <div className="select-none  bg-center sm:py-12 sm:px-16 p-6 rounded-t-[32px]   bg-white">
      <div className="flex sm:justify-between items-start flex-col sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-0 bg-white">
            <Image
              src={
                ens && ens.avatar
                  ? String(ens.avatar)
                  : "https://res.cloudinary.com/metapass/image/upload/v1712752332/pexels-codioful-_formerly-gradienta_-6985003_rbhkfe.jpg"
              }
              fill
              alt="Avatar"
            />
          </div>
          <p className="text-white text-center font-sans font-medium leading-loose text-lg">
            GM{" "}
            {ens
              ? ens.ens
              : address
              ? address.slice(0, 3) + "..." + address.slice(-3)
              : ""}
          </p>
        </div>
        <p className="text-white font-sans text-base leading-loose hidden sm:block">
          1 ${balanceData?.symbol ?? "HIGHER"} :{" "}
          <span className="font-bold">${rateData?.rate}</span>
        </p>
      </div>
      <div className="flex sm:justify-between sm:items-end items-start flex-col sm:flex-row gap-6">
        <div>
          <p className="text-blue font-sans font-medium text-base leading-loose mt-6">
            Wallet Balance
          </p>
          <div className="flex items-center gap-2 my-2">
            <p className="text-white font-sans font-bold leading-loose sm:text-5xl text-2xl [text-shadow:_0_4px_0_rgb(146_97_225_/_100%)]">
              {balanceSuccess ? formatEther(balanceData.value).slice(0, 6) : 0}
            </p>
            <div>
              <div className="text-white font-sans text-base font-medium leading-loose flex items-center gap-1">
                <Image
                  src="/higher-icon.png"
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt="Higher Icon"
                />
                {balanceData?.symbol}
              </div>
            </div>
          </div>
          <p className="text-white font-sans text-base font-medium leading-loose">
            ≈ $
            {balanceData &&
              rateData &&
              (rateData?.rate * Number(formatEther(balanceData.value))).toFixed(
                6
              )}
          </p>
        </div>
        {dashboard && (
          <Button
            onClick={() => {
              router.push("/send-money");
            }}
            className="bg-blue py-4 px-8 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose disabled:opacity-50 hover:bg-[#834BDD]"
          >
            GIFT ${balanceData?.symbol}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClaimWalletBalance;
