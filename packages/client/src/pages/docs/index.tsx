import { useEffect } from "react";
import { fetch } from "@bestlyg/common/idl/utils";
import React from "react";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { Suspense } from "@/components/suspense";
import { Markdown } from "@/components/markdown";
import { docsRoute } from "@/routes";
import { useAtomValue } from "jotai";
import { findFirstSidebarItem, sidebarPromiseAtom } from "@/utils";

async function fetchReadableStaticFile(p?: string): Promise<string | null> {
  if (!p) return null;
  const data = await fetch({
    url: "/static",
    method: "get",
    data: { p, r: "true" },
    serializer: "json",
  });
  return data;
}

function Doc({
  promise,
}: {
  promise: ReturnType<typeof fetchReadableStaticFile>;
}) {
  const md = React.use(promise);
  if (!md) <>UNAME</>;
  return <Markdown md={md ?? ""} />;
}

function DocsSkeleton() {
  const item = (
    <div className="flex flex-col space-y-3 px-[20px] py-[10px]">
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </div>
  );
  return (
    <div className="mt-[40px]">
      {item}
      {item}
      {item}
    </div>
  );
}

export function Docs() {
  const search = docsRoute.useSearch();
  const navigate = docsRoute.useNavigate();
  const [promise, setPromise] = React.useState(() =>
    fetchReadableStaticFile(search.p)
  );
  const { sidebarPromise } = useAtomValue(sidebarPromiseAtom);
  useEffect(() => {
    if (!search.p) {
      sidebarPromise?.then((sidebars) => {
        navigate({
          search: { p: findFirstSidebarItem(sidebars.groups)?.link },
        });
      });
    } else {
      setPromise(() => fetchReadableStaticFile(search.p));
    }
  }, [search.p]);
  return search.p ? (
    <Suspense fallback={<DocsSkeleton />} promise={promise} Component={Doc} />
  ) : (
    <>INDEX</>
  );
}
