package Clases;

import java.util.ArrayList;
import java.util.List;

import Clases.DetalleRuta;

public class Ruta {
    private List<DetalleRuta> detalleRutaList;

    public void append(DetalleRuta detalleRuta) {
        detalleRutaList.add(detalleRuta);
    }

    public Ruta() {
        detalleRutaList = new ArrayList<DetalleRuta>();
    }

    public List<DetalleRuta> getDetalleRutaList() {
        return detalleRutaList;
    }

    public void setDetalleRutaList(List<DetalleRuta> detalleRutaList) {
        this.detalleRutaList = detalleRutaList;
    }
}
