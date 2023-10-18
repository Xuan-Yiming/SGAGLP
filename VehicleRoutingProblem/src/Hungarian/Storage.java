//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;

public class Storage extends Node {
    private double maxCapacity;
    private char type;

    public Storage(int x, int y, double maxCapacity, char type) {
        super(x, y);
        this.maxCapacity = maxCapacity;
        this.type = type;
    }

    public double getMaxCapacity() {
        return this.maxCapacity;
    }

    public void setMaxCapacity(double maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public char getType() {
        return this.type;
    }

    public void setType(char type) {
        this.type = type;
    }

    public int getPositionX() {
        return super.getX();
    }

    public int getPositionY() {
        return super.getY();
    }

    public void consume(double volumn) {
        this.maxCapacity -= volumn;
    }
}
