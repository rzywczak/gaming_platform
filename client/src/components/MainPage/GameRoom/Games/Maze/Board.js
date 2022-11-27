import React, { useEffect, useState } from "react";
import generator from "generate-maze";
import finishLinePng from "../../../../../img/finishLine.png"


function Board( {props}) {


  const generateStyle = (item) => {
    if (item.top && item.right && item.bottom && item.left) {
      return {
        borderTop: "5px solid",
        borderRight: "5px solid",
        borderBottom: "5px solid",
        borderLeft: "5px solid",
      };
    }
    if (item.top && item.right && item.bottom) {
      return {
        borderTop: "5px solid",
        borderRight: "5px solid",
        borderBottom: "5px solid",
      };
    }
    if (item.top && item.right && item.left) {
      return {
        borderTop: "5px solid",
        borderRight: "5px solid",

        borderLeft: "5px solid",
      };
    }
    if (item.top && item.bottom && item.left) {
      return {
        borderTop: "5px solid",
        borderBottom: "5px solid",

        borderLeft: "5px solid",
      };
    }
    if (item.right && item.bottom && item.left) {
      return {
      
        borderRight: "5px solid",
        borderBottom: "5px solid",
        borderLeft: "5px solid",
      };
    }
    if (item.top && item.right) {
      return {
        borderTop: "5px solid",
        borderRight: "5px solid",
      };
    }
    if (item.top && item.bottom) {
      return {
        borderTop: "5px solid",
        borderBottom: "5px solid",
      };
    }
    if (item.top && item.left) {
      return {
        borderTop: "5px solid",
        borderLeft: "5px solid",
      };
    }
    if (item.bottom && item.left) {
      return {
        borderBottom: "5px solid",
        borderLeft: "5px solid",
      };
    }
    if (item.bottom && item.right) {
      return {
        borderBottom: "5px solid",
        borderRight: "5px solid",
      };
    }
    if (item.left && item.right) {
      return {
        borderLeft: "5px solid",
        borderRight: "5px solid",
      };
    }
    if (item.top) {
      return {
        borderTop: "5px solid",
      };
    }
    if (item.right) {
      return {
        borderRight: "5px solid",
      };
    }
    if (item.bottom) {
      return {
        borderBottom: "5px solid",
      };
    }
    if (item.left) {
      return {
        borderLeft: "5px solid",
      };
    }
    if (item) {
      return {};
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="board">
   
      <div className="board__maze" onKeyDown={ async (e) => {await delay(150);props.playerMove(e)}} tabIndex="0" style={{ position: "absolute" }}>
        {props.loadedDataMaze === true
          ? props.generatedMaze.map((item) => (
              <div style={generateStyle(item)} className="board__maze--item" key={item.key}>
                {/* {item.x},{item.y} */}
                {item.x === props.cords[0] && item.y === props.cords[1] ? (
                <div className="board__maze--item--avatar" id="avatar-p1"><svg id="avatar-p1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path id="avatar-p1" d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM152 352V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg></div>
                ) : null}
                {item.x === props.cordsPlayer2[0] && item.y === props.cordsPlayer2[1] ? (
                <div className="board__maze--item--avatar" id="avatar-p2"><svg id="avatar-p2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path id="avatar-p2" d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM152 352V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg></div>
                ) : null}
                {item.x === props.finishLine[0] && item.y === props.finishLine[1] ? (
                <img src={finishLinePng} alt='X' className="board__maze--item--finish-line"></img>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Board;
