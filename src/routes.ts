import HomePage from "./pages/HomePage";
import { HOME_ROUTE } from "./utils/consts";

interface IRoute {
  path: string;
  Component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
];
