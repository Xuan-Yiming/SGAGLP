package pe.com.pucp.DP15E.model;

import java.util.Date;

public class SimulationRequest {
    private Date dateInicio;
    private Date dateFin;
    private String data;
    private char modo;

    public SimulationRequest(Date dateInicio, Date dateFin, String data, char modo) {
        this.dateInicio = dateInicio;
        this.dateFin = dateFin;
        this.data = data;
        this.modo = modo;
    }

    public Date getDateInicio() {
        return dateInicio;
    }

    public void setDateInicio(Date dateInicio) {
        this.dateInicio = dateInicio;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public char getModo() {
        return modo;
    }

    public void setModo(char modo) {
        this.modo = modo;
    }
}
