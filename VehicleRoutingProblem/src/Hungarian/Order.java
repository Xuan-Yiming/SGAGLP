//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;

import java.util.Date;

class Order extends Node {
    private int ID;
    private double volumn;
    private double priority;
    private Date deliveryDate;

    public Order(int x, int y, double volumn, int ID, Date deliveryDate) {
        super(x, y);
        this.volumn = volumn;
        this.ID = ID;
        this.priority = 1.0;
        this.deliveryDate = deliveryDate;
    }

    public Date getDeliveryDate() {
        return this.deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public double getPriority() {
        return this.priority;
    }

    public void setPriority(double priority) {
        this.priority = priority;
    }

    public int getID() {
        return this.ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setVolumn(double volumn) {
        this.volumn = volumn;
    }

    public double getVolumn() {
        return this.volumn;
    }

    public int getPositionX() {
        return super.getX();
    }

    public int getPositionY() {
        return super.getY();
    }
}
