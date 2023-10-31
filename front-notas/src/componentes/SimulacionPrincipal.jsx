import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/SimulacionPrincipal.css';
import Canvas from '../canvas-resize/CanvasPrime.js';
import MapaGrid from '../canvas-resize/MapaGrid.jsx';
import MapaGrid2 from '../canvas-resize/MapaGrid2.jsx';
import axios from 'axios';

export function SimulacionPrincipal() {
    
    const divRef = useRef();
    let divWidth = null; // Variable para almacenar el ancho del div
    let divHeight = null;
    const [segundosEnviados, setSegundosEnviados] = useState(0);





    // const [time, setTime] = useState(0);
    // const [isRunning, setIsRunning] = useState(false);
    // const [timeMultiplier, setTimeMultiplier] = useState(1);
  
    // useEffect(() => {
    //   let intervalId;
  
    //   if (isRunning) {
    //     intervalId = setInterval(() => {
    //       setTime((prevTime) => prevTime + timeMultiplier);
    //     }, 1000);
    //   }
  
    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // }, [isRunning,timeMultiplier]);
  
    // const startTimer = () => {
    //   setIsRunning(true);
    // };
  
    // const stopTimer = () => {
    //   setIsRunning(false);
    // };
  
    // const resetTimer = () => {
    //   setIsRunning(false);
    //   setTime(0);
    // };
    // const doubleTime = () => {
    //     setTimeMultiplier(2);
    //   };

      const resetMultiplier = () => {
        setSpeedMultiplier(1);
      };

    // const formatTime = (timeInSeconds) => {
    //     const days = Math.floor(timeInSeconds / 86400);
    //     const hours = Math.floor((timeInSeconds % 86400) / 3600);
    //     const minutes = Math.floor((timeInSeconds % 3600) / 60);
    //     const seconds = timeInSeconds % 60;
    
    //     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    //   };



    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [speedMultiplier, setSpeedMultiplier] = useState(1);
  
    useEffect(() => {
      let startTime = Date.now();
      let timerId;
  
      const updateTimer = () => {
        const now = Date.now();
        const elapsedMilliseconds = now - startTime;
        const elapsedSeconds = (elapsedMilliseconds / 1000) * speedMultiplier;
  
        setElapsedTime((prevElapsedTime) => prevElapsedTime + elapsedSeconds);
        // setPrevTime((prevElapsedTime) => prevElapsedTime + elapsedSeconds);
        // if(elapsedTime!=prevTime)setElapsedTime(prevTime);
        // console.log(elapsedTime);
  
        startTime = now;
        timerId = requestAnimationFrame(updateTimer);
      };
  
      if (isRunning) {
        timerId = requestAnimationFrame(updateTimer);
      }
  
      return () => {
        cancelAnimationFrame(timerId);
      };
    }, [isRunning, speedMultiplier]);
  
    const startTimer = () => {
      setIsRunning(true);
    };
  
    const stopTimer = () => {
      setIsRunning(false);
    };
  
    const resetTimer = () => {
      setIsRunning(false);
      setElapsedTime(0);
    };
  
    const setSpeed = (multiplier) => {
      setSpeedMultiplier(multiplier);
    };
  
    const formatTime = (timeInSeconds) => {
      const days = Math.floor(timeInSeconds / 86400);
      const hours = Math.floor((timeInSeconds % 86400) / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
    //   const seconds = timeInSeconds % 60;
      const seconds = Math.floor(timeInSeconds % 60);
      // setSegundosEnviados(seconds);
  
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
  
    const [fileContent, setFileContent] = useState(null);

    const procesarTXT=()=>{
//TERMINAR
      // Dividir el texto en líneas
      const lineas = fileContent.trim().split('\n');

      // Array para almacenar los objetos JSON
      const objetosJSON = [];

      // Expresión regular para analizar cada línea
      const regex = /^(\d{2})d(\d{2})h(\d{2})m:(\d+),(\d+),c-(\d+),(\d+)m(\d+),(\d+)h$/;

      // Procesar cada línea y convertirla en un objeto JSON
      lineas.forEach((linea) => {
        const match = linea.match(regex);
        if (match) {
          const objetoJSON = {
            dia: match[1],
            hora: match[2],
            minuto: match[3],
            x: match[4],
            y: match[5],
            id: `c-${match[6]}`,
            cantidad: match[7],
            horas: match[8],
          };
          objetosJSON.push(objetoJSON);
        }
      });

      // El resultado será un array de objetos JSON
      console.log(objetosJSON);

    }


    // const handleFileChange = (event) => {
    //   const selectedFile = event.target.files[0];
  

    //   if (selectedFile) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       const content = e.target.result;
    //       setFileContent(content);
    //     };
    //     reader.readAsText(selectedFile);
    //   } else {
    //     setFileContent(null);
    //   }
    // };

    const handleFileChange = (event) => {
      event.preventDefault()
      setFile(event.target.files[0]);
    };


    const draw = (context,count)=>{
        // context.clearRect(0,0,context.canvas.width,context.canvas.height);
        // // context.canvas.width = context.canvas.width;
        // context.fillStyle = 'grey';
    
        // const delta = count%800;
        // context.fillRect(10 + delta,10,100,100);

        

        // context.beginPath();
        const cuadrosAlto = 50;
        const cuadrosAncho = 70;

        // Dibujar cuadrícula
        for (let x = 0; x < context.canvas.width; x += context.canvas.width / cuadrosAncho) {
            context.moveTo(x, 0);
            context.lineTo(x, context.canvas.height);
        }
        // context.lineTo(0,context.canvas.height);
        for (let y = 0; y < context.canvas.height; y += context.canvas.height / cuadrosAlto) {
            context.moveTo(0, y);
            context.lineTo(context.canvas.width, y);
        }
        // context.lineTo(context.canvas.width, 0);
        
        context.strokeStyle = "black";
        context.stroke();
        
    }

    const draw2 = (context,count)=>{
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        // context.canvas.width = context.canvas.width;
        context.fillStyle = 'grey';
    
        const delta = count%800;
        context.fillRect(100 + delta,100,200,100);
        
    }

    useEffect(() => {
      // getDataCamiones()
        if (divRef.current) {
          // Accede al ancho actual del div a través de clientWidth
          divWidth = divRef.current.clientWidth;
          divHeight = divRef.current.clientHeight;
          console.log(`Ancho del div: ${divWidth}`,divWidth);
          console.log(`alto del div: ${divHeight}`);
        }
      }, []);



      const [elementosCamiones,setElementosCamiones] = useState('');
      const  getDataCamiones = async () =>{
        try {
          const response = await axios.get('http://localhost:3000/estructuraCamiones');
    
          setElementosCamiones(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        getDataCamiones();
        console.log(elementosCamiones);
    }, []);


    const [file, setFile] = useState(null);


    useEffect(() => {
      // getDataCamiones(
        console.log(file);
    }, [file]);

    // const handleFileUpload = async (event) => {
    //   event.preventDefault();
  
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('file', file);
  
    //     try {
    //       const response = await fetch('http://localhost:8080/cargaMasivaDePedidos', {
    //         method: 'POST',
    //         body: formData,
    //       });
  
    //       // Handle the response from the server as needed
    //     } catch (error) {
    //       // Handle any errors that occur during the upload
    //       console.error('Error uploading file:', error);
    //     }
    //   }
      
    // };


    const handleFileUpload = async (event) => {
  
      event.preventDefault()
      const config = {
          headers: {
              Authorization: 'Bearer ' 
          }
      }

      const data = {
        file:file
      }
      console.log("AQUI ESTA LA DATAAAAAAA");
      try {

          const respuesta = await axios.post("http://localhost:8080/DP15E/api/v1/node/cargaMasivaDePedidos", data, config);
          console.log("AQUI ESTA LA DATAAAAAAA CURSO 333");
          console.log(respuesta);
      }
      catch (error) {
          console.log(error);
      }
      
    };


    const subirArchivo = async (e) =>{
      e.preventDefault()
      const config = {
          headers: {
              Authorization: 'Bearer ' 
          }
      }

      const data = {
        file:file
      }
      console.log("AQUI ESTA LA DATAAAAAAA");
      try {

          const respuesta = await axios.post("http://localhost:8080/DP15E/api/v1/node/cargaMasivaDePedidos", data, config);
          console.log("AQUI ESTA LA DATAAAAAAA CURSO 333");
          console.log(respuesta);
      }
      catch (error) {
          console.log(error);
      }

    }



    const [prevTime, setPrevTime] = useState(0);
    // useEffect(() => {
    //   // This effect will run whenever elapsedTime changes to a different time
    //   // You can put your MapaGrid2 logic here
    //   console.log('Elapsed time changed to:', elapsedTime);
    // }, [elapsedTime]);

  
    const handleUpload = () => {
      // Realiza la carga del archivo aquí
      const formData = new FormData();
      formData.append("file", file,file.name);
  
      // Realiza una solicitud POST al backend para cargar el archivo
      fetch("http://localhost:8080/DP15E/api/v1/node/cargaMasivaDePedidos", {
        method: "POST",
        body: formData,
        redirect:"follow",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Puedes manejar la respuesta del servidor aquí
        })
        .catch((error) => {
          console.error("Error al cargar el archivo:", error);
        });
    };


    return (
        <div className='principalSimulacion'>
            <div className='principalSimulacionIzq'>

                <div className='SimulacionLadoIzq'>
                    <div className='SimulacionTitulo'>
                        <h1>Simulacion</h1>
                        
                    </div>
                    {/* <p>Elapsed Time: {formatTime(time)}</p>
                        <div>
                            <button onClick={startTimer} disabled={isRunning}>
                            Start
                            </button>
                            <button onClick={stopTimer} disabled={!isRunning}>
                            Stop
                            </button>
                            <button onClick={resetTimer}>Reset</button>
                            <button onClick={doubleTime} disabled={timeMultiplier === 2}>
                            Double Speed
                            </button>
                            <button onClick={resetMultiplier} disabled={timeMultiplier === 1}>
                            Reset Speed
                            </button>
                            
                            <div>&nbsp;&nbsp;</div>
                        </div> */}
                        <p>Elapsed Time: {formatTime(elapsedTime)}</p>
                        <div>
                            <button onClick={startTimer} disabled={isRunning}>
                            Start
                            </button>
                            <button onClick={stopTimer} disabled={!isRunning}>
                            Stop
                            </button>
                            <button onClick={resetTimer}>Reset</button>
                            <button onClick={() => setSpeed(2)}>Double Speed</button>
                            <button onClick={() => setSpeed(4)}>Quadruple Speed</button>
                            <button onClick={() => setSpeed(8)}>Octuple Speed</button>
                            <button onClick={() => setSpeed(32)}>32 Speed</button>
                            <button onClick={resetMultiplier} disabled={speedMultiplier === 1}>
                            Reset Speed
                            </button>
                        </div>
                        <div>&nbsp;&nbsp;</div>
                        
                    <div>

                    </div>
                    <div className='SimulacionMapa' ref={divRef}>
                        {/* <Canvas className='mapaSimulado'  draw = {draw} draw2 ={null} width='100%' height ='100%'/> */}
                        <MapaGrid2 ancho ={divWidth} alto ={divHeight} tiempo={elapsedTime} elementosCamiones={elementosCamiones}/>
                        {/* <Canvas className='mapaSimulado'  draw = {draw2} width='100%' height ='100%'/> */}
                        
                        {/* <div id="canvas-container" style={{ width: '100%', height: '100%' }}>
                            <Canvas className='mapaSimulado' id='canvas' draw = {draw} width='100%' height ='100%'/>
                        </div> */}


                    </div>
                </div>

            </div>
            <div className='principalSimulacionDer'>
                <div className='SimulacionLadoDer'>

                    <div className='SimulacionBotonesDer'></div>
                    <div className='SimulacionConfigurar'>
                      <div className='SimulacionConfigTItulo'>Configurar Datos</div>
                      <div className='SimulacionConfigBody'>

                        Ingresar Archivo TXT de Pedidos:
                        {/* <input type="file" accept=".txt" onChange={handleFileChange} />
                        <div><button onClick={procesarTXT}>procesar</button></div>
                        <strong>File Content:</strong>
                        <pre>{fileContent}</pre> */}

                        {/* <input class="custom-file-input-label" type="file" id="btn-masiva" accept=".csv" display="none"/>

                        <button class="button-blue-transparente-blue-border" id="btn-reporte">
                            Reporte de lista negra
                        </button> */}


                        {/*<form>*/}

                        <div>
                          <input type="file" accept=".txt" onChange={handleFileChange} />
                          <button onClick={handleUpload}>Cargar Archivo</button>
                        </div>
                      </div>
                    </div>
                    <div className='SimulacionResumen'></div>

                </div>
            </div>
        </div>
    );
}

export default SimulacionPrincipal;