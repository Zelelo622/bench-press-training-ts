import { FC, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASS_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "../index";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { inherits } from "util";

const Header: FC = observer(() => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin =
    location.pathname === LOGIN_ROUTE ||
    location.pathname === RESET_PASS_ROUTE ||
    location.pathname === REGISTRATION_ROUTE;

  const exit = () => {
    signOut(auth).then((val) => {
      console.log(val);
      user.setUser({});
      user.setIsAuth(false);
    });
  };

  if (isLogin) {
    return null;
  }

  return (
    <div className="container">
      <Box sx={{ flexGrow: 1 }} mb="20px">
        <AppBar
          style={{
            background: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #b6b6b6",
          }}
          position="static"
        >
          <Toolbar>
            <Link
              href={HOME_ROUTE}
              color="#000"
              underline="none"
              sx={{ flexGrow: 1 }}
            >
              <Typography variant="h6" component="div">
                Тренировка по жиму лежа
              </Typography>
            </Link>
            {user.isAuth && user.user ? (
              <Button style={{ color: "#000" }} onClick={exit}>
                Выйти
              </Button>
            ) : (
              <div>
                <Button
                  style={{ color: "#000" }}
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Авторизация
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
});

export default Header;
