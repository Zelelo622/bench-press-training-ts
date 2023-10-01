import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASS_ROUTE,
} from "./utils/consts";

interface IRoute {
  path: string;
  Component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: RESET_PASS_ROUTE,
    Component: ForgotPassPage,
  },
];
