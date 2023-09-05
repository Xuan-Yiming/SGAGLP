package Clases;

import java.util.Date;
import java.util.List;

public class Flota {
    private int id;
    private String tipo;
    private String numero;
    private double pesoBruto;
    private double cargaGLP;
    private double restanteGLP;
    private double pesoGLP;
    private double cargaPetroleo;
    private double restantePetroleo;
    private double pesoTotal;
    private Date mantenimiento;
    private char estado;

    private List<Ruta> rutas;

    // Constructor

    public Flota(int id, String tipo, String numero, double pesoBruto, double cargaGLP, double restanteGLP, double pesoGLP, double cargaPetroleo, double restantePetroleo, double pesoTotal, Date mantenimiento, char estado) {
        this.id = id;
        this.tipo = tipo;
        this.numero = numero;
        this.pesoBruto = pesoBruto;
        this.cargaGLP = cargaGLP;
        this.restanteGLP = restanteGLP;
        this.pesoGLP = pesoGLP;
        this.cargaPetroleo = cargaPetroleo;
        this.restantePetroleo = restantePetroleo;
        this.pesoTotal = pesoTotal;
        this.mantenimiento = mantenimiento;
        this.estado = estado;
    }

    // setter & getter


    public List<Ruta> getRutas() {
        return rutas;
    }

    public void setRutas(List<Ruta> rutas) {
        this.rutas = rutas;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public double getPesoBruto() {
        return pesoBruto;
    }

    public void setPesoBruto(double pesoBruto) {
        this.pesoBruto = pesoBruto;
    }

    public double getCargaGLP() {
        return cargaGLP;
    }

    public void setCargaGLP(double cargaGLP) {
        this.cargaGLP = cargaGLP;
    }

    public double getRestanteGLP() {
        return restanteGLP;
    }

    public void setRestanteGLP(double restanteGLP) {
        this.restanteGLP = restanteGLP;
    }

    public double getPesoGLP() {
        return pesoGLP;
    }

    public void setPesoGLP(double pesoGLP) {
        this.pesoGLP = pesoGLP;
    }

    public double getCargaPetroleo() {
        return cargaPetroleo;
    }

    public void setCargaPetroleo(double cargaPetroleo) {
        this.cargaPetroleo = cargaPetroleo;
    }

    public double getRestantePetroleo() {
        return restantePetroleo;
    }

    public void setRestantePetroleo(double restantePetroleo) {
        this.restantePetroleo = restantePetroleo;
    }

    public double getPesoTotal() {
        return pesoTotal;
    }

    public void setPesoTotal(double pesoTotal) {
        this.pesoTotal = pesoTotal;
    }

    public Date getMantenimiento() {
        return mantenimiento;
    }

    public void setMantenimiento(Date mantenimiento) {
        this.mantenimiento = mantenimiento;
    }

    public char getEstado() {
        return estado;
    }

    public void setEstado(char estado) {
        this.estado = estado;
    }
}
