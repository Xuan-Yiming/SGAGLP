package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.GeneticAlgorithms.GeneticAlgorithmVRP;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Solucion;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode;
import pe.com.pucp.DP15E.model.*;
import pe.com.pucp.DP15E.repository.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component
public class NodePlanificacionService {
    private final NodePlanificacionRepository nodeRepository;
    private final ClientePlanificacionRepository clienteRepository;
    private final VehiclePlanificacionRepository vehicleRepository;
    private final SolucionNodoRepository solucionNodoRepository;

    private final SolucionRutaRepository solucionRutaRepository;

    private final SolucionClockRepository solucionClockRepository;

    private final SolucionClockNodeRepository solucionClockNodeRepository;

    private final int NUMERO_DE_HILOS = 5; // Número de hilos a utilizar
    private final int TIEMPO_MAXIMO_ESPERA = 5; // Tiempo máximo de espera para que los hilos terminen

    @Autowired
    public NodePlanificacionService(NodePlanificacionRepository nodeRepository, ClientePlanificacionRepository clienteRepository, VehiclePlanificacionRepository vehicleRepository,
                                    SolucionNodoRepository solucionNodoRepository,SolucionRutaRepository solucionRutaRepository,
                                    SolucionClockNodeRepository solucionClockNodeRepository, SolucionClockRepository solucionClockRepository) {
        this.nodeRepository = nodeRepository;
        this.clienteRepository = clienteRepository;
        this.vehicleRepository = vehicleRepository;
        this.solucionNodoRepository = solucionNodoRepository;
        this.solucionRutaRepository = solucionRutaRepository;
        this.solucionClockNodeRepository = solucionClockNodeRepository;
        this.solucionClockRepository = solucionClockRepository;
    }

