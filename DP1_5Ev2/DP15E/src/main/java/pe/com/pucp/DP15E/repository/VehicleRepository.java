package pe.com.pucp.DP15E.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.com.pucp.DP15E.model.Vehicle;

import java.util.List;

@Repository
public interface VehicleRepository  extends JpaRepository<Vehicle,Integer> {

    @Query(value = "SELECT v.id, v.x, v.y, v.totalTime FROM Vehicle v " +
           "WHERE v.activo = true ")
    public List<Vehicle> listarDatosImportantesVehiculo();

}
