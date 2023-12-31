package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.export.UnableToRegisterMBeanException;
import org.springframework.stereotype.Component;
import pe.com.pucp.DP15E.GeneticAlgorithms.GAProblem;
import pe.com.pucp.DP15E.GeneticAlgorithms.Individual;
import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Solucion;
import pe.com.pucp.DP15E.model.Cliente;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.Vehicle;
import pe.com.pucp.DP15E.repository.ClienteRepository;
import pe.com.pucp.DP15E.repository.NodeRepository;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.repository.VehicleRepository;

import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class NodeService {
    private final NodeRepository nodeRepository;
    private final ClienteRepository clienteRepository;
    private final VehicleRepository vehicleRepository;


    @Autowired
    public NodeService(NodeRepository nodeRepository, ClienteRepository clienteRepository, VehicleRepository vehicleRepository) {
        this.nodeRepository = nodeRepository;
        this.clienteRepository = clienteRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public String ListarDataResultadoAlgoritmo() {

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportante();
        ArrayList<Node> nodes = new ArrayList<>();



        for (Object[] result : resultList) {
            Node node = new Node();
            if(result[0] != null){

                node.setId((Integer) result[0]);
                node.setX((Integer) result[1]);
                node.setY((Integer) result[2]);
                node.setTipo((Character) result[3]);
                if(node.getTipo()=='C'){
                    //node.setFechaInicio((LocalDateTime) result[4]);
                    //node.setFechaFinal((LocalDateTime) result[5]);
                    node.setFechaOrigen((LocalDateTime) result[6]);
                    node.setCantidad((Double) result[7]);
                    //node.setCapacidad((Double) result[8]);
                    node.setHoraDemandada((Integer) result[9]);
                }else if(node.getTipo()=='D'){
                    //node.setFechaInicio((LocalDateTime) result[4]);
                    //node.setFechaFinal((LocalDateTime) result[5]);
                    //node.setFechaOrigen((LocalDateTime) result[6]);
                    //node.setCantidad((Double) result[7]);
                    if(i==0) node.setCapacidad(100000);
                    else node.setCapacidad(500);
                    //node.setHoraDemandada((Integer) result[9]);
                    i++;
                }else if(node.getTipo()=='B'){
                    //Timestamp timestamp = new Timestamp(((Date) result[4]).getTime());
                    //LocalDateTime localDateTime = timestamp.toLocalDateTime();
                    //node.setFechaInicio(localDateTime);
                    node.setFechaInicio(String.valueOf((LocalDateTime) result[4]));

                    node.setFechaFinal(String.valueOf((LocalDateTime) result[5]));
                    //node.setFechaOrigen((LocalDateTime) result[6]);
                    //node.setCantidad((Double) result[7]);
                    //node.setCapacidad((Double) result[8]);
                    //node.setHoraDemandada((Integer) result[9]);
                }

                node.setActivo(true);
                nodes.add(node);
            }

        }

        List<Object[]> resultList2 = vehicleRepository.listarDataImportanteVehiculo();
        ArrayList<pe.com.pucp.DP15E.model.Vehicle> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.Vehicle vehicle = new Vehicle();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((Character) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }


        Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));

        return solucion.elementosEstaticosTemporalesToJson();
    }

    public String ListarDataResultadoAlgoritmo2() {

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportante();
        ArrayList<Node> nodes = new ArrayList<>();



        for (Object[] result : resultList) {
            Node node = new Node();
            node.setId((Integer) result[0]);
            node.setX((Integer) result[1]);
            node.setY((Integer) result[2]);
            node.setTipo((Character) result[3]);
            if(node.getTipo()=='C'){
                //node.setFechaInicio((LocalDateTime) result[4]);
                //node.setFechaFinal((LocalDateTime) result[5]);
                node.setFechaOrigen((LocalDateTime) result[6]);
                node.setCantidad((Double) result[7]);
                //node.setCapacidad((Double) result[8]);
                node.setHoraDemandada((Integer) result[9]);
            }else if(node.getTipo()=='D'){
                //node.setFechaInicio((LocalDateTime) result[4]);
                //node.setFechaFinal((LocalDateTime) result[5]);
                //node.setFechaOrigen((LocalDateTime) result[6]);
                //node.setCantidad((Double) result[7]);
                if(i==0) node.setCapacidad(1000000000);
                else node.setCapacidad(500);
                //node.setHoraDemandada((Integer) result[9]);
            }else if(node.getTipo()=='B'){
                node.setFechaInicio(String.valueOf((LocalDateTime) result[4]));
                node.setFechaFinal(String.valueOf((LocalDateTime) result[5]));
                //node.setFechaOrigen((LocalDateTime) result[6]);
                //node.setCantidad((Double) result[7]);
                //node.setCapacidad((Double) result[8]);
                //node.setHoraDemandada((Integer) result[9]);
            }
            i++;
            node.setActivo(true);
            nodes.add(node);
        }

        List<Object[]> resultList2 = vehicleRepository.listarDataImportanteVehiculo();
        ArrayList<pe.com.pucp.DP15E.model.Vehicle> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.Vehicle vehicle = new Vehicle();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((Character) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }

        Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));

        return solucion.elementosCamionesToJson();
    }


    public String ListarDataResultadoAlgoritmo4() {

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportanteC();
        ArrayList<Node> nodes = new ArrayList<>();
        for (Object[] result : resultList) {
            Node node = new Node();
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
            Node node = new Node();
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
            Node node = new Node();
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
        ArrayList<pe.com.pucp.DP15E.model.Vehicle> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.Vehicle vehicle = new Vehicle();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((Character) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }


        Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));

        return solucion.elementosEstaticosTemporalesToJson();
    }


    public String ListarDataResultadoAlgoritmo3() {

        int i=0;
        List<Object[]> resultList = nodeRepository.listarDataImportanteC();
        ArrayList<Node> nodes = new ArrayList<>();
        for (Object[] result : resultList) {
            Node node = new Node();
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
            Node node = new Node();
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
            Node node = new Node();
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
        ArrayList<pe.com.pucp.DP15E.model.Vehicle> vehicles = new ArrayList<>();



        for (Object[] result : resultList2) {
            pe.com.pucp.DP15E.model.Vehicle vehicle = new Vehicle();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer)result[1]);
            vehicle.setY((Integer)result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((Character) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }


        Solucion solucion = new Solucion( new GAProblem(vehicles,nodes,1),new Individual(new GAProblem(vehicles,nodes,1)));

        return solucion.elementosCamionesToJson();
    }

    public  String cargaMasivaDePedidos(MultipartFile file){
        //private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd'd'HH'h'mm'm':");

        List<Node> lista = nodeRepository.findAll();
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
            List<Node> ListaNode = new ArrayList<>();
            //br.readLine();
            while((line=br.readLine())!=null){
                String[] data = line.split(getSeparator(line));
                Node node = new Node();
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
                encontrado = buscarRepetidos(node,lista);
                if(encontrado==0){
                    ListaNode.add(node);
                }


            }

            if (!ListaNode.isEmpty()) {
                // Guardar manualmente en la base de datos
                saveNodesToDatabase(ListaNode);
            }
            //NodeRepository.saveAllAndFlush(ListaNode);
            return "Archivo CSV cargado exitosamente";
        } catch (IOException e) {
            return "Error al cargar el archivo csv: "+ e.getMessage();
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

    public int buscarRepetidos(Node abuscar, List<Node> lista){
        if((lista.size())==0) return 0;
        for (Node cal: lista) {
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

    public int buscarRepetidosCliente(String abuscar, List<Cliente> lista){
        if((lista.size())==0) return 0;
        for (Cliente cal: lista) {
            if(
                    cal.getIdCliente().equals(abuscar) ){
                return 1;
            }

        }


        return  0;
    }


    private void saveNodesToDatabase(List<Node> nodes) {
        String jdbcUrl = "jdbc:mysql://dp1-e5.cydpwedqgd2o.us-east-1.rds.amazonaws.com:3306/DP1E5?useSSL=false";
        String username = "admin";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            for (Node node : nodes) {
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

    private void insertClienteSimulacion(Connection connection, Node node) throws SQLException {
        List<Cliente> lista = clienteRepository.findAll();
        int encontrado = 0;
        encontrado = buscarRepetidosCliente(node.getIdCliente(),lista);
        if(encontrado==0){
            String sql = "INSERT INTO cliente_simulacion (id_cliente,activo) VALUES (?,true)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, node.getIdCliente());
                preparedStatement.executeUpdate();
            }
        }

    }

    private void insertNodoSimulacion(Connection connection, Node node) throws SQLException {
        String sql = "INSERT INTO nodo_simulacion (coordenadaX, coordenadaY, tipo, activo) " +
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

    private void insertPedidoSimulacion(Connection connection, Node node) throws SQLException {
        String sql = "INSERT INTO pedido_simulacion (fid_nodo, fid_cliente, fecha_origen, " +
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

    private int getLastInsertedClienteID(Connection connection) {
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

        List<Node> lista = nodeRepository.findAll();
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
            List<Node> ListaNode = new ArrayList<>();
            //br.readLine();
            while((line=br.readLine())!=null){
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
                        Node node = new Node();
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

                }
            }

            if (!ListaNode.isEmpty()) {
                // Guardar manualmente en la base de datos
                saveNodesToDatabase2(ListaNode);
            }
            //NodeRepository.saveAllAndFlush(ListaNode);
            return "Archivo CSV cargado exitosamente";
        } catch (IOException e) {
            return "Error al cargar el archivo csv: "+ e.getMessage();
        }
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

    private void saveNodesToDatabase2(List<Node> nodes) {
        String jdbcUrl = "jdbc:mysql://dp1-e5.cydpwedqgd2o.us-east-1.rds.amazonaws.com:3306/DP1E5?useSSL=false";
        String username = "admin";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            for (Node node : nodes) {

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

    private void insertBloqueoSimulacion(Connection connection, Node node) throws SQLException {
        String sql = "INSERT INTO bloqueo_simulacion (fid_nodo, fecha_inicio , fecha_final, " +
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
    public List<Node> ListarDatosImportantesNode(){
        List<Object[]> resultList = nodeRepository.listarDatosImportantesNode();
        List<Node> nodes = new ArrayList<>();

        for (Object[] result : resultList) {
            Node node = new Node();
            node.setId((Integer) result[0]);
            node.setX((Integer) result[1]);
            node.setY((Integer) result[2]);
            node.setTipo((Character) result[3]);
            nodes.add(node);
        }

        return nodes;
    }
}


