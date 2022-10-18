import React,{ useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {createStore} from 'state-pool';
import axiosAuth from '../../services/axiosAuth'
import "./MainPage.scss";



function MainPage () {

  const [gameType, setGameType] = useState('1')
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState();

  

  useEffect(() => {
    

    console.log(axiosAuth())
    const verifyUser = async () => {

        try {
          const { data } = await axios.get(`http://localhost:5000/api/users/:id`,{headers: axiosAuth()});
          console.log(data)
          setLogged(true)
        }
        catch{
          
        }
       
    }
       

   

    verifyUser();

  }, []);

  const logOut = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/users/logout`,{headers: axiosAuth()});
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    console.log(data)
    console.log('test')
    setLogged(false)
    navigate("/login");
  };




    return (
      <div>
        <div className="centered-form">
          <div className="centered-form__box">
            <h1>Wybierz grę</h1>
            {/* {console.log(store.useState('username'))} */}
            {logged === false ? 
            <div>
            <Link to={{pathname: '/register'}}  ><button>Rejestracja</button></Link> 
            <Link to={{pathname: '/login'}}  ><button>Logowanie</button></Link> 
            </div>
            :
            <div>
            <Link to={{pathname: '/join-game'}} state={{ gameType:'1', username: username}}><button>Kółko i krzyżyk</button></Link> 
            <Link to={{pathname: '/join-game'}} state={{ gameType: '2', username: username}} ><button >Papier, kamień i nożyce</button></Link> 
            <Link to={{pathname: '/join-game'}} state={{ gameType: '3', username: username}} ><button >Rozwiąż labirynt</button></Link> 
            <Link to={{pathname: '/join-game'}} state={{ gameType: '4', username: username}} ><button >Kalambury</button></Link> 
            <Link to={{pathname: '/join-game'}} state={{ gameType: '5',  username: username}} ><button>Znajdź parę</button></Link> 
            </div>
            }
          </div>
          <div>
            <button onClick={logOut}>Wyloguj się</button></div>
        </div>



        {/* wyświetlanie dostępnnych pokoji */}
      </div>
    );
 
}

export default MainPage;
