package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.com.pucp.DP15E.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
    @Query("SELECT new Usuario(u.id, u.username, u.password) FROM Usuario u WHERE u.username = :username")
    Optional<Usuario> getUserByUsername(@Param("username") String username);

    @Query("SELECT new Usuario(u.id, u.username, u.password) FROM Usuario u WHERE u.id = :ID")
    Optional<Usuario> getUserByID(@Param("ID") int ID);
}
