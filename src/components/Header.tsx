import { FC, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DIARY_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASS_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "../index";
import { AppBar, Button, Box, Link, Toolbar, Typography } from "@mui/material";

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
          className="header"
          style={{
            background: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #b6b6b6",
          }}
          position="static"
        >
          <Toolbar className="header__toolbar">
            <Link
              className="nav__link nav__link-mr"
              href={HOME_ROUTE}
              color="#000"
              underline="none"
              // style={{ marginRight: "auto" }}
            >
              <Typography
                className="header__title"
                variant="h6"
                component="div"
              >
                Тренировка по жиму лежа
              </Typography>
            </Link>
            {user.isAuth && user.user ? (
              <div className="nav__wrapper">
                <Link
                  className="nav__link"
                  href={DIARY_ROUTE}
                  color="#000"
                  underline="none"
                >
                  Дневник
                </Link>
                <Button
                  style={{ color: "#000", marginLeft: 20 }}
                  onClick={exit}
                  variant="outlined"
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Button
                variant="outlined"
                style={{ color: "#000" }}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
});

export default Header;
