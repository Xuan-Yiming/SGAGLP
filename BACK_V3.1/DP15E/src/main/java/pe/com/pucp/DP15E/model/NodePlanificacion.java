package pe.com.pucp.DP15E.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
//@NoArgsConstructor
@Data
@Entity(name="NodePlanificacion")
@Table(name="nodo_planificacion")
@SecondaryTable(name = "pedido_planificacion", pkJoinColumns = @PrimaryKeyJoinColumn(name = "fid_nodo"))
@SecondaryTable(name = "depot_planificacion", pkJoinColumns = @PrimaryKeyJoinColumn(name = "fid_nodo"))
@SecondaryTable(name = "bloqueo_planificacion", pkJoinColumns = @PrimaryKeyJoinColumn(name = "fid_nodo"))
public class NodePlanificacion  implements Serializable, Cloneable{
    private static final Integer serialVersionUID= 1;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_nodo")
    private Integer id;
    @Column(name="coordenadaX")
    private int x;
    @Column(name="coordenadaY")
    private int y;
    //private Point posicion;
    @Column(name="tipo")
    private char tipo; // C: Customer, D: Depot, B: Block




    @Column(name = "activo")
    private boolean activo;
    // Block

    @Column(name = "fecha_inicio", table = "bloqueo_planificacion")
    private String fechaInicio;

    @Column(name = "fecha_final", table = "bloqueo_planificacion")
    private String fechaFinal;

    // Customer

    @Column(name = "cantidad", table = "pedido_planificacion")
    private Double cantidad;

    @Column(name = "fid_cliente", table = "pedido_planificacion")
    private String idCliente;

    @Column(name = "fecha_origen", table = "pedido_planificacion")
    private LocalDateTime fechaOrigen;

    @Column(name = "hora_demandada", table = "pedido_planificacion")
    private Integer horaDemandada;
    // Depot

    @Column(name = "capacidad", table = "depot_planificacion")
    private Double capacidad;


    // Constructor
    public NodePlanificacion(int x, int y,String fechaInicio,String fechaFinal) {
        // Block
        //this.posicion = new Point(x, y);
        this.x=x;
        this.y=y;
        this.tipo = 'B';
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
    }


    public NodePlanificacion(int x, int y, double cantidad,
                LocalDateTime fechaOrigen, String idCliente, int horaDemandada) {
        // Customer

        //this.id = id;
        //this.posicion = new Point(x, y);
        this.x=x;
        this.y=y;
        this.tipo = 'C';
        this.cantidad = cantidad;
        //this.fechaInicio = fechaInicio;
        //this.fechaFinal = fechaFinal;
        this.fechaOrigen = fechaOrigen;
        this.idCliente = idCliente;
        this.horaDemandada = horaDemandada;
    }

    public NodePlanificacion(){
        this.id = 0;
        //this.posicion = new Point(x, y);
        this.x=0;
        this.y=0;
        this.tipo = 'A';
        this.cantidad = 0.0;
        this.activo = false;
        this.capacidad=0.0;
        //this.fechaInicio = LocalDateTime.of(2023, 1, 1, 0, 0, 0);
        //this.fechaFinal = LocalDateTime.of(2023, 1, 1, 0, 0, 0);
        this.fechaInicio = "2023-01-01 00:00:00";
        this.fechaFinal = "2023-01-01 00:00:00";
        this.fechaOrigen = LocalDateTime.of(2023, 1, 1, 0, 0, 0);
        this.idCliente = " ";
        this.horaDemandada = 0;
    }
    public NodePlanificacion(int x, int y, double capacidad) {

        // Depot
        //this.posicion = new Point(x, y);
        this.x=x;
        this.y=y;
        this.tipo = 'D';
        this.capacidad = capacidad;
        //this.fechaInicio = new Date();
        //this.fechaFinal = new Date();
    }

    @Override
    public Node clone() {
        try {
            return (Node) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();  // This should not happen.
        }
    }

    //getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    //public Point getPosicion() {
    //    return posicion;
    //}

    //public void setPosicion(Point posicion) {
    //   this.posicion = posicion;
    //}

    public char getTipo() {
        return tipo;
    }

    public void setTipo(char tipo) {
        this.tipo = tipo;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(String fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public double getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(double capacidad) {
        this.capacidad = capacidad;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public LocalDateTime getFechaOrigen() {
        return fechaOrigen;
    }

    public void setFechaOrigen(LocalDateTime fechaOrigen) {
        this.fechaOrigen = fechaOrigen;
    }

    public Integer getHoraDemandada() {
        return horaDemandada;
    }

    public void setHoraDemandada(Integer horaDemandada) {
        this.horaDemandada = horaDemandada;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
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
}
