package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.NodePlanificacion;

import java.util.List;
@Repository

public interface NodePlanificacionRepository   extends JpaRepository<NodePlanificacion,Integer> {

    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaOrigen, n.cantidad,n.horaDemandada FROM NodePlanificacion n WHERE n.activo = true and n.tipo = 'C' ")
    List<Object[]> listarDataImportanteC();

    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal FROM NodePlanificacion n WHERE n.activo = true and n.tipo = 'B'")
    List<Object[]> listarDataImportanteB();

    @Query("SELECT n.id, n.x, n.y, n.tipo, n.capacidad FROM NodePlanificacion n WHERE n.activo = true and n.tipo = 'D'")
    List<Object[]>listarDataImportanteD();

}
