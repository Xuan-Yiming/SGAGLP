package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.model.Vehicle;
import pe.com.pucp.DP15E.service.NodeService;
import pe.com.pucp.DP15E.service.VehicleService;

import java.util.List;

@Service
@RestController
@RequestMapping(path = "api/v1/vehicle")
public class VehicleController {

    private final VehicleService vehicleService;
    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping(path ="/listarDatosImportantesVehiculo")
    public List<Vehicle> ListarDatosImportantesVehiculo(){
        return vehicleService.ListarDatosImportantesVehiculo();
    }

    /*@PostMapping("/cargaMasivaDeFlotas")
    public String cargaMasivaF(@RequestParam("file") MultipartFile file){
        return vehicleService.cargaMasivaDeFlotas(file);
    }*/
}
