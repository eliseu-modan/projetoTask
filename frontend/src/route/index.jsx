import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteCustom } from "./components";
import { flatRoutes } from "./utils";
import routes from "./routes";

function RouterNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        {flatRoutes(routes)
          .filter((route) => !route.isFake)
          .map((route, i) => (
            <Route
              key={String(i)}
              path={route.path}
              element={<RouteCustom {...route} />}
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default RouterNavigation;
