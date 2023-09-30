import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./assets/styles/App.css";
import Header from "./components/Header";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { AppContext } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/FirebaseConfig";
import { CircularProgress } from "@mui/material";

const App: FC = observer(() => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        user.setUser(userAuth);
        user.setIsAuth(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress size={80} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
