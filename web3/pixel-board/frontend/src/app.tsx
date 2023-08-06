import React, { useEffect, useState } from "react";
import { Wallet, CONTRACT_ADDRESS } from "@/utils";
import { Context } from "@/context";
import { SignInPrompt, SignOutButton } from "@/components/wallet";
import { Spin } from "antd";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
    setWallet(wallet);
    wallet.startUp().then((res) => {
      setIsSignedIn(res);
    });
  }, []);
  const providerValue = {
    wallet,
    isSignedIn,
  };
  console.log("providerValue", providerValue);
  return (
    <Context.Provider value={providerValue}>
      {isSignedIn ? (
        <>
          <SignOutButton />
        </>
      ) : (
        <>
          <SignInPrompt />
        </>
      )}
    </Context.Provider>
  );
}
