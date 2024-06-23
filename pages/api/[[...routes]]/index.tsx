/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource frog/jsx */
/* eslint-disable react/jsx-key */

import { getBalance } from "@wagmi/core";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { formatEther, parseEther } from "viem";
import axios from "axios";
import { neynar } from "frog/middlewares";
import { TOKEN_NAME, abi } from "@/lib/utils";
import { english, generateMnemonic, mnemonicToAccount } from "viem/accounts";
import { supabase } from "@/lib/supabase";
import { v4 } from "uuid";

import { Resend } from "resend";
import { config } from "@/lib/config";
import Email from "@/components/Emailer/Email";

const resend = new Resend(process.env.RESEND_API_KEY);

const neynarMiddleware = neynar({
  apiKey: process.env.NEYNAR_API_KEY!,
  features: ["interactor", "cast"],
});

type State = {
  amount: string;
  note: string;
  email: string;
};

const app = new Frog<{ State: State }>({
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
  initialState: {
    amount: "",
    note: "Welcome to the other side my fren, enjoy the $HIGHER",
    email: "",
  },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = "edge";

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          padding: "4rem 0",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 36,
            fontStyle: "normal",
            fontWeight: "bold",
            letterSpacing: "-0.05em",
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            fontFamily: "Space Mono, monospace",
            textShadow: "0px 4px 0px #9261E1",
          }}
        >
          $DEGENLINK
        </p>
        <p
          style={{
            color: "white",
            fontSize: 80,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "4rem",
            fontFamily: "Space Mono, monospace",
            textShadow: "0px 4px 0px #9261E1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ marginBottom: "-1rem" }}>Onboard your </span>
          <span style={{ marginBottom: "-1rem" }}>Friends OnChain with </span>
          <span style={{ color: "#C898E6" }}>$DEGEN</span>
        </p>
      </div>
    ),
    intents: [
      <Button action="/balance" value="balance">
        Check Balance
      </Button>,
      <Button action="/gift" value="gift">
        Gift ${TOKEN_NAME}
      </Button>,
    ],
  });
});

app.frame("/balance", neynarMiddleware, async (c) => {
  const { verifiedAddresses } = c.var.interactor || {};
  const firstEthAddress = verifiedAddresses?.ethAddresses[0];
  const balance = await getBalance(config, {
    address: firstEthAddress as `0x${string}`,
  });

  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    }
  );

  const rate = data["ethereum"].usd;

  return c.res({
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          padding: "4rem 0",
        }}
      >
        <p
          style={{
            color: "#C898E6",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            fontSize: 40,
          }}
        >
          Wallet Balance
        </p>
        <p
          style={{
            color: "white",
            textShadow: "0px 4px 0px #9261E1",
            fontWeight: "700",
            fontSize: "7rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {balance ? formatEther(balance.value).slice(0, 6) : 0}
          <img
            src="https://res.cloudinary.com/dczghbro7/image/upload/v1713704724/Ethereum-ETH-icon_szokdg.png"
            height="48"
            width="48"
            alt="Eth Logo"
            style={{ marginLeft: "8px" }}
          />
        </p>
        <p
          style={{
            color: "white",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
            display: "flex",
            alignItems: "center",
            fontSize: 40,
          }}
        >
          = $
          {balance &&
            rate &&
            (rate * Number(formatEther(balance.value))).toFixed(4)}
        </p>
      </div>
    ),
    intents: [
      <Button action="/balance" value="balance">
        Check Balance
      </Button>,
      <Button action="/gift" value="gift">
        Gift ${TOKEN_NAME}
      </Button>,
    ],
  });
});

app.frame("/gift", neynarMiddleware, async (c) => {
  const { verifiedAddresses } = c.var.interactor || {};
  const firstEthAddress = verifiedAddresses?.ethAddresses[0];
  const balance = await getBalance(config, {
    address: firstEthAddress as `0x${string}`,
  });

  return c.res({
    action: "/note",
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 80,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "4rem",
            fontFamily: "Space Mono, monospace",
            textShadow: "0px 4px 0px #9261E1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ margin: "-2rem 0" }}>Enter Amount to</span>
          <span style={{ color: "#C898E6" }}>GIFT</span>
        </p>
        <p
          style={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            fontSize: 40,
            marginTop: "-4rem",
          }}
        >
          Balance : {balance ? formatEther(balance.value).slice(0, 6) : 0} HIGHER
        </p>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter HIGHER to send" />,
      <Button value="1000">1000</Button>,
      <Button value="2000">2000</Button>,
      <Button value="next">Next</Button>,
    ],
  });
});

