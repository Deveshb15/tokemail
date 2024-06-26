import Card from "../shared/Card";
import ButtonOutline from "../shared/ButtonOutline";
import Button from "../shared/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { supabase } from "@/lib/supabase";
import { useAccount, useWriteContract, useSendTransaction } from "wagmi";
import { v4 } from "uuid";
import { parseEther } from "viem";
import { generateMnemonic, english, mnemonicToAccount } from "viem/accounts";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import splitbee from "@splitbee/web";
import {
  HIGHER_CONTRACT_ADDRESS,
  TRANSFER_ABI,
  MIDDLE_WALLET,
  SEPOLIA_CONTRACT_ADDRESS,
  sleep,
} from "@/lib/utils";

const Confirmation = () => {
  const router = useRouter();
  // const { amount, email, note, image, price, symbol, contract_address } : {amount: string, ema}= router.query;
  const { amount, email, note, image, price, symbol, contract_address } =
    router.query as {
      amount: string;
      email: string;
      note: string;
      image: string;
      price: string;
      symbol: string;
      contract_address: `0x${string}`;
    };
  const { address, chainId } = useAccount();
  const { data } = useExchangeRate(chainId as number);

  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const claim_uid = v4();

    splitbee.track("Click Confirm Transaction");
    // get wallet address of email
    const { data : privyData } = await axios.get(`/api/privy?email=${email}`);
    const { address: recipient_address } = privyData;

    console.log("RECIPIENT ADDRESS", recipient_address);

    let hash = "0x0";
    if (contract_address && contract_address?.length > 0) {
      hash = await writeContractAsync({
        address: contract_address,
        abi: TRANSFER_ABI,
        functionName: "transfer",
        args: [recipient_address, parseEther(String(amount))],
      });
    } else {
      hash = await sendTransactionAsync({
        to: recipient_address,
        value: parseEther(String(amount)),
      });
    }

    console.log("HASH", hash);
    if (hash && hash !== "0x0") {
      const { data } = await axios.post("/api/mail", {
        uid: claim_uid,
        email,
        seed: "hello",
        note,
        amount,
        symbol,
      });

      const { error } = await supabase.from("tips").insert({
        sender: address,
        recipient: email,
        // recipient_address: account,
        claimed: false,
        claim_uid,
        sender_hash: hash,
        amount,
        chain: chainId,
        symbol,
        token: contract_address ?? "ETH",
      });

      console.log("ERROR", error);

      if (data) toast.success("Tip sent via email");
      toast.success("Successfully Gifted!");
      setTimeout(() => router.push(`/sent?hash=${hash}&email=${email}&symbol=${symbol}&icon=${image}`));
      setLoading(false);
    } else {
      toast.error("Transaction failed");
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center font-sans py-10">
        <div className="text-dark-grey flex items-center text-lg font-bold sm:gap-1 gap-4 flex-col sm:flex-row ">
          <span>Sending</span>
          <div className="flex gap-1 items-center">
          {amount}
            <Image
              src={
                (image as string) ??
                "https://i.ibb.co/ZX63CHy/Expo-App-Icon-Splash.png"
              }
              width={24}
              height={24}
              className="rounded-full"
              alt="Higher Icon"
            />
          </div>
          <span>Worth</span>
          <span>
            ${data && (Number(amount) * Number(price))?.toFixed(4)} @ $
            {Number(price)?.toFixed(4)}
          </span>
        </div>
        <p className="text-dark-grey opacity-60 font-bold text-lg mt-4">
          + ~$0.02 gas
        </p>
        <p className="text-dark-grey flex item-center text-lg font-bold mt-6">
          TO
        </p>
        <p className="text-dark-grey opacity-60 font-bold text-lg mt-2">
          {email}
        </p>
        <div className="flex gap-4 mt-8 sm:flex-row flex-col w-full sm:w-auto">
          <ButtonOutline
            content="Cancel"
            onClick={() => router.push("/dashboard")}
          />
          <Button content="Confirm" onClick={handleConfirm} loading={loading} />
        </div>
      </div>
    </Card>
  );
};

export default Confirmation;
