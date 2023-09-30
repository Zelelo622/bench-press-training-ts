import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FC, useContext, useState } from "react";
import { auth } from "../config/FirebaseConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "..";

const AuthPage: FC = observer(() => {
  const { user } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          <h2 className="registration__title">
            {isLogin ? "Авторизация" : "Регистрация"}
          </h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="registration__form"
          >
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
            <div className="registration__row">
              {isLogin ? (
                <div>
                  Нет аккаунта?{" "}
                  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              ) : (
                <div>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
              )}
              <button>{isLogin ? "Войти" : "Регистрация"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AuthPage;
