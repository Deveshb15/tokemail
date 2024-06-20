import Card from "../shared/Card";
import ButtonOutline from "../shared/ButtonOutline";
import Button from "../shared/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { supabase } from "@/lib/supabase";
import { useAccount, useWriteContract } from "wagmi";
import { v4 } from "uuid";
import { abi } from "@/lib/utils";
import { parseEther } from "viem";
import { generateMnemonic, english, mnemonicToAccount } from "viem/accounts";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import splitbee from "@splitbee/web";

const Confirmation = () => {
  const router = useRouter();
  const { amount, email, note } = router.query;
  const { address, chainId } = useAccount();
  const { data } = useExchangeRate(chainId as number);

  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    console.log("confirming");

    const seed = generateMnemonic(english, 256);
    console.log(seed);
    const account = mnemonicToAccount(seed).address;
    console.log(account);
    const claim_uid = v4();

    splitbee.track("Click Confirm Transaction");

    // console.log("AMOUNT ", String(amount))
    // const hash = await writeContractAsync({
    //   address:
    //     chainId === 8453
    //     ? "0x55d6Da3732babC063bAa40FF4BbB53dCF113F265"
    //       : "0x5bb117F0f9d8877bDbA2B07955E73e85fc2eb93e",
    //   abi,
    //   functionName: "addTip",
    //   args: [account],
    //   value: parseEther(String(amount)),
    // });
  //  let hash = "0x36787943b0ab34e4bf213cbf0c895e558df3f6aabb099e53657f31206c07eb64"
  // send the amount of higher(name of the token) token
  // 0x0578d8a44db98b23bf096a382e016e29a5ce0ffe - higher token contract
    const hash = await writeContractAsync({
      address: chainId === 8453 ? "0x0578d8a44db98b23bf096a382e016e29a5ce0ffe" : "0xc2d646D2e9b737fC0563E289c1403326E937ca44",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName: "transfer",
      args: [account, parseEther(String(amount))],
    });

    console.log("HASH ", hash);
    const { data } = await axios.post("/api/mail", {
      uid: claim_uid,
      email,
      seed,
      note,
      amount,
    });
    console.log("DATA ", data);

    const { error } = await supabase.from("tips").insert({
      sender: address,
      recipient: email,
      recipient_address: account,
      claimed: false,
      claim_uid,
      sender_hash: hash,
      amount,
      chain: chainId,
    });

    if (data) toast.success("Tip sent via email");
    toast.success("Successfully Gifted!");

    setTimeout(() => router.push(`/sent?hash=${hash}&email=${email}`));

    setLoading(false);
  };

  return (
    <Card>
      <div className="flex flex-col items-center font-sans py-10">
        <div className="text-dark-grey flex items-center text-lg font-bold sm:gap-1 gap-4 flex-col sm:flex-row ">
          <span>Sending</span>
          <div className="flex gap-1 items-center">
            <Image
              src="/degen-icon.png"
              width={24}
              height={24}
              alt="Degen Icon"
            />
            {amount}
          </div>
          <span>Worth</span>
          <span>
            ${data && Number(amount) * data.rate} @ ${data?.rate}
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
