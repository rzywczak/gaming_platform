import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from "react-router-dom";




function Register() {

  // const [username, setUsername] = store.useState("username");
  const token =  localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/game-page");
    }
  }, [token, navigate]);

  const [values, setValues] = useState({ username: "", email: "", password: "" });


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
        // console.log(response)
         localStorage.setItem("token", response.data.token);
         localStorage.setItem('username', response.data.user.username);
       })
       navigate("/game-page" , { state: { loggedInfo: 'Pomyślnie Zalogowano'}});
     } catch(e) {
      console.log(e)
      if(e.response.status===400){
        toast.error('Podana nazwa użytkownika lub email jest już w użyciu!')
        }
        else{
        toast.error(e.message)
        }

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
            Posiadasz już konto? <Link to={{pathname: '/login'}} > Zaloguj się</Link>
          </span>
        </form>
        <ToastContainer  position="bottom-right" theme="colored"/>
      </div>
      </div>
    </>
  );
}

export default Register;
