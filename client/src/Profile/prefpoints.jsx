import { prefPoints } from "../api"
import { useQuery } from "react-query"
import DNA from "react-loader-spinner/dist/loader/Dna"
import Canvas from "../stylecomponents/canvass"
import {motion} from "framer-motion/dist/framer-motion"
import { useState } from "react"
import { Menu } from "../sidebar/menu"


function Prefpoints() {
 
    const {isLoading,data} = useQuery("points",prefPoints)

    if (isLoading) {
        return  (
            <div id="pref-points">
                <DNA
                height="240"
                width="240"
            />
            </div>
        )
    }

    return (
        <>
        <Menu/>
        <div id="pref-points">
            <motion.div className="pref-col"
            animate={{
            backgroundColor: ["#000","#fff"],
            scale: [0,1]
        }}
            >
            <div className="pref-col-header">
                <h1>Preferred Face</h1>
            </div>
                <Canvas id="pref-canv" height="600" width="550" draw={ (context)=> drawLines(context,data.pref_points)} />
                <Canvas id="pref-canv" height="600" width="550" draw={ (context)=> drawPoints(context,data.pref_points)} />
            </motion.div>
            <motion.div className="pref-col"
              animate={{
                scale: [2,1]}}
            >
                <div className="pref-col-header">
                    <h1>Your Face</h1>
            </div>
                <Canvas id="self-canv" height="600" width="550" draw={(context)=> drawLines(context,data.avg_points)}/>
                <Canvas id="self-canv" height="600" width="550" draw={(context)=> drawPoints(context,data.avg_points)}/>
            </motion.div>
        </div>
        </>
    )
}
    //Original 500x650


function drawPoints(context,points) {
    for (let i = 0; i < points.length; i+=2) {

     
        const x = parseFloat(points[i]) * 500 
        const y = parseFloat(points[i+1]) * 650 

        context.moveTo(x,y)
        context.strokeStyle = "black"
        context.strokeRect(x,y,2,2)
    }
}

function drawLines(context,points) {
    // context.beginPath();
    // context.ellipse(270, 280, 240, 350, 0, 0, 2 * Math.PI);
    // context.stroke();

    context.beginPath()
    let leftmost = [250,250]
    let rightmost = [350,350]
    // console.log(points.length)
    for (let i = 0; i < points.length; i+=2) {

     
        const x = parseFloat(points[i]) * 500 
        const y = parseFloat(points[i+1]) * 650 

        if (x < leftmost[0]) {
            leftmost = [x,y]
        }
        else if(x > rightmost[0]) {
            rightmost = [x,y]
        }

        //Canvas.width /2 - image.width / 2
        context.moveTo(x,y)
    
        const xnext = parseFloat(points[i+2]) * 500 
        const ynext = parseFloat(points[i+3]) * 650  

        if (!(Math.abs(x-xnext) > 100 || Math.abs(y-ynext) > 100)) {
            context.lineTo(xnext,ynext)
            context.stroke()   
        }


    
        context.strokeRect(x,y,1,1)
    }
    
    const middleX = (leftmost[0]+rightmost[0])/2
    const middleY = (leftmost[1]+rightmost[1])/50

    context.beginPath()
    // context.ellipse()
    context.moveTo(leftmost[0],leftmost[1])
    context.quadraticCurveTo(middleX,middleY,rightmost[0],rightmost[1])
    // context.bezierCurveTo(leftmost[0],leftmost[1],middleX,middleY,rightmost[0],rightmost[1])
    context.stroke()
    // context.fillStyle = "red"
    // context.fill()

}

export default Prefpoints