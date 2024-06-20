import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type UserData = {
    address: string;
    avatar: string;
    avatar_small: string;
    avatar_url: string;
    contentHash: string | null;
    ens: string;
    ens_primary: string;
    resolverAddress: string;
    wallets: {
        eth: string;
        // Add more wallet types if needed, e.g., btc: string;
    };
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.query
    try {
        const { data: { ens, avatar_url } } = await axios.get<UserData>(`https://ensdata.net/${address}`);
        return res.status(200).json({
            ens,
            avatar: avatar_url
        })
    } catch (e) {
        res.status(400).json({ error: e })
    }
}