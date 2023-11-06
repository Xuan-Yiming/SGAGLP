package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.service.NodeService;

import java.util.List;

@Service
@RestController
@RequestMapping(path = "api/v1/node")
public class NodeController {
    private final NodeService nodeService;
    @Autowired
    public NodeController(NodeService nodeService) {
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

    @GetMapping(path ="/listarDatosImportantesNode")
    public List<Node> ListarDatosImportantesNode(){
        return nodeService.ListarDatosImportantesNode();
    }

    @GetMapping(path ="/listarDataResultadoAlgoritmo")
    public String listarDataResultadoAlgoritmo(){
        return nodeService.ListarDataResultadoAlgoritmo();
    }

    @GetMapping(path ="/listarDataResultadoAlgoritmo2")
    public String listarDataResultadoAlgoritmo2(){
        return nodeService.ListarDataResultadoAlgoritmo2();
    }

    @GetMapping(path ="/listarDataResultadoAlgoritmo3")
    public String listarDataResultadoAlgoritmo3(){
        return nodeService.ListarDataResultadoAlgoritmo3();
    }

    @GetMapping(path ="/listarDataResultadoAlgoritmo4")
    public String listarDataResultadoAlgoritmo4(){
        return nodeService.ListarDataResultadoAlgoritmo4();
    }

}
