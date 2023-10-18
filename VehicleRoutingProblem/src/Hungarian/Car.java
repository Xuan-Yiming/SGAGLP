//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;

class Car extends Node {
    private double maxCapacity;

    public Car(double maxCapacity) {
        super(12, 8);
        this.maxCapacity = maxCapacity;
    }

    public Car(double maxCapacity, int x, int y) {
        super(x, y);
        this.maxCapacity = maxCapacity;
    }

    public double getMaxCapacity() {
        return this.maxCapacity;
    }

    public int getPositionX() {
        return super.getX();
    }

    public int getPositionY() {
        return super.getY();
    }
}
