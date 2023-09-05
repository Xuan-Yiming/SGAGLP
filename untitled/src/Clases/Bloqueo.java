package Clases;

import java.util.Date;

public class Bloqueo extends Nodo {
    private Date[] fechaInicio;
    private Date[] fechaFin;

    public Bloqueo(int x, int y, char tipo, Date[] fechaInicio, Date[] fechaFin) {
        super(x, y, tipo);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Bloqueo(Date[] fechaInicio, Date[] fechaFin) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Date[] getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date[] fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date[] getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date[] fechaFin) {
        this.fechaFin = fechaFin;
    }
}
