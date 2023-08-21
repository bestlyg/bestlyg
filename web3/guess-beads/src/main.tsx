import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/app";

const dom = document.createElement("div");
document.body.appendChild(dom);

const container = createRoot(dom);

container.render(<App />);
