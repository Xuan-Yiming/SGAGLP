package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
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

}