app.frame("/note", (c) => {
  const { buttonValue, deriveState, inputText } = c;
  const state = deriveState((previousState) => {
    previousState.amount = inputText ? inputText : buttonValue || "";
  });
  return c.res({
    action: "/email",
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          color: "white",
          fontSize: 80,
          fontStyle: "normal",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
          padding: "4rem",
          fontFamily: "Space Mono, monospace",
          textShadow: "0px 4px 0px #9261E1",
        }}
      >
        {state.amount === "next" ? "AMOUNT CAN'T BE EMPTY" : "ADD A NOTE"}
      </div>
    ),
    intents: [
      <TextInput
        placeholder={state.amount === "next" ? "" : "Add a note (optional)"}
      />,
      <Button
        value="next"
        action={state.amount === "next" ? "/gift" : "/email"}
      >
        {state.amount === "next" ? "Go Back" : "Next"}
      </Button>,
    ],
  });
});

app.frame("/email", (c) => {
  const { deriveState, inputText } = c;
  deriveState((previousState) => {
    previousState.note = inputText || previousState.note;
  });
  return c.res({
    action: "/confirm",
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          color: "white",
          fontSize: 80,
          fontStyle: "normal",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
          padding: "4rem",
          fontFamily: "monospace",
          textShadow: "0px 4px 0px #9261E1",
        }}
      >
        WHO ARE YOU <span style={{ marginTop: "-2rem" }}>SENDING?</span>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter Recipients Email Address?" />,
      <Button value="next">Next</Button>,
    ],
  });
});

app.frame("/confirm", async (c) => {
  const { deriveState, inputText } = c;
  const state = deriveState((previousState) => {
    previousState.email = inputText || "";
  });

  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    }
  );

  const rate = data["ethereum"].usd;
  return c.res({
    action: "/success",
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          color: "white",
          padding: "4rem",
        }}
      >
        <p
          style={{
            fontSize: 80,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "4rem",
            fontFamily: "monospace",
            textShadow: "0px 4px 0px #9261E1",
          }}
        >
          Confirm
        </p>
        <p
          style={{
            color: "white",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            padding: "4rem",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            Sending{" "}
            <img
              src="https://res.cloudinary.com/dczghbro7/image/upload/v1713704724/Ethereum-ETH-icon_szokdg.png"
              height="48"
              width="48"
              alt="Eth Logo"
              style={{ margin: "0 8px" }}
            />
            ${state.amount} Worth $
            {rate && (Number(state.amount) * rate).toPrecision(6)} @ ${rate}
          </span>
          <span style={{ color: "#FFFFFF99", margin: "1.4rem 0" }}>
            {" "}
            + ~$0.02 gas
          </span>
          <span>TO</span>
          <span style={{ color: "#FFFFFF99", marginTop: "1rem" }}>
            {state.email}
          </span>
        </p>
      </div>
    ),

    intents: [
      <Button value="cancel" action="/">
        Cancel
      </Button>,
      <Button.Transaction target="/transaction">Confirm</Button.Transaction>,
    ],
  });
});

const seed = generateMnemonic(english, 256);
const account = mnemonicToAccount(seed).address;
const claim_uid = v4();

app.transaction("/transaction", async (c) => {
  const { previousState, address } = c;
  const { amount, email } = previousState;

  await supabase.from("tips").insert({
    sender: address,
    recipient: email,
    recipient_address: account,
    claimed: false,
    claim_uid,
    sender_hash: "",
    amount,
    chain: "8453",
  });

  return c.contract({
    abi,
    chainId: "eip155:8453",
    functionName: "addTip",
    args: [account],
    to: "0x55d6Da3732babC063bAa40FF4BbB53dCF113F265",
    value: parseEther(String(amount)),
  });
});

app.frame("/success", async (c) => {
  const { previousState, transactionId } = c;
  const { amount, email, note } = previousState;

  await supabase
    .from("tips")
    .update({
      sender_hash: transactionId,
    })
    .eq("claim_uid", claim_uid);

  await resend.emails.send({
    // from: "Degenlink <gm@degenlink.io>",
    from: "RESEND <onboarding@resend.io>",
    to: [email],
    subject: "You've been served some Eth",
    react: Email({ uid: claim_uid, seed, note, amount: Number(amount) }),
  });

  return c.res({
    action: "/gift",
    image: (
      <div
        style={{
          background:
            "url('https://res.cloudinary.com/dczghbro7/image/upload/v1713487283/background-min_gyx9kw.png')",
          backgroundColor: "#340B72",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          color: "white",
          padding: "4rem",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 80,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            fontFamily: "Space Mono, monospace",
            textShadow: "0px 4px 0px #9261E1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span> Successfully</span>
          <span style={{ color: "#C898E6", margin: "-1rem 0" }}>
            SENT {amount} $HIGHER
          </span>
        </p>
        <p
          style={{
            color: "white",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            marginTop: "-4rem",
          }}
        >
          <span>TO</span>
          <span style={{ color: "#FFFFFF99", marginTop: "1rem" }}>{email}</span>
        </p>
      </div>
    ),
    intents: [
      <Button.Link href={`https://basescan.org/tx/${transactionId}`}>
        View Transaction
      </Button.Link>,
      <Button value="next">Send Again</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export default handle(app);
