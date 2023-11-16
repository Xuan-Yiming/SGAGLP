package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pe.com.pucp.DP15E.model.Cliente;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.repository.ClienteRepository;
import pe.com.pucp.DP15E.repository.VehicleRepository;

import java.util.List;

@Component
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

}
