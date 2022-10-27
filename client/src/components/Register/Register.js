import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Register.scss";

function Register() {
  // const [username, setUsername] = store.useState("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [values, setValues] = useState({ username: "", email: "", password: "" });

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/users",
          {
            ...values,
          },
          { withCredentials: true }
        )
        .then((response) => {
          // console.log(response)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user.username);
        });
      navigate("/", { state: { loggedInfo: "Pomyślnie Zalogowano" } });
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        toast.error("Podana nazwa użytkownika lub email jest już w użyciu!");
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <div className="register-content">
        <form className="register-content__form" onSubmit={(e) => registerSubmit(e)}>
          <div className="register-content__form--back">
            {" "}
            <Link className="register-content__form--back-button" to={{ pathname: "/" }}>
              Powrót
            </Link>
          </div>
          <h2>Zarejestruj się</h2>
          <label htmlFor="text">Nazwa użytkownika</label>
          <input
            className="register-content__form--input"
            type="text"
            name="username"
            placeholder="Nazwa użytkownika"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            required
          />
          <label htmlFor="email">E-mail</label>
          <input
            className="register-content__form--input"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            required
          />
          <label htmlFor="password">Podaj hasło</label>
          <input
            className="register-content__form--input"
            type="password"
            placeholder="Podaj hasło"
            name="password"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            required
          />
          <button className="register-content__form--submit" type="submit">
            Zarejestruj
          </button>
          <div>
            Posiadasz już konto?
            <Link className="register-content__form--back-button" to={{ pathname: "/login" }}>
            {" "}Zaloguj się
            </Link>
          </div>
        </form>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </>
  );
}

export default Register;
