# SGAGLP
Software para la Gestión de las Operaciones de SAG

## Descripción del contexto del problema
SAG es una empresa dedicada a la comercialización y distribución de GLP para sus clientes (plantas
industriales, empresas comerciales, condominios, etc.) que están en la ciudad XYZ. SAG tiene un fuerte
competidor en la misma ciudad, por lo que ha dispuesto la política de cero incumplimientos con la única
condición de que sus clientes realice el pedido con un mínimo de 4 horas antelación. En caso de
incumplimiento, la penalidad será que SAG sólo cobrará el 50%; sin embargo, los directivos han sido claros
que bajo ninguna circunstancia incumplirán el plazo comprometido. 

Esta nueva política ha provocado que SAG construya 2 tanques cisternas “intermedios” con una
capacidad “efectiva” de 160m3 en cada una, adicional a su planta principal. Los tanques intermedios se
abastecen una vez al día, a las 0:00 horas y la planta principal está abastecida todo el tiempo. Su flota actual
está constituida por camiones cisternas para distribución con distintas capacidades “efectivas” (que van
desde 5m3 hasta 25m3) y que requiere de mantenimiento preventivo que dura 24 horas cada 2 meses; así
como mantenimiento correctivo cuando sea necesario.
El consumo de petróleo de los camiones cisternas, para las entregas y retorno, está determinado por la
distancia que recorre el camión cisterna y por la carga que transporta en cada tramo; esto hace muy
engorroso el proceso de definir las rutas a seguir. La gerencia está convencida, que el proceso seguido no
asegura un menor consumo de petróleo para el transporte del GLP, que están desperdiciando dinero y que
las operaciones se están retrasando pues se tienen demoras en la asignación de los camiones cisternas a sus
rutas.

La empresa SAG ha contratado a su equipo para que desarrolle una solución informática para sus
principales necesidades. Dichas necesidades se resumen en: 
1. Desarrollar el registro de los pedidos
2. Planificar y replanificar las rutas de los camiones cisternas para cumplir todos los compromisos sin pagar penalidad (componente planificador)
3. Presentar gráficamente el monitoreo de las operaciones de la empresa, en un mapa en tiempo real (componente visualizador)

Para la evaluación del curso, se manejará 3 escenarios:
- Las operaciones día a día
- La simulación semanal
- La simulación hasta el colapso de las operaciones de la empresa

Para ello se requiere que:

1. El componente planificador resuelva mediante parámetros los 3 escenarios
1. Presente de manera gráfica información relevante del desempeño de las operaciones (en los 3 escenarios)

El primer escenario en resolverse debe ser el de la simulación semanal que debe tomar en ejecutarse entre 20 y 30 minutos.

## Requisitos Funcionales:
Para este proyecto se establecen los siguientes requisitos no funcionales:
1. Presentar dos soluciones algorítmicas en Lenguaje Java y evaluadas por experimentación numérica.
2. Los dos algoritmos de la experimentación numérica deben ser del tipo metaheurísticos.
3. La solución debe funcionar en el equipamiento provisto por el laboratorio de Ingeniería Informática.
4. Se evaluará el proceso seguido utilizando NTP-ISO/IEC 29110-5-1-2 (VSE)
5. Se entregará el video de la presentación final del equipo (exposiciones).
6. Se entregará videos (avances o final) sobre los 3 escenarios requeridos.
   