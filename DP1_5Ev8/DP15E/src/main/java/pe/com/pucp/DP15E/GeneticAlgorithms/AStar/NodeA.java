package pe.com.pucp.DP15E.GeneticAlgorithms.AStar;

public class NodeA {

    public int x, y;
    public double f, g, h;
    public NodeType type;
    public NodeA parent;

    public NodeA(int x, int y) {
        this(x, y, NodeType.Air);
    }

    public NodeA(int x, int y, NodeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void clearData() {
        f = 0;
        g = 0;
        h = 0;
    }

    public String toString() {
        return "(" + x + ", " + y + ", type:" + type + "), (f:" + f + ", g:" + g + ", h:" + h + ")";
    }
}


