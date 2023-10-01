import { sendPasswordResetEmail } from "firebase/auth";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/FirebaseConfig";
import { HOME_ROUTE } from "../utils/consts";

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
    <div className="resetPass">
      <div className="container">
        <div className="resetPass__inner">
          <h1 className="resetPass__title">Восстановление пароля</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="resetPass__form">
            <input
              type="email"
              name="email"
              className="resetPass__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="resetPass__btn">Сбросить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
