package Models;

import Models.Node;

public class Car extends Node {
    private double maxCapacity;

    public Car() {
        super(12, 8);
        this.maxCapacity = 0;
    }
    public Car(double maxCapacity) {
        super(12, 8);
        this.maxCapacity = maxCapacity;
    }

    public Car(double maxCapacity, int x, int y) {
        super(x, y);
        this.maxCapacity = maxCapacity;
    }

    public double getMaxCapacity() {
        return maxCapacity;
    }

    public int getPositionX() {
        return super.getX();
    }

    public int getPositionY() {
        return super.getY();
    }
}