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
import { useGetTokens } from "@/hooks/useGetTokens";
import Assets from "../AddMoney/AssetList";

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

  const { data: balanceData, isSuccess: balanceSuccess } = useBalance({
    address,
    // token: HIGHER_CONTRACT_ADDRESS,
  });

  console.log("BALANCE DATA ", balanceData);
  const { data: rateData } = useExchangeRate(8453);

  const { data: tokensData } = useGetTokens(address as string);

  const router = useRouter();

  return (
    <div className="select-none  bg-center sm:py-12 sm:px-16 p-6 rounded-t-[32px]   bg-white">
      <div className="flex sm:justify-between items-start flex-col sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-0 bg-white">
            <Image
              src={
                "https://res.cloudinary.com/metapass/image/upload/v1712752332/pexels-codioful-_formerly-gradienta_-6985003_rbhkfe.jpg"
              }
              fill
              alt="Avatar"
            />
          </div>
          <p className="text-white text-center font-sans font-medium leading-loose text-lg">
            GM {address ? address.slice(0, 3) + "..." + address.slice(-3) : ""}
          </p>
        </div>
      </div>
      <div className="flex sm:justify-between sm:items-end items-start flex-col sm:flex-row gap-6">
        <div>
          <p className="text-blue font-sans font-medium text-base leading-loose mt-6">
            Wallet Balance
          </p>
          <div className="flex items-center gap-2 my-2">
            <p className="text-blue font-cabinet font-bold leading-loose sm:text-5xl text-2xl ">
              $
              {tokensData?.tokens?.length! > 0
                ? tokensData?.tokens
                    .reduce((prev, curr) => prev + curr.value, 0)
                    ?.toFixed(2)
                : 0}
            </p>
          </div>
          <div className="flex flex-col lg:w-3/5 w-full">
          <Assets tokens={tokensData?.tokens ?? []} />
        </div>
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
