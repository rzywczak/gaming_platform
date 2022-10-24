import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createStore } from 'state-pool';





function Register() {

  // const [username, setUsername] = store.useState("username");
  const token =  localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [values, setValues] = useState({ username: "", email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const registerSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
         "/api/users",
         {
           ...values,
         },
         { withCredentials: true }
       ).then((response) => {
         localStorage.setItem("token", response.data.token);
         localStorage.setItem('username', response.data.user.username);
       })
       navigate("/");
     } catch (e) {
       console.log(e);
     }
    };

  return (
    <>
          <div className="centered-form">
          <div className="centered-form__box">
       
        <form onSubmit={(e) => registerSubmit(e)}>
          <div>
          <h2>Zarejestruj się</h2>
            <label htmlFor="text">Nazwa użytkownika</label>
            <input
              type="text"
              name="username"
              placeholder="Nazwa użytkownika"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              required />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              required />
          </div>
          <div>
            <label htmlFor="password">Podaj hasło</label>
            <input
              type="password"
              placeholder="Podaj hasło"
              name="password"
              onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              required/>
          </div>
          <button type="submit">Zarejestruj</button>
          <span>
            Posiadasz już konto?<Link to={{pathname: '/login'}} >Zaloguj się</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
      </div>
    </>
  );
}

export default Register;
