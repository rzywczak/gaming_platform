import React,{useState, useEffect} from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const token =  localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

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
    } catch (e) {
      // console.log(e);
    }
  }



  return (
    <div className="centered-form">
          <div className="centered-form__box">

    <form onSubmit={(e) => loginSubmit(e)}>
      <div>
      <h2>Zaloguj się</h2>
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