import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export type Tokens = {
    name: string,
    label: string,
    symbol: string,
    price: number,
    value: number,
    icon: string,
    amount: number,
    decimals: number,
    chain: string,
    address: string
  }

export const useGetTokens = (address: string) => {
    return useQuery({
        queryKey: ["tokens", address],
        queryFn: async () => {
            return axios
                .get<{
                    tokens: Tokens[]
                }>(`/api/tokens?address=${address}`).then((res) => res.data)
        },

    })
}