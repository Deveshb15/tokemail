import { NextComponentType, NextPageContext } from "next";
import React, { useState } from "react";
import Header from "./Header";
import ShareModal from "../ShareModal/ShareModal";
import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";

const Layout = ({ children }: { children: React.JSX.Element }) => {
  const [share, setShare] = useState(false);
  const router = useRouter();
  return (
    <div className={clsx(router.pathname != "/" && "md:pt-10")}>
      <Head>
        <title>HigherLink - Onboard your friends OnChain with $HIGHER</title>
        <meta
          property="og:title"
          content="HigherLink - Onboard your friends OnChain with $HIGHER"
        />
        <meta
          property="og:description"
          content="Quickest way to onboard someone to $HIGHER through gift cards."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/metapass/image/upload/v1712672458/p6vwimsibltvxzsrkfjk.png"
        />
      </Head>
      {router.pathname != "/" && router.pathname != "/claim" && (
        <div className={clsx("md:px-28", share && "blur-md")}>
          <Header setShare={setShare} />
        </div>
      )}

      {share && (
        <div className="absolute inset-x-0 inset-y-0 z-50 flex justify-center items-center py-32">
          <ShareModal setShare={setShare} />
        </div>
      )}

      <div className={clsx(share && "blur-md")}>{children}</div>
    </div>
  );
};

export default Layout;
