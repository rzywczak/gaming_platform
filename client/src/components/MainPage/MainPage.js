import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosAuth from "../../services/axiosAuth";
import "./MainPage.scss";

import Logo from "../../img/logo.png";
import Header from "./HomePage/Header/Header";
import MainContent from "./HomePage/MainContent/MainContent";
import Footer from "./HomePage/Footer/Footer";

function MainPage() {
  const navigate = useNavigate();
  // const { state } = useLocation()

  // if(state.loggedInfo!==null){
  //   const loggedInfo = state.loggedInfo
  // const [loggedInfoUser, setLoggedInfoUser] = useState(() => {if(state!==null)
  //   {
  //     console.log(state.loggedInfo)
  //     return(state.loggedInfo)}
  //   else{return(null)}})
  // }

  const [logged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const games = {
    ticTacToe: { 1: "ticTacToe", 2: "Kółko i krzyżyk" },
    paperStoneScissors: { 1: "paperStoneScissors", 2: "Papier, kamień i nożyce" },
    maze: { 1: "maze", 2: "Rozwiąż labirynt" },
    puns: { 1: "puns", 2: "Kalambury" },
    findAPair: { 1: "findAPair", 2: "Znajdź parę" },
  };
  // const [gameType, setGameType] = useState("");

  useEffect(() => {
    const authResult = axiosAuth();
    const verifyUser = async () => {
      if (authResult.Authorization !== null) {
        try {
          const { data } = await axios.get(`/api/users/:id`, { headers: axiosAuth() });
          setUserName(data.username);
          setLogged(true);
          setIsLoading(true);
          // if(loggedInfoUser!==undefined&&loggedInfoUser!==null){
          // toast.success(loggedInfoUser)
          // setLoggedInfoUser(null)
          // useLocation.setState(null)
          // }
        } catch (e) {
          console.log(e);
        }
      } else {
        setLogged(false);
        setIsLoading(true);
        // navigate('/login')
      }
    };

    verifyUser();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.get(`/api/users/logout`, { headers: axiosAuth() });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    } catch (e) {
      console.log(e);
    }

    setLogged(false);
    // navigate("/login");
    // setLoggedInfoUser(true)
  };

  return (
    <div>
      {isLoading && (
        <div>
          <div>
            <Header logged={logged} logout={logout} userName={userName} />
            <MainContent logged={logged} games={games} />
            {/* <Footer logged={logged} /> */}
            <ToastContainer position="bottom-right" theme="colored" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
