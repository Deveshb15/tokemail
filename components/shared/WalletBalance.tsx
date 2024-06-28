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
import { useGetTokens } from "@/hooks/useGetTokens";

type WalletBalanceProps = {
  dashboard?: boolean;
};

type UserENS = {
  ens?: string,
  avatar?: string
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ dashboard }) => {
  const { address } = useAccount();
  console.log("ADDRESS ", address)

  const { data: balanceData, isSuccess: balanceSuccess } = useBalance({
    address,
    // token: chainId === 8453 ? HIGHER_CONTRACT_ADDRESS : SEPOLIA_CONTRACT_ADDRESS,
  });
  // const { data: rateData } = useExchangeRate(chainId as number);
  const { data: tokenData }  = useGetTokens(address as string)

  const router = useRouter();

  return (
    <div className="select-none bg-center sm:py-12 sm:px-16 p-6 rounded-t-[32px]   bg-white">
      <div className="flex sm:justify-between items-start flex-col sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-0 bg-white">
            <Image
              src={"https://res.cloudinary.com/metapass/image/upload/v1712752332/pexels-codioful-_formerly-gradienta_-6985003_rbhkfe.jpg"}
              fill
              alt="Avatar"
            />
          </div>
          <p className="text-blue text-center font-cabinet font-normal leading-loose text-lg">
            {/* GM{" "} */}
            {address
                ? address.slice(0, 3) + "..." + address.slice(-3)
                : ""}
          </p>
        </div>
        {/* <p className="text-white font-sans text-base leading-loose hidden sm:block">
          1 ${balanceData?.symbol} :{" "}
          <span className="font-bold">${rateData?.rate}</span>
        </p> */}
      </div>
      <div className="flex sm:justify-between sm:items-end items-start flex-col sm:flex-row gap-6">
        <div>
          <p className="text-blue font-normal font-cabinet text-base leading-loose mt-6">
            Your Overall Balance
          </p>
          <div className="flex items-center gap-2 my-2">
            <p className="text-blue font-cabinet font-bold leading-loose sm:text-5xl text-2xl ">
              ${tokenData?.tokens?.length! > 0 ? tokenData?.tokens.reduce((prev, curr) => prev + curr.value, 0)?.toFixed(4) : 0}
            </p>
            {/* <div>
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
            </div> */}
          </div>
          {/* <p className="text-white font-sans text-base font-medium leading-loose">
            ≈ $
            {balanceData &&
              rateData &&
              (rateData?.rate * Number(formatEther(balanceData.value))).toFixed(
                6
              )}
          </p> */}
        </div>
        {dashboard && (
          <Button
            onClick={() => {
              router.push("/send-money");
            }}
            className="bg-[#0052FE] py-4 px-8 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose disabled:opacity-50 hover:bg-[#0042CC]"
          >
            Gift Token
          </Button>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
