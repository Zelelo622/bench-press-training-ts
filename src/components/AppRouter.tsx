import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AppContext } from "..";

const AppRouter = observer(() => {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
});

export default AppRouter;
