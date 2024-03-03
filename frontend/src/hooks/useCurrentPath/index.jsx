/**
 *
 * UseCurrentPath Hook
 *
 */

import { matchRoutes, useLocation } from "react-router-dom";
import routes from "../../route/routes";
import { flatRoutes } from "../../route/utils";

function useCurrentPath() {
  const location = useLocation();
  const [{ route }] = matchRoutes(flatRoutes(routes), location);

  return route.path;
}

export default useCurrentPath;
