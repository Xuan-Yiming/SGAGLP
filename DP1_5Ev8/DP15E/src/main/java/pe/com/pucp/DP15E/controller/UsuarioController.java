package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.com.pucp.DP15E.service.UsuarioService;
import pe.com.pucp.DP15E.model.Usuario;

@Service
@RestController
@RequestMapping(path = "api/v1/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/getUserByUsername/{username}")
    public Usuario getUserByUsername(@PathVariable String username) {
        return usuarioService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @GetMapping("/getUserByID/{id}")
    public Usuario getUserByID(@PathVariable int id) {
        return usuarioService.getUserByID(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

}
