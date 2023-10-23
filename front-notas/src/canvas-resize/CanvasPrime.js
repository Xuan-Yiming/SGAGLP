import React, { useEffect, useRef } from 'react';
import useCanvas from './useCanvas.js'

const CanvasPrime =props =>{

    const{draw, ...rest}= props;
    // const ref=useRef();

    
    const ref = useCanvas(draw);


    // useEffect(()=>{
        
    //     const canvas = ref.current;
    //     const context = canvas.getContext('2d');
        

    //     let count = 0;
    //     let animationId;


    //     const renderer = () =>{
    //         count++;
    //         draw(context,count);
    //         animationId = window.requestAnimationFrame(renderer);
    //     }

    //     renderer()
        
    //     // draw(context);

    //     return  () => window.cancelAnimationFrame(animationId);
    // },[draw])




    return <canvas ref={ref}{...props}/>
}

export default CanvasPrime;