package AStar;

import java.awt.*;
import java.util.*;
import java.util.List;

public class AStar {
    private static final double SQRT2 = Math.sqrt(2.0);

    private int width;
    private int height;
    private ANode[] ANodes;

    private PriorityQueue<ANode> open;
    private Set<ANode> close;
    private ArrayList<ANode> result;

    private Point current;
    private Point previous;

    private ANode start;
    private ANode end;

    private long lastTime = 0;

    public AStar(int width, int height, List<Point> obstacles, Point start, Point end)
    {
        this.width = width;
        this.height = height;

        ANodes = new ANode[width * height];

        for (int i = 0; i < width * height; i++)
            ANodes[i] = new ANode(i % width, i / width);

        for (Point p : obstacles){
            setType(p.x, p.y, NodeType.Wall);
        }

        this.start = ANodes[start.x + start.y * width];
        this.end = ANodes[end.x + end.y * width];


        open = new PriorityQueue<ANode>(ANodes.length, (ANode a, ANode b) -> (a.f - b.f) < 0 ? -1 : 1);
        close = new HashSet(ANodes.length);
        result = new ArrayList(ANodes.length);

        current = new Point(0, 0);
        previous = new Point(0, 0);
        execute();
    }

    public int getDistance(){

        return result.size();
    }

    public List<ANode> getPath(){
        return result;
    }


    private void execute()
    {
        if (start == null || end == null)
        {
            System.err.println("Error : Start or End point does not exist");
            return;
        }

        // Set up heuristic value

                for (int i = 0; i < ANodes.length; i++)
                {
                    double dx = Math.abs(end.x - i % width);
                    double dy = Math.abs(end.y - i / width);

                    ANodes[i].h = Math.sqrt(dx * dx + dy * dy);
                    ANodes[i].f = ANodes[i].h;
                }

        open.add(start);

        boolean error = false;

        while (true)
        {
            if (open.isEmpty())
            {
                error = true;
                break;
            }
            if (close.contains(end))
            {
                break;
            }

            ANode current = open.poll();
            close.add(current);

            if (current.type == NodeType.Air)
                current.type = NodeType.Explored;

            boolean l = false;
            boolean r = false;
            boolean u = false;
            boolean d = false;

            for (int i = 1; i < 9; i += 2)
            {
                int x = current.x - 1 + i % 3;
                int y = current.y - 1 + i / 3;

                if (x < 0 || y < 0 || x >= width || y >= height) continue;

                if (ANodes[x + y * width].type == NodeType.Wall)
                {
                    if (i == 1) u = true;
                    else if (i == 3) l = true;
                    else if (i == 5) r = true;
                    else if (i == 7) d = true;
                }
            }

            for (int i = 0; i < 9; i++)
            {
                // Prevent diagonal wall penetrating
                if (l && (i == 0 || i == 6)) continue;
                if (r && (i == 2 || i == 8)) continue;
                if (u && (i == 0 || i == 2)) continue;
                if (d && (i == 6 || i == 8)) continue;

                int x = current.x - 1 + i % 3;
                int y = current.y - 1 + i / 3;

                if (x < 0 || y < 0 || x >= width || y >= height || i == 4) continue;

                ANode t = ANodes[x + y * width];

                if (getType(x, y) == NodeType.Wall || close.contains(t)) continue;

                double g = (i % 2 == 0 ? SQRT2 : 1.0);

                if (!open.contains(t))
                {
                    t.parent = current;
                    t.g = current.g + g;
                    t.f = t.g + t.h;

                    open.add(t);
                } else
                {
                    if (current.g + g > t.g) continue;

                    t.parent = current;
                    t.g = current.g + g;
                    t.f = t.g + t.h;
                }
            }
        }

        long passedTime = System.currentTimeMillis() - lastTime;

        if (error)
        {
            System.err.println("Error: No path, " + passedTime + "ms");
        } else
        {
            ANode t = end.parent;

            // Back track
            while (t != start)
            {
                t.type = NodeType.Road;
                result.add(t);
                t = t.parent;
            }

            Collections.reverse(result);

            //System.out.println("Done!: " + result.size() + " blocks far, " + passedTime + "ms");
        }
    }


    private void setType(int x, int y, NodeType type)
    {
        if (x < 0 || x >= width || y < 0 || y >= height) return;

        switch (type)
        {
            case Start:
            {
                if (start != null) setType(start.x, start.y, NodeType.Air);
                break;
            }
            case End:
            {
                if (end != null) setType(end.x, end.y, NodeType.Air);
                break;
            }
        }

        ANodes[x + y * width].type = type;
    }

    private void setType(int i, NodeType type)
    {
        setType(i % width, i / width, type);
    }

    public NodeType getType(int x, int y)
    {
        return ANodes[x + y * width].type;
    }

    public NodeType getType(int i)
    {
        return getType(i % width, i / width);
    }
}
