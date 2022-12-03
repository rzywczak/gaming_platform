import React, { useState } from "react";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./HowToPlay.scss";

import gameOne from "../../../img/instrucion/game_1.png";
import gameTwo from "../../../img/instrucion/game_2.png";
import gameThree from "../../../img/instrucion/game_3.png";
import gameFour from "../../../img/instrucion/game_4.png";
import gameFive from "../../../img/instrucion/game_5.png";

function HowToPlay() {
  let [page, setPage] = useState(1);
  const previous = -1;
  const next = 1;

  const instructionImageChange = (p, e) => {
    e.preventDefault();
    setPage(page + p);
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="instruction">
          {page === 1 && <img src={gameOne} alt="gameOneImg"></img>}
          {page === 2 && <img src={gameTwo} alt="gameTwoImg"></img>}
          {page === 3 && <img src={gameThree} alt="gameThreeImg"></img>}
          {page === 4 && <img src={gameFour} alt="gameFourImg"></img>}
          {page === 5 && <img src={gameFive} alt="gameFiveImg"></img>}
          <div className="instruction__buttons">
            {page !== 1 && (
              <button className="instruction__buttons--button" onClick={(e) => instructionImageChange(previous, e)}>
                &#10094;
              </button>
            )}
            {page !== 5 && (
              <button className="instruction__buttons--button" onClick={(e) => instructionImageChange(next, e)}>
                &#10095;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
}

export default HowToPlay;
