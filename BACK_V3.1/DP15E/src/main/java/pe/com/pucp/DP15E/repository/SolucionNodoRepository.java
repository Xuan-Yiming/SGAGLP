package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.SolucionNodo;
@Repository
public interface SolucionNodoRepository extends JpaRepository<SolucionNodo,Integer> {

}
