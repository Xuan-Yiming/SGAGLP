package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.Vehicle;
import pe.com.pucp.DP15E.repository.NodeRepository;
import pe.com.pucp.DP15E.repository.VehicleRepository;

import java.util.ArrayList;
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
            vehicle.setType((Character) result[4]);
            vehicle.setCargaGLP((Double) result[5]);
            vehicle.setCargaPetroleo((Double) result[6]);
            vehicle.setPesoBruto((Double) result[7]);
            vehicle.setPesoNeto((Double) result[8]);
            vehicle.setVelocidad((Double) result[9]);
            vehicles.add(vehicle);
        }

        return vehicles;
        }

}
