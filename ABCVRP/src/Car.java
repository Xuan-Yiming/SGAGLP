class Car extends Node{
    private double maxCapacity;

    public Car(double maxCapacity) {
        super(12, 8);
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