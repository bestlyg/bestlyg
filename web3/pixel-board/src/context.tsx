import React from "react";
import { Wallet } from "@/utils";

export const Context = React.createContext<{
  isSignedIn: boolean;
  wallet: Wallet;
}>({
  isSignedIn: false,
  wallet: null,
});
