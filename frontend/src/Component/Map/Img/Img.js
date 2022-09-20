import { useEffect } from "react";


  
export const MapImg = ({keyy ,squares , curs,trival, imgurl}) =>{

    console.log(imgurl , squares, keyy);
    var id=`canvas${keyy}`
    var can,ctx;
    var myImg;
        useEffect(()=>{ 
            myImg = imgurl;
            myImg = can = document.getElementById(id);
            ctx = can.getContext('2d');
            ctx.clearRect(0, 0, can.width, can.height);
            for(let i= 15; i < 360; i+=15){
                drawLine(i,0,i,can.height)  
            }
            for(let i= 15; i < 300; i+=15){
                drawLine(0,i,can.width,i)  
            }

            squares.forEach((row,i) => {
                row.forEach((cell,j) => {
                    if(cell === 1) {
                        drawLine( i*15 , j*15, i*15+15, j*15+15 , "yellow", 2)
                    }
                    if(cell === 2) {
                        drawLine( i*15 , j*15, i*15+15, j*15+15 , "blue", 2)
                        drawLine( i*15+15 , j*15, i*15, j*15+15 ,"blue", 2)
                    }
                })
            });

            if(curs[0] > 0 || curs[1]  > 0){
                let i = curs[0];let j = curs[1];
                drawLine( i*15 , j*15, i*15+15, j*15+15 , "red", 2)
                drawLine( i*15+15 , j*15, i*15, j*15+15 ,"red", 2)
                drawLine( i*15 , j*15+8, i*15+15, j*15+8 ,"red", 2)
                drawLine( i*15 +7 , j*15, i*15+7, j*15+15 ,"red", 2)
            }

        },)

        function drawLine( x , y, stopX, stopY , color = "black", width = .1){
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineWidth=width;
            ctx.lineTo(stopX, stopY);
            ctx.strokeStyle = color;
            ctx.closePath();
            ctx.stroke()
        }
        
      return(
        <canvas style={{
            backgroundImage: "url(" + imgurl + ")",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            maxHeight:"100%",
            width: "100%",
        }} id={id} width="360" height="300">
        </canvas>
      );
} 

export default MapImg;
