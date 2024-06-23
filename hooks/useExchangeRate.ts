import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useExchangeRate = (chain: number) => {
    return useQuery({
        queryKey: ["usdExchangeRate", chain],
        queryFn: async () => {
            return axios
                .get<{
                    rate: number
                }>("/api/exchange", { params: { chain: chain == 8453 ? "higher" : "higher"} }).then((res) => res.data)
        },

    })
}
