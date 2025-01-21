import { managementRoute, ledgerListRoute, weightsRoute } from "@/routes";
import { Outlet, Navigate } from "@tanstack/react-router";

export function Management() {
  const search = managementRoute.useSearch();
  switch (search.p) {
    case ledgerListRoute.fullPath:
      return <Navigate to={ledgerListRoute.fullPath} />;
    case weightsRoute.fullPath:
      return <Navigate to={weightsRoute.fullPath} />;
  }
  return <Outlet />;
}
