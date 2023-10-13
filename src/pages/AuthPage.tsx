import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FC, useContext, useState } from "react";
import { auth } from "../config/FirebaseConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASS_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "..";
import { Button } from "@mui/material";

const AuthPage: FC = observer(() => {
  const { user } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          navigate(HOME_ROUTE);
        })
        .catch((err) => {
          alert(err.code);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          navigate(HOME_ROUTE);
        })
        .catch((err) => {
          alert(err.code);
        });
    }
    user.setUser(user);
    user.setIsAuth(true);
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="registration__card">
          <NavLink to={HOME_ROUTE} className="link-back">
            Главная
          </NavLink>
          <div className="registration__title">
            {isLogin ? "Авторизация" : "Регистрация"}
          </div>
          <form className="registration__form">
            <div className="registration__inputWrap">
              <input
                className="registration__input"
                placeholder="Введите ваш email..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="registration__input"
                placeholder="Введите ваш пароль..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="registration__rowWrap">
              {isLogin ? (
                <div>
                  <div className="registration__row">
                    Нет аккаунта?{" "}
                    <NavLink
                      className="registration__link"
                      to={REGISTRATION_ROUTE}
                    >
                      Зарегистрируйся!
                    </NavLink>
                  </div>
                  <div className="registration__row">
                    Забыли пароль?{" "}
                    <NavLink
                      className="registration__link"
                      to={RESET_PASS_ROUTE}
                    >
                      Восстановить
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div className="registration__row">
                  Есть аккаунт?{" "}
                  <NavLink className="registration__link" to={LOGIN_ROUTE}>
                    Войдите!
                  </NavLink>
                </div>
              )}
              <Button
                variant="outlined"
                color="success"
                className="registration__btn"
                onClick={(e) => handleSubmit(e)}
              >
                {isLogin ? "Войти" : "Регистрация"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AuthPage;
