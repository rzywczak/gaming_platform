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


  return (
    <div className="board">
   
      <div className="board__maze" onKeyDown={(e) => props.playerMove(e)} tabIndex="0" style={{ position: "absolute" }}>
        {props.loadedDataMaze === true
          ? props.generatedMaze.map((item) => (
              <div style={generateStyle(item)} className="board__maze--item" key={item.key}>
                {/* {item.x},{item.y} */}
                {item.x === props.cords[0] && item.y === props.cords[1] ? (
                <div className="board__maze--item--avatar" id="avatar-p1"></div>
                ) : null}
                {item.x === props.cordsPlayer2[0] && item.y === props.cordsPlayer2[1] ? (
                <div className="board__maze--item--avatar" id="avatar-p2"></div>
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
