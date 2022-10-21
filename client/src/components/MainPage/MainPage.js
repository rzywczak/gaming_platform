import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import axiosAuth from "../../services/axiosAuth";
import "./MainPage.scss";

function MainPage() {
 
  const navigate = useNavigate();

  const [logged, setLogged] = useState(false);
  const games = {

    'ticTacToe': { 1: 'ticTacToe', 2: 'Kółko i krzyżyk'},
    'paperStoneScissors': { 1: 'paperStoneScissors', 2: 'Papier, kamień i nożyce'},
    'maze': { 1:'maze', 2:'Rozwiąż labirynt'},
    'puns': {1: 'puns',2: 'Kalambury'},
    'findAPair': { 1: 'findAPair',2: 'Znajdź parę'},

  }
  // const [gameType, setGameType] = useState("");


  useEffect(() => {
    const authResult = axiosAuth();
    const verifyUser = async () => {
      if (authResult.Authorization !== null) {
        try {
           await axios.get(`http://localhost:5000/api/users/:id`, { headers: axiosAuth() });
          // console.log(data);
          setLogged(true);
        } catch (e) {
          console.log(e);
        }
      }
      else {
        setLogged(false);
        navigate('/login')
      }
    };

    verifyUser();
  }, []);

  const logOut = async () => {
    try {
     await axios.get(`http://localhost:5000/api/users/logout`, { headers: axiosAuth() });
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    } catch (e) {
      console.log(e);
    }

    setLogged(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="centered-form">
        <div className="centered-form__box">
          <h1>Wybierz grę</h1>
          {/* {console.log(store.useState('username'))} */}
          {logged === false ? (
            <div>
              <Link to={{ pathname: "/register" }}>
                <button>Rejestracja</button>
              </Link>
              <Link to={{ pathname: "/login" }}>
                <button>Logowanie</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={{ pathname: "/join-game" }} state={{ gameType: games.ticTacToe}}>
                  <button>{games.ticTacToe[2]}</button>
              </Link>
              <Link to={{ pathname: "/join-game" }} state={{ gameType: games.paperStoneScissors}}>
                <button>{games.paperStoneScissors[2]}</button>
              </Link>
              <Link to={{ pathname: "/join-game" }} state={{ gameType: games.findAPair}}>
                <button>{games.findAPair[2]}</button>
              </Link>
              <Link to={{ pathname: "/join-game" }} state={{ gameType: games.puns }}>
                <button>{games.puns[2]}</button>
              </Link>
              <Link to={{ pathname: "/join-game" }} state={{ gameType: games.maze}}>
                <button>{games.maze[2]}</button>
              </Link>
            </div>
          )}
        </div>
        <div>
          <button onClick={logOut}>Wyloguj się</button>
        </div>
      </div>

      {/* wyświetlanie dostępnnych pokoji */}
    </div>
  );
}

export default MainPage;
