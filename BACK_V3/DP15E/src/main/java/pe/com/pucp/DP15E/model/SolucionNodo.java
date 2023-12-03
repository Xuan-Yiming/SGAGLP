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
@Entity(name="SolucionNodo")
@Table(name="solucion_nodo")
public class SolucionNodo implements Cloneable {
    private static final Integer serialVersionUID= 1;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_solucion_nodo")
    private Integer id;
    @Column(name="coordenadaX")
    private int x;
    @Column(name="coordenadaY")
    private int y;

    @Column(name="tipo")
    private String tipo;
    @Column(name="id_string")
    private String idString;
    @Column(name="inicio")
    private int inicio;
    @Column(name="fin")
    private int fin;
    @Column(name = "activo")
    private boolean activo;

/*
    public static SolucionNodo fromSolucionNodo(pe.com.pucp.DP15E.GeneticAlgorithms.Problem.SolucionNodo solucionNodoAlgoritmo) {
        SolucionNodo solucionNodo = new SolucionNodo();
        solucionNodo.setX(solucionNodoAlgoritmo.getX());
        solucionNodo.setY(solucionNodoAlgoritmo.getY());
        solucionNodo.setTipo( String.valueOf(solucionNodoAlgoritmo.getTipo()));
        solucionNodo.setInicio(solucionNodoAlgoritmo.getInicio());
        solucionNodo.setFin(solucionNodoAlgoritmo.getFin());
        solucionNodo.setIdString(solucionNodoAlgoritmo.getId());

        return solucionNodo;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getIdString() {
        return idString;
    }

    public void setIdString(String idString) {
        this.idString = idString;
    }

    public int getInicio() {
        return inicio;
    }

    public void setInicio(int inicio) {
        this.inicio = inicio;
    }

    public int getFin() {
        return fin;
    }

    public void setFin(int fin) {
        this.fin = fin;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
