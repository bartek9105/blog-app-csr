import Home from "../pages/Home";
import { routesPaths } from "./routesPaths.config";

export const routes = [
  {
    path: routesPaths.root(),
    element: <Home />,
  },
];
