package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.model.VehiclePlanificacion;
import pe.com.pucp.DP15E.service.VehiclePlanificacionService;

import java.util.List;

@Service
@RestController
@RequestMapping(path = "api/v1/vehiclePlanificacion")
public class VehiclePlanificacionController {
    private final VehiclePlanificacionService vehicleService;
    @Autowired
    public VehiclePlanificacionController(VehiclePlanificacionService vehicleService) {
        this.vehicleService = vehicleService;

    }


    @GetMapping(path ="/listarDatosImportantesVehiculo")
    public List<VehiclePlanificacion> ListarDatosImportantesVehiculo(){
        return vehicleService.listarDataImportanteVehiculo();
    }

    @PostMapping("/cargaMasivaDeFlotas")
    public String cargaMasivaF(@RequestParam("file") MultipartFile file){
        return vehicleService.cargaMasivaDeFlotas(file);
    }
}
