import React, { useRef, useEffect, useState } from 'react';
import "./Puns.scss";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Board = (props) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);

  const color1Ref = useRef(null);
  const color2Ref = useRef(null);
  const color3Ref = useRef(null);
  const color4Ref = useRef(null);
  const color5Ref = useRef(null);

  const color7Ref = useRef(null);

  useEffect(() => {


   
    const drawing = async () => {
      await delay(200 )
    const canvas = canvasRef.current;
    // const colors = colorsRef.current;
      const color1 = color1Ref.current;
      const color2 = color2Ref.current;
      const color3 = color3Ref.current;
      const color4 = color4Ref.current;
      const color5 = color5Ref.current;
  
      const color7 = color7Ref.current;

    const context = canvas.getContext('2d');
   

    const current = {
      color: 'black',
    };

    // helper that will update the current color
    const onColorUpdate = (color) => {
      current.color = color
    };

    if(color1!==null){
    color1.addEventListener('click', () => onColorUpdate("#2d2d30"), false);
    color2.addEventListener('click', () =>onColorUpdate("#eb4034"), false);
    color3.addEventListener('click', () => onColorUpdate("#34eb46"), false);
    color4.addEventListener('click',  () =>onColorUpdate("#3474eb"), false);
    color5.addEventListener('click', () => onColorUpdate("#ebc934"), false);
    color7.addEventListener('click', () => onColorUpdate("white"), false);
    }
    // loop through the color elements and add the click event listeners

    let drawing = false;


    const drawLine = (x0, y0, x1, y1, color, emit) => {


      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      if(color==="white"){
        context.lineWidth = 25;
      }
      else{
        context.lineWidth = 2;
      }
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      props.socket.emit('draw-puns', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };


    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    };



    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };



    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

   

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, false);
    onResize();


    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }


    props.socket.on('draw-puns', onDrawingEvent);
  }
  
  drawing()
  
  
}, [props]);

const GumkersIcon = () => { return  (<svg style={{width:'100%', height: '100%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg>)} 
  return (
    <div className="board">

      {/* {props.chosenWord.length >= 1 ? 
      <form className="puns-data__form" onSubmit={(e) => props.puns(e,values)}>
      <input className="puns-data__form--input" type="text" name="userAnswer" onChange={(e) => setValues( {...values, userAnswer: e.target.value })}></input>
      <button className="puns-data__form--button" >Sprawdź</button>
      </form>
      : */}
        <>
      {(props.drawUser===props.userName) && 
        <div ref={colorsRef} className="colors"  style={{ position: "fixed"}}>
        <div ref={color1Ref} className="color" style={{     height: "48px", width: "48px", background:"#2d2d30",     display: "flex", borderRadius: '25px',  marginTop: '5px', cursor: "pointer"}} />
        <div ref={color2Ref}  className="color" style={{     height: "48px", width: "48px", background:"#eb4034",   display: "flex",borderRadius: '25px', marginTop: '5px', cursor: "pointer"}} />
        <div ref={color3Ref} className="color" style={{     height: "48px", width: "48px", background:"#34eb46",  display: "flex",borderRadius: '25px', marginTop: '5px' , cursor: "pointer"}} />
        <div ref={color4Ref} className="color" style={{     height: "48px", width: "48px", background:"#3474eb",  display: "flex",borderRadius: '25px',  marginTop: '5px' , cursor: "pointer"}}/>
        <div  ref={color5Ref} className="color" style={{     height: "48px",width: "48px", background:"#ebc934" ,  display: "flex",borderRadius: '25px',  marginTop: '5px', cursor: "pointer"}}/>
         {/* <div  ref={color6Ref} className="color" style={{     height: "48px",width: "48px", background:"white" ,  display: "flex" }}/> */}
      <div  ref={color7Ref} className="color" style={{  display: "flex", fontFamily: "Courier New", alignItems: "center", userSelect: "none", marginTop: "15px",   height: "48px", width: "48px", background:"white", cursor: "pointer"}}><GumkersIcon/></div>
     </div>
      }

      {props.drawUser===props.userName ?
      <canvas ref={canvasRef} className="whiteboard"  style={{ zIndex: -10  }} /> 
      :
      <div style={{ zIndex: 10 , width: "110%", height: "110%", display: "flex" }} >
      <canvas ref={canvasRef} className="whiteboard"  style={{ zIndex: -10  }} /> 
      </div>
      }
      </>
      {/* } */}

    </div>
  );
};

export default Board;