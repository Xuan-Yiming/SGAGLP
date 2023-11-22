package pe.com.pucp.DP15E.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.Node;
import pe.com.pucp.DP15E.model.Vehicle;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface NodeRepository  extends JpaRepository<Node,Integer> {
    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal, n.fechaOrigen, n.fechaOrigen FROM Node n WHERE n.activo = true")
    List<Object[]> listarDatosImportantesNode();
    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal, n.fechaOrigen, n.cantidad,n.capacidad,n.horaDemandada FROM Node n WHERE n.activo = true")
    List<Object[]> listarDataImportante();
    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaOrigen, n.cantidad,n.horaDemandada FROM Node n WHERE n.activo = true and n.tipo = 'C' ")
    List<Object[]> listarDataImportanteC();

    @Query("SELECT n.id, n.x, n.y, n.tipo, n.fechaInicio, n.fechaFinal FROM Node n WHERE n.activo = true and n.tipo = 'B'")
    List<Object[]> listarDataImportanteB();

    @Query("SELECT n.id, n.x, n.y, n.tipo, n.capacidad FROM Node n WHERE n.activo = true and n.tipo = 'D'")
    List<Object[]>listarDataImportanteD();


    @Query("SELECT p.id, p.x, p.y, p.idCliente, p.fechaOrigen, p.cantidad, p.horaDemandada " +
            "FROM Node p " +
            "WHERE p.id = :parametro OR p.idCliente = :parametro OR p.fechaOrigen = :parametro and p.activo = true and p.tipo = 'C'"
            )
    List<Object[]> buscarPedidosPorParam(@Param("parametro") String parametro, Pageable pageable);

    @Query("SELECT COUNT(p.id) " +
            "FROM Node p " +
            "WHERE p.id = :parametro OR p.idCliente = :parametro OR p.fechaOrigen = :parametro and p.activo = true and p.tipo = 'C'"
            )
    long countPedidosPorParam(@Param("parametro") String parametro);

}

