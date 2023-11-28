package pe.com.pucp.DP15E.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SolucionRuta")
@Table(name="solucionRuta")

public class SolucionRuta implements Cloneable {
    private static final Integer serialVersionUID= 1;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_solucionRuta")
    private Integer id;
    @Column(name="coordenadaX")
    private int x;
    @Column(name="coordenadaY")
    private int y;

    @Column(name="placa")
    private String placa;
    @Column(name="id_pedido")
    private String idPedido;
    @Column(name="time")
    private int time;
    @Column(name = "activo")
    private boolean activo;

    /*
    public static SolucionRuta fromSolucionRuta(pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionRuta solucionRutaAlgoritmo) {
        SolucionRuta solucionRuta = new SolucionRuta();
        solucionRuta.setX(solucionRutaAlgoritmo.getX());
        solucionRuta.setY(solucionRutaAlgoritmo.getY());
        solucionRuta.setPlaca( String.valueOf(solucionRutaAlgoritmo.getPlaca()));
        solucionRuta.setIdPedido(solucionRutaAlgoritmo.getIdPedido());
        solucionRuta.setTime(solucionRutaAlgoritmo.getTime());
        return solucionRuta;
    }*/

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
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

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
