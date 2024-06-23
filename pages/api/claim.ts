import { supabase } from "@/lib/supabase";
import { HIGHER_CONTRACT_ADDRESS, SEPOLIA_CONTRACT_ADDRESS, TRANSFER_ABI, abi } from "@/lib/utils";
import { NextApiHandler } from "next";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { uid, address, chain } = req.body;
      const account = privateKeyToAccount(
        process.env.PRIVATE_KEY as `0x${string}`
      );
      const walletClient = createWalletClient({
        account,
        chain: chain === "8453" ? base : baseSepolia,
        transport: http(
          chain === "8453"
            ? process.env.RPC_URL_BASE
            : process.env.RPC_URL_SEPOLIA
        ),
      });
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("claim_uid", uid);
      if (!error && data.length > 0) {
        try {
          const hash = await walletClient.writeContract({
            abi: TRANSFER_ABI,
            address: chain === "8453" ? HIGHER_CONTRACT_ADDRESS : SEPOLIA_CONTRACT_ADDRESS,
            functionName: "transfer",
            args: [address, parseEther(String(data[0].amount))],
          });
          console.log("HASH ", hash);
          const { data: updateData, error } = await supabase
            .from("tips")
            .update({
              ...data[0],
              claimed: true,
              recipient_address: address,
              receiver_hash: hash,
            })
            .eq("claim_uid", uid);
          console.log("ERROR ", error, updateData);
          if (error) res.status(400).json({ error });
          return res.status(200).send({ hash });
        } catch (e) {
          res.status(200).json({ error: e });
        }
      }
    } catch (e) {
        console.log("ERROR ", e);
      res.status(400).json({ error: e });
    }
  } else {
    return res.status(400).send("Invalid Method");
  }
};

export default handler;
