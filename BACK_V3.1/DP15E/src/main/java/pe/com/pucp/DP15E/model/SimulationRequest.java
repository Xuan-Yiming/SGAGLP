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
    private int clock;

    public int getClock() {
        return clock;
    }

    public void setClock(int clock) {
        this.clock = clock;
    }

    public SimulationRequest(String dateInicio, String dateFin, Object data, char modo, int clock) {
        this.dateInicio = dateInicio;
        this.dateFin = dateFin;
        this.data = data;
        this.modo = modo;
        this.clock =clock;
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
