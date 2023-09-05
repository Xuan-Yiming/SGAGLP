package Clases;

import java.util.Date;

public class DetalleRuta {
    private Date fechaLlegada;
    private char accion;

    public DetalleRuta(Date fechaLlegada, char accion) {
        this.fechaLlegada = fechaLlegada;
        this.accion = accion;
    }

    public Date getFechaLlegada() {
        return fechaLlegada;
    }

    public void setFechaLlegada(Date fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    public char getAccion() {
        return accion;
    }

    public void setAccion(char accion) {
        this.accion = accion;
    }
}
