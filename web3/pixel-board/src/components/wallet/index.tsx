import { Button } from "antd";
import React, { useContext } from "react";
import { Context } from "@/context";

export function SignInPrompt() {
  const { wallet } = useContext(Context);
  return (
    <Button onClick={() => wallet.signIn()}>Sign in with NEAR Wallet</Button>
  );
}

export function SignOutButton() {
  const { wallet } = useContext(Context);
  return (
    <Button onClick={() => wallet.signOut()}>
      Sign out {wallet.accountId}
    </Button>
  );
}
