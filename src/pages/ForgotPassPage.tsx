import { sendPasswordResetEmail } from "firebase/auth";
import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/FirebaseConfig";
import { HOME_ROUTE } from "../utils/consts";
import { Button } from "@mui/material";

const ForgotPassPage: FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailVal = email;
    sendPasswordResetEmail(auth, emailVal)
      .then((data) => {
        alert("Проверьте свою почту");
        navigate(HOME_ROUTE);
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="registration__card">
          <NavLink to={HOME_ROUTE} className="link-back">
            Назад
          </NavLink>
          <div className="registration__title">Восстановление пароля</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="registration__form"
          >
            <input
              type="email"
              name="email"
              className="registration__input registration__input-forgot"
              placeholder="Введите ваш email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="btnForgotWrapper">
              <Button
                variant="contained"
                color="success"
                className="registration__btn registration__btn-forgot"
              >
                Сбросить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
