package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.com.pucp.DP15E.model.Cliente;
import pe.com.pucp.DP15E.model.Vehicle;

public interface ClienteRepository extends JpaRepository<Cliente,String> {

}
