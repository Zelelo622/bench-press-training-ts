import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/reset.css";
import App from "./App";
import UserStore from "./store/UserStore";

export const AppContext = React.createContext<any>(null);

const AppContexts = {
  user: new UserStore(),
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppContext.Provider value={AppContexts}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContext.Provider>
);
