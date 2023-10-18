//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;
public class Node {
    private int x;
    private int y;

    public Node(int x, int y) {
        if (x <= 100 && x >= 0 && y <= 100 && y >= 0) {
            this.x = x;
            this.y = y;
        } else {
            throw new IllegalArgumentException("x and y must be between 0 and 100");
        }
    }

    public int getX() {
        return this.x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return this.y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
