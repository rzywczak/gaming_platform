import React from 'react'
import Header from '../HomePage/Header/Header'
import Footer from '../HomePage/Footer/Footer'
import "./About.scss"

function About() {
  return (
    <>
    <Header />
    <div className="main-content-about">
    <h1 className="main-content-about__title">Użyte technologie</h1>
    
 
    <ul className="main-content-about__list">
        <li className="main-content-about__list--item">
        <h2>Język programowania: JavaScript</h2>
        </li>
        <li className="main-content-about__list--item">
        <h2>Serwer: Node.js / Express</h2>
        </li>
        <li className="main-content-about__list--item">
        <h2>Klient: React</h2>
        </li>
        <li className="main-content-about__list--item">
        <h2>Baza Danych: MongoDB</h2>
        </li>
        <li className="main-content-about__list--item">
        <h2>Komunukajca w czasie rzeczywistym: Socket.io</h2>
        </li>
        
    </ul>
   

    </div>
    {/* <Footer/> */}
    </>
  )
}

export default About