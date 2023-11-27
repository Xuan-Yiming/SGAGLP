package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.com.pucp.DP15E.service.ClienteService;
import pe.com.pucp.DP15E.service.NodeService;

@Service
@RestController
@RequestMapping(path = "api/v1/cliente")
public class ClienteController {
    private final ClienteService clienteService;
    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

}
