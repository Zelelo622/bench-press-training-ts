import { FC, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "../index";

const Header: FC = observer(() => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const exit = () => {
    signOut(auth).then((val) => {
      console.log(val);
      navigate(LOGIN_ROUTE);
      user.setUser({});
      user.setIsAuth(false);
    });
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <NavLink to={HOME_ROUTE}>Лого</NavLink>
          {user.isAuth && user.user ? (
            <button onClick={exit}>Выйти</button>
          ) : (
            <div>
              <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
            </div>
          )}
        </div>
      </header>
    </>
  );
});

export default Header;
