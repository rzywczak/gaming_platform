import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axiosAuth from "../../services/axiosAuth";
import "./MainPage.scss";
import JoinGame from "./JoinGame/JoinGame";
import Logo from "../../img/logo.png"

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
  const [userName, setUserName] = useState('');

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
           const {data} =await axios.get(`/api/users/:id`, { headers: axiosAuth() });
          setUserName(data.username)
          setLogged(true);
          setIsLoading(true)
          // if(loggedInfoUser!==undefined&&loggedInfoUser!==null){
          // toast.success(loggedInfoUser)
          // setLoggedInfoUser(null)
          // useLocation.setState(null)
          // }
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
  }, [navigate]);

  const logOut = async () => {
    try {
     await axios.get(`/api/users/logout`, { headers: axiosAuth() });
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    } catch (e) {
      console.log(e);
    }

    setLogged(false);
    navigate("/login");
    // setLoggedInfoUser(true)
  };

  return (
    <div>
    {isLoading && 
    <div>
    <div> 
    
    </div>
    <div>
    <div> 
    
      {/* <div className="centered-form">
        <div className="centered-form__box"> */}

          {logged === false ? (
              <div className="centered-form">
              <div className="centered-form__box">
              <Link to={{ pathname: "/register" }}>
                <button>Rejestracja</button>
              </Link>
              <Link to={{ pathname: "/login" }}>
                <button>Logowanie</button>
              </Link>
            </div>
            </div>
            
          ) : (
            <div>
            <div className="nav">
            <Link to={{ pathname: "/" }}>
              <img className="header__logo" src={Logo} alt="Platforma Rozrywkowa"></img>
           </Link>
            <div className="logout-info">
            <div>Użytkownik {userName}</div>
            <button onClick={logOut}>Wyloguj się</button>
            </div>
            </div>
            <div className="centered-form">
              <div className="centered-form__box">
            <JoinGame fromMainPage={true} />
            </div>
            <div className="centered-form__box">
            <h1>Wybierz grę</h1>
           
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
           
              <ToastContainer  position="bottom-right" theme="colored"/>
              </div>
            </div>
            </div>
          
          )}
        </div>
      
      </div>
      </div>
    }
      {/* wyświetlanie dostępnnych pokoji */}
      
    </div>
  );
}

export default MainPage;
