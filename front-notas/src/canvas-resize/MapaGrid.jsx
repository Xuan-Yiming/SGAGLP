import React, { useRef, useEffect, useState } from 'react';
// import '../HojasDeEstilo/MapGrid.css';
// import logo from "../images/logoCircular.png";

const MapGrid = (props) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    // const [images, setImages] = useState({});

    useEffect(() => {
        // const icons = {
        //     camion: logo,
        //     cliente: logo,
        //     planta: logo
        // };
    
        const loadedImages = {};
    
        // const promises = Object.entries(icons).map(([key, url]) => {
        //     return new Promise((resolve, reject) => {
        //         const img = new Image();
        //         img.src = url;
        //         img.onload = () => {
        //             loadedImages[key] = img;
        //             resolve();
        //         };
        //         img.onerror = reject;
        //     });
        // });
    
        // Promise.all(promises).then(() => setImages(loadedImages));


        // Ajustar el tamaño del canvas al del contenedor
        function updateSize() {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
                setDimensions({ width, height });
            }
        }

        updateSize();

        // Agregar listener para detectar cambios de tamaño y actualizar el canvas
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const cuadrosAlto = 50;
        const cuadrosAncho = 70;

        // Dibujar cuadrícula
        for (let x = 0; x < canvas.width; x += canvas.width / cuadrosAncho) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }

        for (let y = 0; y < canvas.height; y += canvas.height / cuadrosAlto) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }

        ctx.strokeStyle = "black";
        ctx.stroke();


        // function animate(){
        //     let a=0;
        //     ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        //     // context.canvas.width = context.canvas.width;
        //     ctx.fillStyle = 'grey';
        
        //     // const delta = count%800;
        //     ctx.fillRect(10 + a,10,100,100);
        //     a++;
        // }

        // animate();

        // Dibujar íconos
        // const elementos = props.elementos || [];
        // elementos.forEach(elemento => {
        //     const img = images[elemento.tipo];
        //     if (img) {
        //         ctx.drawImage(
        //             img,
        //             elemento.x * (canvas.width / 70) - 10,  // Restamos la mitad del tamaño de la imagen para centrarla
        //             elemento.y * (canvas.height / 50) - 10,
        //             20,  // Ancho deseado
        //             20   // Alto deseado
        //         );
        //     }
        // });
    }, [dimensions]);

    return <canvas ref={canvasRef} {...props} />;
};

export default MapGrid;