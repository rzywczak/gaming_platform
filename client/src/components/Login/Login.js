import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });


  const loginSubmit = async (e) => {
    e.preventDefault();
     try {
       await axios.post(
        "http://localhost:5000/api/users/login",
        {
          ...values,
        },
        { withCredentials: true }
      ).then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('username', response.data.user.username);
      })
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
  }



  return (
    <div className="centered-form">
          <div className="centered-form__box">
    <h2>Log to your Account</h2>
    <form onSubmit={(e) => loginSubmit(e)}>
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
      <button type="submit">Zaloguj się</button>
      <span>
        Nie masz konta?<Link to={{pathname: '/register'}} >Zarejestruj się</Link>
      </span>
    </form>
    <ToastContainer />
  </div>
  </div>
  )
}

export default Login