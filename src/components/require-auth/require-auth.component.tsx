import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";
import useRecoveryStore from "store/recovery/recovery.store";

export function RequireAuth() {
  const location = useLocation();

  const { accountDetails } = useRecoveryStore(
    (state: any) => state
  );

  const isMock: boolean = true;

  const isSignedIn: boolean = accountDetails.provider;

  return isSignedIn ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePath.login} state={{ from: location }} replace />
  );
}
