package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.model.Cliente;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.Vehicle;
import pe.com.pucp.DP15E.repository.NodeRepository;
import pe.com.pucp.DP15E.repository.VehicleRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> ListarDatosImportantesVehiculo(){
        List<Vehicle> lista = new ArrayList<>();
        lista = vehicleRepository.listarDatosImportantesVehiculo();
        return  lista;
    }

    public List<Vehicle> listarDataImportanteVehiculo(){
        List<Object[]> resultList = vehicleRepository.listarDataImportanteVehiculo();
        List<Vehicle> vehicles = new ArrayList<>();

        for (Object[] result : resultList) {
            Vehicle vehicle = new Vehicle();
            vehicle.setId((Integer) result[0]);
            vehicle.setX((Integer) result[1]);
            vehicle.setY((Integer) result[2]);
            vehicle.setTotalTime((Integer) result[3]);
            vehicle.setType((String) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }

        return vehicles;
    }

    public  String cargaMasivaDeFlotas(MultipartFile file){


        List<Vehicle> lista = vehicleRepository.findAll();
        int encontrado,anho=0,mes=0,dia=0;
        if(file.isEmpty()){
            return "El archivo está vacio";
        }
        try(BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            //String fileName = file.getOriginalFilename();

            String line;
            List<Vehicle> ListaVehicle = new ArrayList<>();
            //br.readLine();
            while((line=br.readLine())!=null){
                String[] data = line.split(getSeparator(line));
                Vehicle vehicle = new Vehicle();
                if(data.length >=2){
                    // Extrae el año y el mes del nombre del archivo
                    if (data[0].length() >= 8) {
                        anho = Integer.parseInt(data[0].substring(0, 4)); // Extraer los 4 primeros caracteres como el año
                        mes = Integer.parseInt(data[0].substring(4, 6)); // Extraer los siguientes 2 caracteres como el mes
                        dia = Integer.parseInt(data[0].substring(6, 8));
                    }
                    String tipoV = data[1];
                    String tipo = data[1].substring(0, 2);
                    String typeA = "TA",typeB = "TB",typeC = "TC",typeD = "TD";
                    double pesoBrutoB=2,pesoBrutoA=2.5,pesoBrutoC=1.5,pesoBrutoD=1,
                            cargaGLPB=15,cargaGLPA=25,cargaGLPC=10,cargaGLPD=5,
                            pesoCargaGLPB=7.5,pesoCargaGLPA=12.5,pesoCargaGLPC=5,pesoCargaGLPD=2.5;
                    int unidadA=2,unidadB=4,unidadC=4,unidadD=10;
                    Calendar calendar = Calendar.getInstance();
                    calendar.set(anho, mes, dia);
                    vehicle.setMantenimiento(calendar.getTime());
                    vehicle.setType(tipoV);
                    // Comparar si dos cadenas son iguales sin importar mayúsculas y minúsculas
                    if (tipo.equalsIgnoreCase(typeA)) {
                        vehicle.setPesoBruto(2.5);
                        vehicle.setCargaGLP(25.0);
                        vehicle.setPesoNeto(15.0);

                    } else if(tipo.equalsIgnoreCase(typeB)) {
                        vehicle.setPesoBruto(2.5);
                        vehicle.setCargaGLP(25.0);
                        vehicle.setPesoNeto(15.0);

                    }else if(tipo.equalsIgnoreCase(typeC)){

                    }else if(tipo.equalsIgnoreCase(typeD)){

                    }

                    vehicle.setActivo(true);

                }
                encontrado = buscarRepetidos(vehicle,lista);
                if(encontrado==0){
                    ListaVehicle.add(vehicle);
                }


            }

            if (!ListaVehicle.isEmpty()) {
                // Guardar manualmente en la base de datos
                    saveVehiclesToDatabase(ListaVehicle);
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

    public int buscarRepetidos(Vehicle abuscar, List<Vehicle> lista){
        if((lista.size())==0) return 0;
        for (Vehicle cal: lista) {
            if(
                    (cal.getType().equals(abuscar.getType()) &&
                    (cal.getX() == (abuscar.getX())) &&
                            (cal.getY() == (abuscar.getY())) &&
                            (cal.getMantenimiento()==abuscar.getMantenimiento()))){
                return 1;
            }

        }


        return  0;
    }



    private void saveVehiclesToDatabase(List<Vehicle> vehicles) {
        String jdbcUrl = "jdbc:mysql://dp1-e5.cydpwedqgd2o.us-east-1.rds.amazonaws.com:3306/DP1E5?useSSL=false";
        String username = "admin";
        String password = "12345678";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            for (Vehicle vehicle : vehicles) {
                // Insertar vehicle_simulacion
                insertVehicleSimulacion(connection, vehicle);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
    }



    private void insertVehicleSimulacion(Connection connection, Vehicle vehicle) throws SQLException {
        String sql = "INSERT INTO vehiculo_simulacion (coordenadaX, coordenadaY, peso_bruto, carga_GLP,peso_neto,carga_petroleo,velocidad,mantenimiento," +
                "tiempo_total,tipo, activo) " +
                "VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            // Puedes configurar las fechas, coordenadas y otros campos aquí




            preparedStatement.setInt(1,vehicle.getX());
            preparedStatement.setInt(2, vehicle.getY());
            preparedStatement.setBigDecimal(3, BigDecimal.valueOf(vehicle.getPesoBruto()));
            preparedStatement.setBigDecimal(4, BigDecimal.valueOf(vehicle.getCargaGLP()));
            preparedStatement.setBigDecimal(5, BigDecimal.valueOf(vehicle.getPesoNeto()));
            preparedStatement.setBigDecimal(6, BigDecimal.valueOf(vehicle.getCargaPetroleo()));
            preparedStatement.setBigDecimal(7, BigDecimal.valueOf(vehicle.getVelocidad()));
            preparedStatement.setTimestamp(8, ( new Timestamp(vehicle.getMantenimiento().getTime())));
            preparedStatement.setInt(9,  vehicle.getTotalTime());
            preparedStatement.setString(10, vehicle.getType()); // Obtener el último ID insertado en cliente_simulacion
            preparedStatement.setBoolean(11,  vehicle.isActivo());
            preparedStatement.executeUpdate();
        }
    }
    private int getLastInsertedVehicleID(Connection connection) {
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

}
