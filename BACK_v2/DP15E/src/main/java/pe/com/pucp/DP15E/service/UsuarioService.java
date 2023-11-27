package pe.com.pucp.DP15E.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pe.com.pucp.DP15E.repository.UsuarioRepository;
import pe.com.pucp.DP15E.model.Usuario;

import java.util.Optional;

@Component
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    public Optional<Usuario> getUserByUsername(String username) {
        return usuarioRepository.getUserByUsername(username);
    }

    public Optional<Usuario> getUserByID(int ID) {
        return usuarioRepository.getUserByID(ID);
    }

    public boolean login(String username, String password) {
        Usuario usuario = usuarioRepository.getUserByUsernameAndPassword(username, password);
        return usuario != null; // Si el usuario no es nulo, entonces las credenciales son válidas
    }
}
