import * as React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
  Hr
} from "@react-email/components";
import { TOKEN_NAME } from "@/lib/utils";

export function Email({
  uid,
  note,
  seed,
  amount,
  symbol
}: {
  uid: string;
  note?: string;
  seed: string;
  amount: number;
  symbol: string;
}) {
  return (
    <Html>
      <Head />
      <Body>
        <Container style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>
          <Section
            style={{
              width: "100%",
              backgroundColor: "blue",
              backgroundSize: "cover",
            }}
          >
            <Text
            className="font-sora"
              style={{
                color: "white",
                textAlign: "center",
                fontFamily:"Sora",
                fontWeight: "bold",
                fontSize: "1.5rem",
                lineHeight: "2.5rem",
                paddingTop: "2rem",
              }}
            >
              tokemail
            </Text>
            <Heading
              as="h2"
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Cabinet,monospace",
                fontSize: "2rem",
                lineHeight: "2.5rem",
                letterSpacing: "-0.025em",
                marginTop: "2.5rem",
                padding: "0 4rem 4rem 4rem",
              }}
            >
              Your Onchain journey begins today.
            </Heading>
          </Section>
          <Section
            style={{
              padding: "3rem 2rem",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#33106D",
                textAlign: "center",
                fontSize: "1.125rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
              }}
            >
              Hey 👋
            </Text>
            <Text
              style={{
                color: "#33106D",
                textAlign: "center",
                fontSize: "1.125rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "150%",
                marginBottom: "2rem",
              }}
            >
              You just received {amount} ${symbol}
            </Text>
            {note && (
              <Text
                style={{
                  color: "#121212",
                  fontSize: "1rem",
                  lineHeight: "120%",
                  fontWeight: "normal",
                  textAlign: "center",
                  padding: "1.5rem 2rem",
                  margin: "0 2rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "#EEE",
                }}
              >
                {note}
              </Text>
            )}
            <Section style={{}}>
              <Section
                style={{
                  maxWidth: "18rem",
                  marginBottom: "2rem",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "1.125rem",
                    lineHeight: "150%",
                    marginBottom: "2rem",
                  }}
                >
                  Now, Click the below link to Claim your tokens.
                </Text>
                <Link
                  href={`https://tokemail.xyz/claim?uid=${uid}`}
                  style={{
                    textDecoration: "none",
                    padding: "1rem 2rem",
                    backgroundColor: "#0934FF",
                    color: "white",
                    border: "none",
                    borderRadius: "0.75rem",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                >
                  Claim Tokens
                </Link>
              </Section>
            </Section>
          </Section>
        <Section style={paddingY} className="bg-black h-10">
          <Row>
            <Text style={footer.text}>
            From the House of FBI (Farcaster Builders India)
                        </Text>
          </Row>
          
        </Section>

        </Container>
      </Body>
    </Html>
  );
}
const footer = {

  policy: {
    width: "166px",
    margin: "auto",
    backgroundColor: "black",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};

const paddingY = {
  paddingTop: "44px",
  paddingBottom: "22px",
  backgroundColor: "black",
};


export default Email;
