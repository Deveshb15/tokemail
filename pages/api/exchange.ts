import axios from "axios"
import { NextApiHandler } from "next"

// In seconds
const CACHE_MAX_AGE = 60 * 5 // 5 minutes

const handler: NextApiHandler = async (req, res) => {
    const { chain } = req.query
    try {
        const { data } = await axios
            .get("https://api.coingecko.com/api/v3/simple/price", {
                params: {
                    ids: chain,
                    vs_currencies: "usd"
                },
            })
        res.setHeader("Cache-Control", `public, max-age=0, s-maxage=${CACHE_MAX_AGE}`)
        return res.json({ rate: data[String(chain)].usd })
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
            return res.status(429).json({
                error: "Too many requests",
            })
        }

        return res.status(400).json({
            error: error
        })
    }
}

export default handler
