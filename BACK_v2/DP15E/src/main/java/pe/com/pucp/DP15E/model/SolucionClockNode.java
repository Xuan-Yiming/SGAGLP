package pe.com.pucp.DP15E.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SolucionClockNode")
@Table(name="solucion_clock_node")
public class SolucionClockNode  implements Cloneable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solucion_clock_node")
    private Integer idSolucionClockNode;

    @ManyToOne
    @JoinColumn(name = "fid_solucion_clock")
    private SolucionClock fidSolucionClock;

    @Column(name = "placa")
    private String placa;

    @Column(name = "id_pedido")
    private String idPedido;

    @Column(name = "coordenadaX")
    private Integer coordenadaX;

    @Column(name = "coordenadaY")
    private Integer coordenadaY;

    @Column(name = "activo")
    private Boolean activo;

    // Otros atributos y métodos getter/setter según sea necesario

    public Integer getIdSolucionClockNode() {
        return idSolucionClockNode;
    }

    public void setIdSolucionClockNode(Integer idSolucionClockNode) {
        this.idSolucionClockNode = idSolucionClockNode;
    }

    public SolucionClock getFidSolucionClock() {
        return fidSolucionClock;
    }

    public void setFidSolucionClock(SolucionClock fidSolucionClock) {
        this.fidSolucionClock = fidSolucionClock;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(String idPedido) {
        this.idPedido = idPedido;
    }

    public Integer getCoordenadaX() {
        return coordenadaX;
    }

    public void setCoordenadaX(Integer coordenadaX) {
        this.coordenadaX = coordenadaX;
    }

    public Integer getCoordenadaY() {
        return coordenadaY;
    }

    public void setCoordenadaY(Integer coordenadaY) {
        this.coordenadaY = coordenadaY;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
