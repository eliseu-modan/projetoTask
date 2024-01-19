import { Navigate } from "react-router-dom";
import { useAuthentication } from "../contexts/authentication";
import { ERROR_PAGES, ROUTE_PRIVATE_ROOT_PATH } from "../route/constants";

import PrivateLayout from "./Private";
import PublicLayout from "./Public";

import "./index.css";

function LayoutProvider({ route, ...props }) {
  const { authData, accessToken } = useAuthentication();

  if (route?.layout === "private") {
    if (
      (route.roles?.length &&
        !route.roles.includes(authData?.user?.role || "")) ||
      !accessToken
    ) {
      return <Navigate to="/403" />;
    }

    return <PrivateLayout {...props} route={route} />;
  }

  const isPageError = Object.values(ERROR_PAGES).some(
    (value) => value === route.path
  );

  if (!isPageError && route.redirectAuth && accessToken) {
    return <Navigate to={ROUTE_PRIVATE_ROOT_PATH} />;
  }

  if (route?.layout === "custom") {
    if (!route.layoutComponent) {
      throw new Error(
        `É necessário informar um layoutComponent para a rota "${route.path}"`
      );
    }

    const { layoutComponent: LayoutComponent } = route;

    return <LayoutComponent {...props} route={route} />;
  }

  return <PublicLayout {...props} route={route} />;
}

export { default as PublicLayout } from "./Public";
export { default as PrivateLayout } from "./Private";

export default LayoutProvider;
