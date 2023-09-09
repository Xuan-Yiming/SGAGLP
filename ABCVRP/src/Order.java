class Order extends Node {
    private double volumn;

    public Order(int x, int y, double volumn) {
        super(x, y);
        this.volumn = volumn;
    }

    public double getVolumn() {
        return volumn;
    }

    public int getPositionX() {
        return super.getX();
    }

    public int getPositionY() {
        return super.getY();
    }

}