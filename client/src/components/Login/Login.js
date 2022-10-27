import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/users/login",
          {
            ...values,
          },
          { withCredentials: true }
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user.username);
        });
      navigate("/", { state: { loggedInfo: "Pomyślnie Zalogowano" } });
    } catch (e) {
      if (e.response.status === 400) {
        toast.error("Nieprawidłowy login lub hasło!");
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <div className="login-content">
        <form className="login-content__form" onSubmit={(e) => loginSubmit(e)}>
          <div className="login-content__form--back">
            <Link className="login-content__form--back-button" to={{ pathname: "/" }}>
              Powrót
            </Link>
          </div>
          <h2>Zaloguj się</h2>
          <label htmlFor="email">E-mail</label>
          <input
            className="login-content__form--input"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            required
          />
          <label htmlFor="password">Podaj hasło</label>
          <input
            className="login-content__form--input"
            type="password"
            placeholder="Podaj hasło"
            name="password"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            required
          />

          <button className="login-content__form--submit" type="submit">
            Zaloguj
          </button>
          <div>
            Nie posiadasz konta?
            <Link className="register-content__form--back-button" to={{ pathname: "/register" }}>
              {" "}Zarejestruj się
            </Link>
          </div>
        </form>
        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </>
  );
}

export default Login;
