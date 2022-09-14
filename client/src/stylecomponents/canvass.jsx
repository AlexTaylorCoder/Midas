import { useEffect, useRef } from "react";

function Canvas({draw,width,height}) {
const canvas = useRef();
  useEffect(() => {                             
    const context = canvas.current.getContext('2d'); 
    draw(context);

    return ()=> {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
  },[]);
  return (
    <canvas
      ref={canvas}
      width={width}   
      height={height} 
    />
  )
}

export default Canvas