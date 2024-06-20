import { http, createConfig } from "@wagmi/core";
import { base, mainnet, sepolia } from "@wagmi/core/chains";
import { defineChain } from "viem";

export const degen = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/base"] },
  },
  blockExplorers: {
    default: { name: "Basescan", url: "https://basescan.org" },
  },
});

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
