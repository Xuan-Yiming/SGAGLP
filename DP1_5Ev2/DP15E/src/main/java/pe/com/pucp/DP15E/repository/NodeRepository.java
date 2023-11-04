package pe.com.pucp.DP15E.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.Vehicle;

import java.util.List;

@Repository
public interface NodeRepository  extends JpaRepository<Node,Integer> {
    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal, n.fechaOrigen, n.fechaOrigen FROM Node n WHERE n.activo = true")
    List<Object[]> listarDatosImportantesNode();
    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal, n.fechaOrigen, n.cantidad,n.capacidad,n.horaDemandada FROM Node n WHERE n.activo = true")
    List<Object[]> listarDataImportante();
}

