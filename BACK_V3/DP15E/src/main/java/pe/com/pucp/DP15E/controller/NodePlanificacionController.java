package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.service.NodePlanificacionService;

import java.sql.Date;


@Service
@RestController
@RequestMapping(path = "api/v1/nodePlanificacion")
public class NodePlanificacionController {
    private final NodePlanificacionService nodeService;
    @Autowired
    public NodePlanificacionController(NodePlanificacionService nodeService) {
        this.nodeService = nodeService;
    }
    @PostMapping("/cargaMasivaDePedidos")
    public String cargaMasivaP(@RequestParam("file") MultipartFile file){
        return nodeService.cargaMasivaDePedidos(file);
    }

    @PostMapping("/cargaMasivaDeBloqueos")
    public String cargaMasivaB(@RequestParam("file") MultipartFile file){
        return nodeService.cargaMasivaDeBloqueos(file);
    }
    @PostMapping(path ="/algoritmoPlanificacion/{date}")
    public String algoritmoSimulacion(@RequestParam("date") Date date) throws Exception {
        return nodeService.algoritmoPlanificacion(date);
    }

    @PostMapping(path ="/pedidosTik")
    public String pedidosTik(@RequestParam("file") MultipartFile file,@RequestParam("clock") int clock,@RequestParam("date") Date date) throws Exception {
        return nodeService.pedidosTik(file,clock,date);
    }

    @PostMapping(path ="/pedidosClock")
    public String pedidosClock(@RequestParam("file") MultipartFile file,@RequestParam("clock") int clock,@RequestParam("date") Date date) throws Exception {
        return nodeService.pedidosClock(file,clock,date);
    }
}
