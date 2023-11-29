package pe.com.pucp.DP15E.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
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
    /*
    @GetMapping("/login/{username}/{password}")
    public Usuario login(@PathVariable("username") String username,
                         @PathVariable("password") String password) throws Exception{
        return usuarioService.login(username, password);
    }*/
    @GetMapping ("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        boolean loginExitoso = usuarioService.login(username, password);
        if (loginExitoso) {
            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
}
