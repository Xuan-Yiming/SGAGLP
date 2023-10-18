package AStar;

public class ANode {

    public int x, y;
    public double f, g, h;
    public NodeType type;
    public ANode parent;

    public ANode(int x, int y)
    {
        this(x, y, NodeType.Air);
    }

    public ANode(int x, int y, NodeType type)
    {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void clearData()
    {
        f = 0;
        g = 0;
        h = 0;
    }

    public String toString()
    {
        return "(" + x + ", " + y + ", type:" + type + "), (f:" + f + ", g:" + g + ", h:" + h + ")";
    }
}


