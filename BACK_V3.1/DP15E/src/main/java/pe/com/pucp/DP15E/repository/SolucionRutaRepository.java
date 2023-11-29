package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.SolucionRuta;
@Repository
public interface SolucionRutaRepository extends JpaRepository<SolucionRuta,Integer> {

}
