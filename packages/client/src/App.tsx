import React from "react";
import { RouterProvider } from "@/routes";
import "@/shadcn/styles/globals.css";
import { hooks as fetchHooks, request } from "@bestlyg/common/idl/utils";
import { useToast } from "@/shadcn/hooks/use-toast";
import { Toaster } from "@/shadcn/ui/toaster";
import { ResponseEntity } from "@bestlyg/common/dist/types/response-entity.js";
import "github-markdown-css/github-markdown.css";
import "@ant-design/v5-patch-for-react-19";
import "@/styles/globals.css";
import { xTokenName } from "@/utils";

export default function App() {
  const { toast } = useToast();

  React.useEffect(() => {
    request.interceptors.request.use((config) => {
      const token = localStorage.getItem(xTokenName);
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    fetchHooks.onError.tapPromise(
      "onFetchErorr",
      async (entity: ResponseEntity<any>) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: entity.getMsg(),
        });
      }
    );
  }, []);

  return (
    <>
      <RouterProvider />
      <Toaster />
    </>
  );
}
