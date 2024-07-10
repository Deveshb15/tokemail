import Image from "next/image";

import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";
import { Button } from "../ui/button";
import { formatEther, parseEther } from "viem";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  HIGHER_CONTRACT_ADDRESS,
  SEPOLIA_CONTRACT_ADDRESS,
  TRANSFER_ABI,
} from "@/lib/utils";
import { config } from "@/lib/config";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  CallWithERC2771Request,
  CallWithSyncFeeERC2771Request,
  CallWithSyncFeeRequest,
  GelatoRelay,
  SponsoredCallRequest,
  TransactionStatusResponse,
} from "@gelatonetwork/relay-sdk";
import { ethers } from "ethers";
import { useGetTokens } from "@/hooks/useGetTokens";
import Assets from "../AddMoney/AssetList";

type WalletBalanceProps = {
  dashboard?: boolean;
};

type UserENS = {
  ens?: string;
  avatar?: string;
};

const GELATO_RELAY_API_KEY = "FcOfNB_hJ26coybJ0_KtBcftgOoxv9I2DqwrdLLs00k_";

const ClaimWalletBalance: React.FC<WalletBalanceProps> = ({ dashboard }) => {
  const { user } = usePrivy();
  let address = user?.wallet?.address as `0x${string}` | undefined;
  console.log("ADDRESS ", address);
  const { wallets } = useWallets();

  const { data: balanceData, isSuccess: balanceSuccess } = useBalance({
    address,
    // token: HIGHER_CONTRACT_ADDRESS,
  });

  console.log("BALANCE DATA ", balanceData);
  const { data: rateData } = useExchangeRate(8453);

  const { data: tokensData } = useGetTokens(address as string);

  const router = useRouter();

  // const handleSendMoney = async () => {
  //   try {
  //     const wallet = wallets[0];
  //     console.log("WALLET ", wallet);
  //     // Initialize your ethers provider and signer
  //     const embeddedWallet = wallets.find(
  //       (wallet) => wallet.walletClientType === "privy"
  //     );
  //     if (embeddedWallet) {
  //       await embeddedWallet.switchChain(84532);
  //       const provider = await embeddedWallet.getEthersProvider();
  //       const signer = provider.getSigner();
  //       const newProvider = new JsonRpcProvider(
  //         "https://rpc.ankr.com/base_sepolia",
  //         84532
  //       );
  //       console.log("PROVIDER ", provider);
  //       console.log("SIGNER ", signer);
  //       if (signer) {
  //         const contract = new Contract(
  //           SEPOLIA_CONTRACT_ADDRESS,
  //           TRANSFER_ABI,
  //           newProvider
  //         );
  //         console.log("CONTRACT ", contract);
  //         const { data } = await contract.transfer.populateTransaction({
  //           to: "0xb1C3c18A57674D59F2a680Cf29b64115B42963d1",
  //           value: parseEther(String("100")),
  //         });

  //         console.log("DATA ", data);
  //         // send 0.0009 eth to 0xb1C3c18A57674D59F2a680Cf29b64115B42963d1

  //         // Relay the transaction gaslessly with Gelato
  //         const relay = new GelatoRelay();
  //         // const request = ;
  //         const relayResponse = await relay.sponsoredCall(
  //           {
  //             chainId: BigInt(84532),
  //             target: SEPOLIA_CONTRACT_ADDRESS,
  //             data: data as string,
  //             // user: wallet.address,
  //           },
  //           signer,
  //           "FcOfNB_hJ26coybJ0_KtBcftgOoxv9I2DqwrdLLs00k_"
  //         );

  //         console.log("RELAY RESPONSE ", relayResponse);
  //       }
  //     }
  //   } catch (err) {
  //     console.log("ERROR ", err);
  //   }
  // };

  const sponsoredCall = async () => {
    const relay = new GelatoRelay();
    const wallet = wallets[0];
    console.log("WALLET ", wallet);
    // Initialize your ethers provider and signer
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );
    if (embeddedWallet) {

      
      await embeddedWallet.switchChain(84532);
      const provider = await embeddedWallet.getEthersProvider();
      const signer = provider.getSigner() as unknown as ethers.Signer;
      
      const chainId = BigInt((await provider!.getNetwork()).chainId);

      const daiAbi = [
      
        // Send some of your tokens to someone else
        "function transfer(address to, uint amount)",
        "function balanceOf(address owner) view returns (uint)",
      
        // An event triggered whenever anyone transfers to someone else
        "event Transfer(address indexed from, address indexed to, uint amount)"
      ];
      // Generate the target payload
      const contract = new ethers.Contract(SEPOLIA_CONTRACT_ADDRESS, daiAbi, signer);
      // get balance of erc20 token on my embedded wallet
      const balance = await contract.balanceOf(wallet.address);
      console.log("BALANCE ", balance)
      console.log("ETHER SEND ", parseEther(String("0.001").toString()))
      const { data } = await contract.transfer.populateTransaction("0xb1C3c18A57674D59F2a680Cf29b64115B42963d1", parseEther(String("0.001")));

      // Populate a relay request
      const request: SponsoredCallRequest = {
        chainId,
        target: SEPOLIA_CONTRACT_ADDRESS,
        data: data as string,
      };

      const response = await relay.sponsoredCall(
        request,
        GELATO_RELAY_API_KEY as string
      );

      console.log(
        `https://relay.gelato.digital/tasks/status/${response.taskId}`
      );
    }
  };

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
                    ?.toFixed(4)
                : 0}
            </p>
          </div>
          <div className="flex flex-col lg:w-3/5 w-full">
            {/* <Assets tokens={tokensData?.tokens ?? []} /> */}
          </div>
        </div>
        {dashboard && (
          <Button
            onClick={sponsoredCall}
            className="bg-[#0052FE] py-4 px-8 rounded-xl text-white font-semibold text-center font-sans text-base leading-loose disabled:opacity-50 hover:bg-[#0042CC]"
          >
            Gift Tokens
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClaimWalletBalance;
