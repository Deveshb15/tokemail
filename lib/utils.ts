import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getAddress } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TOKEN_NAME = "HIGHER"

export const MIDDLE_WALLET = "0x2BA4f0484085F0F9ad7887Ce3eE37C98A51E1Df2"

export const HIGHER_CONTRACT_ADDRESS= "0x0578d8a44db98b23bf096a382e016e29a5ce0ffe"

export const SEPOLIA_CONTRACT_ADDRESS = "0xc2d646D2e9b737fC0563E289c1403326E937ca44"

export const TRANSFER_ABI = [
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
]

export const abi = [
  {
    "type": "function",
    "name": "addTip",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "invalidateTip",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawTip",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]

export function shortenAddress(address: string, chars = 0, endingChars = 0): string {
  const parsed = getAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 5)}...${endingChars ? `${parsed.substring(42 - endingChars)}` : ``}`
}
