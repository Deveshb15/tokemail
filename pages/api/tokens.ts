import axios from "axios";
import { NextApiHandler } from "next";

// In seconds
const CACHE_MAX_AGE = 60 * 10; // 10 minutes

const getTokens = (data: any) => {
    let tokens = []
    for(let token of data) {
        let token_data = {
            name: token.attributes.fungible_info.name,
            label: token.attributes.fungible_info.symbol,
            symbol: token.attributes.fungible_info.symbol,
            price: token.attributes.price,
            value: token.attributes.value,
            icon: token.attributes.fungible_info.icon?.url,
            amount: token.attributes.quantity.float,
            decimals: token.attributes.quantity.decimals,
            chain: token.relationships.chain.data.id,
            address: token.attributes.fungible_info.implementations[0].address
        }
        if(token_data.price > 0 && token_data.value > 0.5 && token_data.amount > 0) {
            tokens.push(token_data)
        }
    }

  return tokens
}

const handler: NextApiHandler = async (req, res) => {
  const { address } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.zerion.io/v1/wallets/${address}/positions/?filter[positions]=only_simple&currency=usd&filter[chain_ids]=base&filter[trash]=only_non_trash&sort=value`,
      {
        headers: {
          accept: "application/json",
          authorization: `Basic ${process.env.ZERION_API_KEY}`,
        },
      }
    );
    res.setHeader(
      "Cache-Control",
      `public, max-age=0, s-maxage=${CACHE_MAX_AGE}`
    );
    return res.json({ tokens: getTokens(data?.data) });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      return res.status(429).json({
        error: "Too many requests",
      });
    }

    return res.status(400).json({
      error: error,
    });
  }
};

export default handler;