    public String algoritmoPlanificacion(Date FechaEntrada) throws Exception {

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportanteC();
        ArrayList<NodePlanificacion> nodes = new ArrayList<>();
        for (Object[] result : resultList) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaOrigen((LocalDateTime) result[4]);
                node.setCantidad((Double) result[5]);
                node.setHoraDemandada((Integer) result[6]);
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList3 = nodeRepository.listarDataImportanteD();
        for (Object[] result : resultList3) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                //node.setCapacidad((Double) result[4]);
                if(i==0) node.setCapacidad(10000);
                else node.setCapacidad(500);
                i++;
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList4 = nodeRepository.listarDataImportanteB();
        for (Object[] result : resultList4) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                //ZoneId zonaHoraria = ZoneId.of("America/Lima");
                //ZonedDateTime zonedDateTime = result[4].toInstant().atZone(zonaHoraria);
                //LocalDateTime fechaInicio = zonedDateTime.toLocalDateTime();
                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaInicio(String.valueOf(result[4]));
                node.setFechaFinal(String.valueOf(result[5]));
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]> resultList2 = vehicleRepository.listarDataImportanteVehiculo();
        ArrayList<pe.com.pucp.DP15E.model.VehiclePlanificacion> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle = new VehiclePlanificacion();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((String) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle> vehiclesAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> ordersAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> blocksAlgorit = new ArrayList<>();

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='C'){
                ordersAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node("C" + order.getId() , order.getX(), order.getY(), order.getCantidad(), Timestamp.valueOf(order.getFechaOrigen()), Timestamp.valueOf(order.getFechaOrigen().plusHours(order.getHoraDemandada()))));
            }
        }

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='B'){
                blocksAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node(order.getId(), order.getX(), order.getY(), Timestamp.valueOf(order.getFechaInicio()),  Timestamp.valueOf(order.getFechaFinal())) );
            }
        }
        for (pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle : vehicles) {
            vehiclesAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle( vehicle.getId() , vehicle.getType().charAt(1), vehicle.getX(), vehicle.getY(), vehicle.getPesoBruto(),
                    vehicle.getCargaGLP(),vehicle.getPesoNeto(),vehicle.getVelocidad(),vehicle.getCargaPetroleo(),vehicle.getTotalTime(),vehicle.getMantenimiento()));

        }
        GeneticAlgorithmVRP geneticAlgorithmVRP = new GeneticAlgorithmVRP(ordersAlgorit,vehiclesAlgorit,blocksAlgorit);
        //Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));
        //ExecutorService executorService = Executors.newFixedThreadPool(2);
        if(solucionNodoRepository.count() != 0){
            solucionNodoRepository.deleteAll();
        }
        if(solucionClockNodeRepository.count()!=0 ){
            solucionClockNodeRepository.deleteAll();
        }
        if(solucionClockRepository.count()!=0 ){
            solucionClockRepository.deleteAll();
        }

        //executorService.shutdown();
        //executorService.awaitTermination(TIEMPO_MAXIMO_ESPERA, TimeUnit.SECONDS);
        // Mapeo de SolucionNodoAlgoritmo a SolucionNodoModel y guardado en BD
        Solucion solucion = geneticAlgorithmVRP.getSolucion();
        ExecutorService executorService2 = Executors.newFixedThreadPool(5);
        solucion.elementosEstaticosTemporales.forEach(solucionNodo -> {
            //SolucionNodo solucionNodoSol = SolucionNodo.fromSolucionNodo(solucionNodo);
            //solucionNodoRepository.save(solucionNodoSol);
        });


        for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock solucionClock : solucion.elementosEnCadaClock) {
            // Guardar en la tabla solucionClock
            SolucionClock entidadSolucionClock = new SolucionClock();
            entidadSolucionClock.setClock(solucionClock.clock);
            entidadSolucionClock.setActivo(true); // O el valor que desees
            SolucionClock solucionClockGuardado = solucionClockRepository.save(entidadSolucionClock);

            // Guardar en la tabla solucionClockNode
            for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode solucionClockNode : solucionClock.nodos) {
                SolucionClockNode entidadSolucionClockNode = new SolucionClockNode();
                entidadSolucionClockNode.setFidSolucionClock(solucionClockGuardado);
                entidadSolucionClockNode.setPlaca(solucionClockNode.placa);
                entidadSolucionClockNode.setIdPedido(solucionClockNode.idPedido);
                entidadSolucionClockNode.setCoordenadaX(solucionClockNode.x);
                entidadSolucionClockNode.setCoordenadaY(solucionClockNode.y);
                entidadSolucionClockNode.setActivo(true); // O el valor que desees
                solucionClockNodeRepository.save(entidadSolucionClockNode);
            }
        }
        executorService2.shutdown();
        //executorService2.awaitTermination(TIEMPO_MAXIMO_ESPERA, TimeUnit.SECONDS);
        return geneticAlgorithmVRP.getSolucion().solucionToJson();
    }

    public  String cargaMasivaDePedidos(MultipartFile file){
        //private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd'd'HH'h'mm'm':");

        List<NodePlanificacion> lista = nodeRepository.findAll();
        int encontrado,anho=0,mes=0;
        if(file.isEmpty()){
            return "El archivo está vacio";
        }
        try(BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            String fileName = file.getOriginalFilename();
            if (fileName != null) {
                // Extrae el año y el mes del nombre del archivo
                String[] parts = fileName.split("ventas");
                if (parts.length == 2 && parts[1].length() >= 6) {
                    anho = Integer.parseInt(parts[1].substring(0, 4)); // Extraer los 4 primeros caracteres como el año
                    mes = Integer.parseInt(parts[1].substring(4, 6)); // Extraer los siguientes 2 caracteres como el mes
                }
            }
            String line;
            List<NodePlanificacion> ListaNode = new ArrayList<>();
            //br.readLine();
            ExecutorService executor = Executors.newFixedThreadPool(NUMERO_DE_HILOS);
            while((line=br.readLine())!=null){
                String[] data = line.split(getSeparator(line));
                NodePlanificacion node = new NodePlanificacion();
                if(data.length >=2){
                    String[] parts = data[0].split("[dhm]");
                    int dia = Integer.parseInt(parts[0]);
                    int hora= Integer.parseInt(parts[1]);
                    int minuto= Integer.parseInt(parts[2]);
                    node.setFechaOrigen(LocalDateTime.of(anho, mes, dia, hora, minuto, 0));
                    //node.setPosicion(new Point(Integer.parseInt(data[1]),Integer.parseInt(data[2])));
                    parts = data[1].split(",");

                    node.setX(Integer.parseInt(parts[0]));
                    node.setY(Integer.parseInt(parts[1]));
                    node.setIdCliente(parts[2]);
                    node.setTipo('C');
                    node.setActivo(true);
                    String[] parts2 = parts[3].split("m");
                    node.setCantidad(Double.parseDouble(parts2[0]));
                    parts2 = parts[4].split("h");
                    node.setHoraDemandada(Integer.parseInt(parts2[0]));

                }
                executor.submit(() -> processNode(node, lista));


            }

            executor.shutdown();
            executor.awaitTermination(TIEMPO_MAXIMO_ESPERA, TimeUnit.SECONDS);
            //NodeRepository.saveAllAndFlush(ListaNode);
            return "Archivo CSV cargado exitosamente";
        } catch (IOException e) {
            return "Error al cargar el archivo csv: "+ e.getMessage();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    // Método para procesar un nodo en un hilo
    private void processNode(NodePlanificacion node, List<NodePlanificacion> lista) {
        int encontrado = buscarRepetidos(node, lista);
        if (encontrado == 0) {
            List<NodePlanificacion> singleNodeList = new ArrayList<>();
            singleNodeList.add(node);
            saveNodesToDatabase(singleNodeList);
        }
    }

    private String getSeparator(String line) {
        String[] separators = {":",",", ";","\t"}; // Posibles separadores: coma, punto y coma, tabulación
        for (String separator : separators) {
            if (line.contains(separator)) {
                return separator;
            }
        }
        // Si no se encuentra un separador conocido, se puede lanzar una excepción o utilizar un separador predeterminado
        return ",";
    }

    public int buscarRepetidos(NodePlanificacion abuscar, List<NodePlanificacion> lista){
        if((lista.size())==0) return 0;
        for (NodePlanificacion cal: lista) {
            if(
                //cal.getIdCliente().equals(abuscar.getIdCliente()) &&
                    (cal.getX() == (abuscar.getX())) &&
                            (cal.getY() == (abuscar.getY())) &&
                            (cal.getTipo()==abuscar.getTipo())){
                return 1;
            }

        }


        return  0;
    }

    public int buscarRepetidosCliente(String abuscar, List<ClientePlanificacion> lista){
        if((lista.size())==0) return 0;
        for (ClientePlanificacion cal: lista) {
            if(
                    cal.getIdCliente().equals(abuscar) ){
                return 1;
            }

        }


        return  0;
    }


    private void saveNodesToDatabase(List<NodePlanificacion> nodes) {
        String jdbcUrl = "jdbc:mysql://dp1-e5.cydpwedqgd2o.us-east-1.rds.amazonaws.com:3306/DP1E5?useSSL=false";
        String username = "admin";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            for (NodePlanificacion node : nodes) {
                // Insertar cliente_simulacion
                insertClienteSimulacion(connection, node);

                // Insertar nodo_simulacion
                insertNodoSimulacion(connection, node);

                // Insertar pedido_simulacion
                insertPedidoSimulacion(connection, node);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
    }

    private void insertClienteSimulacion(Connection connection, NodePlanificacion node) throws SQLException {
        List<ClientePlanificacion> lista = clienteRepository.findAll();
        int encontrado = 0;
        encontrado = buscarRepetidosCliente(node.getIdCliente(),lista);
        if(encontrado==0){
            String sql = "INSERT INTO cliente_planificacion (id_cliente,activo) VALUES (?,true)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, node.getIdCliente());
                preparedStatement.executeUpdate();
            }
        }

    }

    private void insertNodoSimulacion(Connection connection, NodePlanificacion node) throws SQLException {
        String sql = "INSERT INTO nodo_planificacion (coordenadaX, coordenadaY, tipo, activo) " +
                "VALUES (?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, node.getX());
            preparedStatement.setInt(2, node.getY());
            // Puedes establecer la fecha_llegada aquí si la tienes en la clase Node
            preparedStatement.setString(3, String.valueOf(node.getTipo()));
            preparedStatement.setBoolean(4, node.isActivo());  // Activo, ajusta según tus necesidades
            preparedStatement.executeUpdate();
        }
    }

    private void insertPedidoSimulacion(Connection connection, NodePlanificacion node) throws SQLException {
        String sql = "INSERT INTO pedido_planificacion (fid_nodo, fid_cliente, fecha_origen, " +
                "coordenadaX, coordenadaY, cantidad, hora_demandada, activo) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            // Puedes configurar las fechas, coordenadas y otros campos aquí
            preparedStatement.setInt(1, getLastInsertedNodoID(connection));  // Obtener el último ID insertado en nodo_simulacion
            preparedStatement.setString(2, node.getIdCliente()); // Obtener el último ID insertado en cliente_simulacion
            preparedStatement.setTimestamp(3, Timestamp.valueOf(node.getFechaOrigen()));

            preparedStatement.setInt(4,node.getX());
            preparedStatement.setInt(5, node.getY());
            preparedStatement.setBigDecimal(6, BigDecimal.valueOf(node.getCantidad()));
            preparedStatement.setInt(7,  node.getHoraDemandada());
            preparedStatement.setBoolean(8,  node.isActivo());
            preparedStatement.executeUpdate();
        }
    }
    private int getLastInsertedNodoID(Connection connection) {
        try (Statement statement = connection.createStatement()) {
            ResultSet resultSet = statement.executeQuery("SELECT LAST_INSERT_ID()");
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
        return -1; // Devuelve un valor predeterminado en caso de error
    }

    public  String cargaMasivaDeBloqueos(MultipartFile file){
        //private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd'd'HH'h'mm'm':");

        List<NodePlanificacion> lista = nodeRepository.findAll();
        int encontrado,anho=0,mes=0;
        if(file.isEmpty()){
            return "El archivo está vacio";
        }
        try(BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            String fileName = file.getOriginalFilename();
            if (fileName != null) {
                // Extrae el año y el mes del nombre del archivo

                String[] parts = fileName.split("bloqueos");
                if (parts.length >= 2 && parts[0].length() >= 6) {
                    anho = Integer.parseInt(parts[0].substring(0, 4)); // Extraer los 4 primeros caracteres como el año
                    mes = Integer.parseInt(parts[0].substring(4, 6)); // Extraer los siguientes 2 caracteres como el mes
                }
            }
            String line;

            //br.readLine();
            ExecutorService executor = Executors.newFixedThreadPool(NUMERO_DE_HILOS);
            while((line=br.readLine())!=null){
                List<NodePlanificacion> ListaNode = new ArrayList<>();
                String[] data = line.split(getSeparator2(line));

                if(data.length >=2){
                    String[] parts = data[0].split("[dhm]");
                    int dia = Integer.parseInt(parts[0]);
                    int hora= Integer.parseInt(parts[1]);
                    int minuto= Integer.parseInt(parts[2]);

                    String[] parts1 = data[1].split(":");

                    String[] parts2 = parts1[0].split("[dhm]");
                    int dia2 = Integer.parseInt(parts2[0]);
                    int hora2= Integer.parseInt(parts2[1]);
                    int minuto2= Integer.parseInt(parts2[2]);

                    String[] parts3 = parts1[1].split(",");
                    for (int i = 0; i < parts3.length; i += 2) {
                        int x = Integer.parseInt(parts3[i]);
                        int y = Integer.parseInt(parts3[i + 1]);
                        NodePlanificacion node = new NodePlanificacion();
                        LocalDateTime fechaHora = LocalDateTime.of(anho, mes, dia, hora, minuto, 0);

                        // Definir un formato para la fecha y hora
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                        // Formatear la fecha y hora como cadena en el formato datetime
                        String fechaHoraComoString = fechaHora.format(formatter);
                        node.setFechaInicio(fechaHoraComoString);

                        LocalDateTime fechaHora2 = LocalDateTime.of(anho, mes, dia2, hora2, minuto2, 0);

                        // Definir un formato para la fecha y hora
                        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

                        // Formatear la fecha y hora como cadena en el formato datetime
                        String fechaHoraComoString2 = fechaHora2.format(formatter2);

                        node.setFechaFinal(fechaHoraComoString2);

                        //node.setPosicion(new Point(x,y));
                        node.setX(x);
                        node.setY(y);
                        node.setTipo('B');
                        node.setActivo(true);
                        ListaNode.add(node);

                    }

                    executor.submit(() -> processBloqueo(ListaNode,lista));
                }
            }

            executor.shutdown();
            executor.awaitTermination(TIEMPO_MAXIMO_ESPERA, TimeUnit.SECONDS);
            //NodeRepository.saveAllAndFlush(ListaNode);
            return "Archivo CSV cargado exitosamente";
        } catch (IOException e) {
            return "Error al cargar el archivo csv: "+ e.getMessage();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }


    // Método para procesar un bloqueo en un hilo
    private void processBloqueo(List<NodePlanificacion> ListaNode,List<NodePlanificacion> ListaCompleta) {

        if (!ListaNode.isEmpty()) {
            List<NodePlanificacion> ListaNueva = obtenerNodosUnicos(ListaNode, ListaCompleta);
            if (!ListaNueva.isEmpty()) {
                // Guardar manualmente en la base de datos
                saveNodesToDatabase2(ListaNueva);
            }
        }


    }

    private List<NodePlanificacion> obtenerNodosUnicos(List<NodePlanificacion> listaNode, List<NodePlanificacion> listaCompleta) {
        List<NodePlanificacion> listaNueva = new ArrayList<>();

        for (NodePlanificacion node : listaNode) {
            if (!existeNodoEnLista(node, listaCompleta)) {
                listaNueva.add(node);
            }
        }

        return listaNueva;
    }

    private boolean existeNodoEnLista(NodePlanificacion node, List<NodePlanificacion> lista) {
        for (NodePlanificacion nodoEnLista : lista) {
            if (sonNodosIguales(node, nodoEnLista)) {
                return true;
            }
        }
        return false;
    }

    private boolean sonNodosIguales(NodePlanificacion node1, NodePlanificacion node2) {
        return node1.getX() == node2.getX() && node1.getY() == node2.getY();
    }

    private String getSeparator2(String line) {
        String[] separators = {"-",":"}; // Posibles separadores: coma, punto y coma, tabulación
        for (String separator : separators) {
            if (line.contains(separator)) {
                return separator;
            }
        }
        // Si no se encuentra un separador conocido, se puede lanzar una excepción o utilizar un separador predeterminado
        return ":";
    }

    private void saveNodesToDatabase2(List<NodePlanificacion> nodes) {
        String jdbcUrl = "jdbc:mysql://dp1-e5.cydpwedqgd2o.us-east-1.rds.amazonaws.com:3306/DP1E5?useSSL=false";
        String username = "admin";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            for (NodePlanificacion node : nodes) {

                // Insertar nodo_simulacion
                insertNodoSimulacion(connection, node);

                // Insertar bloqueo_simulacion
                insertBloqueoSimulacion(connection, node);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
    }

    private void insertBloqueoSimulacion(Connection connection, NodePlanificacion node) throws SQLException {
        String sql = "INSERT INTO bloqueo_planificacion (fid_nodo, fecha_inicio , fecha_final, " +
                "coordenadaX, coordenadaY, activo) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, getLastInsertedNodoID(connection));  // Obtener el último ID insertado en nodo_simulacion
            preparedStatement.setTimestamp(2, Timestamp.valueOf(node.getFechaInicio()));
            preparedStatement.setTimestamp(3, Timestamp.valueOf(node.getFechaFinal()));
            preparedStatement.setInt(4,node.getX());
            preparedStatement.setInt(5, node.getY());
            preparedStatement.setBoolean(6, node.isActivo());
            preparedStatement.executeUpdate();
        }
    }

    public String pedidosTik(MultipartFile file, int clock, Date FechaEntrada) throws Exception {
        String mensaje = cargaMasivaDePedidos(file);
        Solucion solucion1 = new Solucion();
        solucion1 = obtenerSolucionDesdeBaseDeDatos();

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportanteC();
        ArrayList<NodePlanificacion> nodes = new ArrayList<>();
        for (Object[] result : resultList) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaOrigen((LocalDateTime) result[4]);
                node.setCantidad((Double) result[5]);
                node.setHoraDemandada((Integer) result[6]);
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList3 = nodeRepository.listarDataImportanteD();
        for (Object[] result : resultList3) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                //node.setCapacidad((Double) result[4]);
                if(i==0) node.setCapacidad(10000);
                else node.setCapacidad(500);
                i++;
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList4 = nodeRepository.listarDataImportanteB();
        for (Object[] result : resultList4) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                //ZoneId zonaHoraria = ZoneId.of("America/Lima");
                //ZonedDateTime zonedDateTime = result[4].toInstant().atZone(zonaHoraria);
                //LocalDateTime fechaInicio = zonedDateTime.toLocalDateTime();
                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaInicio(String.valueOf(result[4]));
                node.setFechaFinal(String.valueOf(result[5]));
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]> resultList2 = vehicleRepository.listarDataImportanteVehiculo();
        ArrayList<pe.com.pucp.DP15E.model.VehiclePlanificacion> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle = new VehiclePlanificacion();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((String) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle> vehiclesAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> ordersAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> blocksAlgorit = new ArrayList<>();

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='C'){
                ordersAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node("C" + order.getId() , order.getX(), order.getY(), order.getCantidad(), Timestamp.valueOf(order.getFechaOrigen()), Timestamp.valueOf(order.getFechaOrigen().plusHours(order.getHoraDemandada()))));
            }
        }

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='B'){
                blocksAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node(order.getId(), order.getX(), order.getY(), Timestamp.valueOf(order.getFechaInicio()),  Timestamp.valueOf(order.getFechaFinal())) );
            }
        }
        for (pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle : vehicles) {
            vehiclesAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle( vehicle.getId() , vehicle.getType().charAt(1), vehicle.getX(), vehicle.getY(), vehicle.getPesoBruto(),
                    vehicle.getCargaGLP(),vehicle.getPesoNeto(),vehicle.getVelocidad(),vehicle.getCargaPetroleo(),vehicle.getTotalTime(),vehicle.getMantenimiento()));

        }
        GeneticAlgorithmVRP geneticAlgorithmVRP = new GeneticAlgorithmVRP(ordersAlgorit,vehiclesAlgorit,blocksAlgorit);
        //Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));
        if(solucionNodoRepository.count() != 0){
            solucionNodoRepository.deleteAll();
        }
        if(solucionClockNodeRepository.count()!=0 ){
            solucionClockNodeRepository.deleteAll();
        }
        if(solucionClockRepository.count()!=0 ){
            solucionClockRepository.deleteAll();
        }

        Solucion solucion = new Solucion();
        // Mapeo de SolucionNodoAlgoritmo a SolucionNodoModel y guardado en BD
        solucion = geneticAlgorithmVRP.getSolucion();

        solucion.elementosEstaticosTemporales.forEach(solucionNodo -> {
            //SolucionNodo solucionNodoSol = SolucionNodo.fromSolucionNodo(solucionNodo);
            //solucionNodoRepository.save(solucionNodoSol);
        });


        for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock solucionClock : solucion.elementosEnCadaClock) {
            // Guardar en la tabla solucionClock
            SolucionClock entidadSolucionClock = new SolucionClock();
            entidadSolucionClock.setClock(solucionClock.clock);
            entidadSolucionClock.setActivo(true); // O el valor que desees
            SolucionClock solucionClockGuardado = solucionClockRepository.save(entidadSolucionClock);

            // Guardar en la tabla solucionClockNode
            for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode solucionClockNode : solucionClock.nodos) {
                SolucionClockNode entidadSolucionClockNode = new SolucionClockNode();
                entidadSolucionClockNode.setFidSolucionClock(solucionClockGuardado);
                entidadSolucionClockNode.setPlaca(solucionClockNode.placa);
                entidadSolucionClockNode.setIdPedido(solucionClockNode.idPedido);
                entidadSolucionClockNode.setCoordenadaX(solucionClockNode.x);
                entidadSolucionClockNode.setCoordenadaY(solucionClockNode.y);
                entidadSolucionClockNode.setActivo(true); // O el valor que desees
                solucionClockNodeRepository.save(entidadSolucionClockNode);
            }
        }

        return geneticAlgorithmVRP.getSolucion().solucionToJson();
    }

    public Solucion obtenerSolucionDesdeBaseDeDatos() {
        Solucion solucion = new Solucion();
        solucion.elementosEstaticosTemporales = obtenerSolucionNodosDesdeBaseDeDatos();
        solucion.elementosEnCadaClock = obtenerSolucionClocksDesdeBaseDeDatos();
        return solucion;
    }

    private ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionNodo> obtenerSolucionNodosDesdeBaseDeDatos() {
        List<SolucionNodo> solucionNodoList = solucionNodoRepository.findAll();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionNodo> solucionNodos = new ArrayList<>();

        for (SolucionNodo solucionNodo : solucionNodoList) {
            pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionNodo nodo = new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionNodo();
            nodo.tipo = solucionNodo.getTipo().charAt(0);
            nodo.id = solucionNodo.getIdString();
            nodo.x = solucionNodo.getX();
            nodo.y = solucionNodo.getY();
            //nodo.inicio = solucionNodo.getInicio();
            //nodo.fin = solucionNodo.getFin();
            solucionNodos.add(nodo);
        }

        return solucionNodos;
    }

    private ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock> obtenerSolucionClocksDesdeBaseDeDatos() {
        List<SolucionClock> solucionClockList = solucionClockRepository.findAll();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock> solucionClocks = new ArrayList<>();

        for (SolucionClock solucionClock : solucionClockList) {
            pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock clock = new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock();
            clock.clock = solucionClock.getClock();
            clock.nodos = obtenerSolucionClockNodesDesdeBaseDeDatos(solucionClock.getId());
            solucionClocks.add(clock);
        }

        return solucionClocks;
    }

    private ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode> obtenerSolucionClockNodesDesdeBaseDeDatos(Integer solucionClockId) {
        List<SolucionClockNode> solucionClockNodeList = solucionClockNodeRepository.findByFidSolucionClockId(solucionClockId);
        ArrayList<solucionClockNode> solucionClockNodes = new ArrayList<>();

        for (SolucionClockNode solucionClockNode : solucionClockNodeList) {
            solucionClockNode nodo = new solucionClockNode();
            nodo.x = solucionClockNode.getCoordenadaX();
            nodo.y = solucionClockNode.getCoordenadaY();
            nodo.idPedido = solucionClockNode.getIdPedido();
            nodo.placa = solucionClockNode.getPlaca();
            solucionClockNodes.add(nodo);
        }

        return solucionClockNodes;
    }

    public String pedidosClock(MultipartFile file, int clock, Date FechaEntrada) throws Exception {
        String mensaje = cargaMasivaDePedidos(file);


        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportanteC();
        ArrayList<NodePlanificacion> nodes = new ArrayList<>();
        for (Object[] result : resultList) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaOrigen((LocalDateTime) result[4]);
                node.setCantidad((Double) result[5]);
                node.setHoraDemandada((Integer) result[6]);
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList3 = nodeRepository.listarDataImportanteD();
        for (Object[] result : resultList3) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                //node.setCapacidad((Double) result[4]);
                if(i==0) node.setCapacidad(10000);
                else node.setCapacidad(500);
                i++;
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]>resultList4 = nodeRepository.listarDataImportanteB();
        for (Object[] result : resultList4) {
            NodePlanificacion node = new NodePlanificacion();
            if(result[0] != null){

                //ZoneId zonaHoraria = ZoneId.of("America/Lima");
                //ZonedDateTime zonedDateTime = result[4].toInstant().atZone(zonaHoraria);
                //LocalDateTime fechaInicio = zonedDateTime.toLocalDateTime();
                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                node.setFechaInicio(String.valueOf(result[4]));
                node.setFechaFinal(String.valueOf(result[5]));
                node.setActivo(true);
                nodes.add(node);
            }
        }

        List<Object[]> resultList2 = vehicleRepository.listarDataImportanteVehiculo();
        ArrayList<pe.com.pucp.DP15E.model.VehiclePlanificacion> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle = new VehiclePlanificacion();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((String) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle> vehiclesAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> ordersAlgorit = new ArrayList<>();
        ArrayList<pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node> blocksAlgorit = new ArrayList<>();

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='C'){
                ordersAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node("C" + order.getId() , order.getX(), order.getY(), order.getCantidad(), Timestamp.valueOf(order.getFechaOrigen()), Timestamp.valueOf(order.getFechaOrigen().plusHours(order.getHoraDemandada()))));
            }
        }

        for (pe.com.pucp.DP15E.model.NodePlanificacion order : nodes) {
            if(order.getTipo()=='B'){
                blocksAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node(order.getId(), order.getX(), order.getY(), Timestamp.valueOf(order.getFechaInicio()),  Timestamp.valueOf(order.getFechaFinal())) );
            }
        }
        for (pe.com.pucp.DP15E.model.VehiclePlanificacion vehicle : vehicles) {
            vehiclesAlgorit.add(new pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Vehicle( vehicle.getId() , vehicle.getType().charAt(1), vehicle.getX(), vehicle.getY(), vehicle.getPesoBruto(),
                    vehicle.getCargaGLP(),vehicle.getPesoNeto(),vehicle.getVelocidad(),vehicle.getCargaPetroleo(),vehicle.getTotalTime(),vehicle.getMantenimiento()));

        }
        GeneticAlgorithmVRP geneticAlgorithmVRP = new GeneticAlgorithmVRP(ordersAlgorit,vehiclesAlgorit,blocksAlgorit);
        //Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));
        if(solucionNodoRepository.count() != 0){
            solucionNodoRepository.deleteAll();
        }
        if(solucionClockNodeRepository.count()!=0 ){
            solucionClockNodeRepository.deleteAll();
        }
        if(solucionClockRepository.count()!=0 ){
            solucionClockRepository.deleteAll();
        }

        Solucion solucion = new Solucion();
        // Mapeo de SolucionNodoAlgoritmo a SolucionNodoModel y guardado en BD
        solucion = geneticAlgorithmVRP.getSolucion();

        solucion.elementosEstaticosTemporales.forEach(solucionNodo -> {
            //SolucionNodo solucionNodoSol = SolucionNodo.fromSolucionNodo(solucionNodo);
            //solucionNodoRepository.save(solucionNodoSol);
        });


        for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionClock solucionClock : solucion.elementosEnCadaClock) {
            // Guardar en la tabla solucionClock
            SolucionClock entidadSolucionClock = new SolucionClock();
            entidadSolucionClock.setClock(solucionClock.clock);
            entidadSolucionClock.setActivo(true); // O el valor que desees
            SolucionClock solucionClockGuardado = solucionClockRepository.save(entidadSolucionClock);

            // Guardar en la tabla solucionClockNode
            for (pe.com.pucp.DP15E.GeneticAlgorithms.Problem.solucionClockNode solucionClockNode : solucionClock.nodos) {
                SolucionClockNode entidadSolucionClockNode = new SolucionClockNode();
                entidadSolucionClockNode.setFidSolucionClock(solucionClockGuardado);
                entidadSolucionClockNode.setPlaca(solucionClockNode.placa);
                entidadSolucionClockNode.setIdPedido(solucionClockNode.idPedido);
                entidadSolucionClockNode.setCoordenadaX(solucionClockNode.x);
                entidadSolucionClockNode.setCoordenadaY(solucionClockNode.y);
                entidadSolucionClockNode.setActivo(true); // O el valor que desees
                solucionClockNodeRepository.save(entidadSolucionClockNode);
            }
        }

        return geneticAlgorithmVRP.getSolucion().solucionToJson();
    }
}
