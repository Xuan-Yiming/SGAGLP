package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.SolucionClockNode;

import java.util.List;

@Repository
public interface SolucionClockNodeRepository extends JpaRepository<SolucionClockNode,Integer> {
    List<SolucionClockNode> findByFidSolucionClockId(Integer solucionClockId);
}
