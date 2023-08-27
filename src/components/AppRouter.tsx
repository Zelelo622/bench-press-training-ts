import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;