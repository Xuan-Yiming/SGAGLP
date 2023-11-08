import React, { useEffect, useRef,useState } from 'react';


const useCanvas = draw =>{
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const ref=useRef();

    useEffect(() => {
        // Ajustar el tamaño del canvas al del contenedor
        function updateSize() {
            if (ref.current && ref.current.parentElement) {
                const { width, height } = ref.current.parentElement.getBoundingClientRect();
                setDimensions({ width, height });
            }
        }

        updateSize();
    }, []);


    useEffect(()=>{
        
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        context.canvas.width = dimensions.width;
        context.canvas.height = dimensions.height;


        let count = 0;
        let animationId;


        const renderer = () =>{
            count++;
            draw(context,count);
            animationId = window.requestAnimationFrame(renderer);
        }

        renderer()
        
        // draw(context);

        return  () => window.cancelAnimationFrame(animationId);
    },[draw])




    return ref
}

export default useCanvas;