package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.model.ImputData;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.SimulationRequest;
import pe.com.pucp.DP15E.service.NodeService;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RestController
@RequestMapping(path = "api/v1/node")
public class NodeController {
    private final NodeService nodeService;
    @Autowired
    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }
    /*
    @PostMapping("/cargaMasivaDePedidos")
    public String cargaMasivaP(@RequestParam("file") MultipartFile file){
        return nodeService.cargaMasivaDePedidos(file);
    }*/
    /*
    @PostMapping("/cargaMasivaDeBloqueos")
    public String cargaMasivaB(@RequestParam("file") MultipartFile file){
        return nodeService.cargaMasivaDeBloqueos(file);
    }*/

    @GetMapping(path ="/listarDatosImportantesNode")
    public List<Node> ListarDatosImportantesNode(){
        return nodeService.ListarDatosImportantesNode();
    }

    /*@GetMapping(path ="/listarDataResultadoAlgoritmo")
    public String listarDataResultadoAlgoritmo(@RequestParam("file") MultipartFile file){
        return nodeService.ListarDataResultadoAlgoritmo();
    }*/

    /*@GetMapping(path ="/listarDataResultadoAlgoritmo2")
    public String listarDataResultadoAlgoritmo2(){
        return nodeService.ListarDataResultadoAlgoritmo2();
    }
*/
    /*@PostMapping(path ="/algoritmoSimulacion2")
    public String algoritmoSimulacion2(@RequestParam("date") Date date ,@RequestParam("fileP") MultipartFile fileP,@RequestParam("fileB") MultipartFile fileB,
    @RequestParam("fileV") MultipartFile fileV) throws Exception {
        return nodeService.algoritmoSimulacion(date,fileP,fileB,fileV);
    }
*/
    @PostMapping(path ="/algoritmoSimulacionOficial")
    public String algoritmoSimulacion(@RequestBody SimulationRequest information ) throws Exception {
        return nodeService.algoritmoSimulacion(information);
    }
    /*@GetMapping(path ="/listarDataResultadoAlgoritmo4")
    public String listarDataResultadoAlgoritmo4(){
        return nodeService.ListarDataResultadoAlgoritmo4();
    }
*/

    @GetMapping(path ="/mantenimientoPedidos/{busqueda}{page}{pageSize}")
    public ResponseEntity< Map<String, Object>> buscarPedidos(
            @RequestParam String busqueda,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {


        Map<String, Object>  pedidoResponse= nodeService.buscarPedidos(busqueda, page, pageSize);
        return new ResponseEntity<>(pedidoResponse, HttpStatus.OK);
    }

    /*@PostMapping(value = "/algoritmoPlanificacion" ,  consumes = "multipart/form-data")
    public String algoritmoPlanificacion(@RequestBody ImputData inputData, @RequestParam("fileP") MultipartFile fileP,@RequestParam("fileB") MultipartFile fileB,
                                         @RequestParam("fileV") MultipartFile fileV)throws Exception  {

        return nodeService.algoritmoPlanificacion(inputData,fileP,fileB,fileV);
    }*/
/*
    @GetMapping(path ="/mantenimientoPedidos/{parametro}/{page}/{pageSize}")
    public ResponseEntity<Map<String, Object>> mantenimientoPedidos(@RequestParam String parametro, @RequestParam int page, @RequestParam int pageSize) {
        Map<String, Object> response = nodeService.buscarPedidos(parametro, page, pageSize);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
*/

}
