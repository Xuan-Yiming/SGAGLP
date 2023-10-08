package Models;

public class Node {
    private int x;
    private int y;

    public Node(int x, int y) {
        if (x > 70 || x < 0 || y > 50 || y < 0)
            throw new IllegalArgumentException("x and y must be between 0 and 70");
        this.x = x;
        this.y = y;
    }
    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
