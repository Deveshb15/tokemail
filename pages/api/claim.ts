import { supabase } from "@/lib/supabase";
import { abi } from "@/lib/utils";
import { NextApiHandler } from "next";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { uid, chain } = req.body;
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
            abi,
            address:
              chain === "8453"
                ? "0x55d6Da3732babC063bAa40FF4BbB53dCF113F265"
                : "0xc2d646D2e9b737fC0563E289c1403326E937ca44",
            functionName: "withdrawTip",
            account,
            args: [data[0].recipient_address],
          });
          const { error } = await supabase
            .from("tips")
            .update({
              ...data[0],
              claimed: true,
              receiver_hash: hash,
            })
            .eq("claim_uid", uid);
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
