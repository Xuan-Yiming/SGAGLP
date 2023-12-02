package pe.com.pucp.DP15E.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class SimulationRequest {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private String dateInicio;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    private String dateFin;
    private Object data;
    private char modo;

    public SimulationRequest(String dateInicio, String dateFin, Object data, char modo) {
        this.dateInicio = dateInicio;
        this.dateFin = dateFin;
        this.data = data;
        this.modo = modo;
    }

    public String getDateInicio() {
        return dateInicio;
    }

    public void setDateInicio(String dateInicio) {
        this.dateInicio = dateInicio;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public char getModo() {
        return modo;
    }

    public void setModo(char modo) {
        this.modo = modo;
    }
}
