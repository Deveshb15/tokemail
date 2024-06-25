import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Tokens = {
    token_name: string,
    token_symbol: string,
    token_price: number,
    token_value: number,
    token_icon: string,
    token_quantity: number,
    token_decimals: number,
    token_chain: string,
    token_address: string
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