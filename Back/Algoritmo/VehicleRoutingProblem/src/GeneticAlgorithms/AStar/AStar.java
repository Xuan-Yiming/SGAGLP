package GeneticAlgorithms.AStar;

import java.awt.*;
import java.util.List;
import java.util.*;

public class AStar {
    private static final double SQRT2 = Math.sqrt(2.0);

    private final int width;
    private final int height;
    private final NodeA[] nodeAS;

    private final PriorityQueue<NodeA> open;
    private final Set<NodeA> close;
    private final ArrayList<NodeA> result;

    private final Point current;
    private final Point previous;

    private final NodeA start;
    private final NodeA end;

    private final long lastTime = 0;

    public AStar(int width, int height, List<Point> obstacles, Point start, Point end) {
        this.width = width;
        this.height = height;

        nodeAS = new NodeA[width * height];

        for (int i = 0; i < width * height; i++)
            nodeAS[i] = new NodeA(i % width, i / width);

        for (Point p : obstacles) {
            setType(p.x, p.y, NodeType.Wall);
        }

        this.start = nodeAS[start.x + start.y * width];
        this.end = nodeAS[end.x + end.y * width];


        open = new PriorityQueue<NodeA>(nodeAS.length, (NodeA a, NodeA b) -> (a.f - b.f) < 0 ? -1 : 1);
        close = new HashSet<NodeA>(nodeAS.length);
        result = new ArrayList<NodeA>(nodeAS.length);

        current = new Point(0, 0);
        previous = new Point(0, 0);
        execute();
    }

    public int getDistance() {
        return result.size();
    }

    public List<Point> getPath() {
        List<Point> path = new ArrayList<Point>();
        for (NodeA n : result) {
            path.add(new Point(n.x, n.y));
        }
        return path;
    }


    private void execute() {
        if (start == null || end == null) {
            System.err.println("Error : Start or End point does not exist");
            return;
        }

        // Set up heuristic value

        for (int i = 0; i < nodeAS.length; i++) {
            double dx = Math.abs(end.x - i % width);
            double dy = Math.abs(end.y - i / width);

            nodeAS[i].h = Math.sqrt(dx * dx + dy * dy);
            nodeAS[i].f = nodeAS[i].h;
        }

        open.add(start);

        boolean error = false;

        while (true) {
            if (open.isEmpty()) {
                error = true;
                break;
            }
            if (close.contains(end)) {
                break;
            }

            NodeA current = open.poll();
            close.add(current);

            if (current.type == NodeType.Air)
                current.type = NodeType.Explored;

            boolean l = false;
            boolean r = false;
            boolean u = false;
            boolean d = false;

            for (int i = 1; i < 9; i += 2) {
                int x = current.x - 1 + i % 3;
                int y = current.y - 1 + i / 3;

                if (x < 0 || y < 0 || x >= width || y >= height) continue;

                if (nodeAS[x + y * width].type == NodeType.Wall) {
                    if (i == 1) u = true;
                    else if (i == 3) l = true;
                    else if (i == 5) r = true;
                    else if (i == 7) d = true;
                }
            }

            for (int i = 0; i < 9; i++) {
                // Prevent diagonal wall penetrating
                if (l && (i == 0 || i == 6)) continue;
                if (r && (i == 2 || i == 8)) continue;
                if (u && (i == 0 || i == 2)) continue;
                if (d && (i == 6 || i == 8)) continue;

                int x = current.x - 1 + i % 3;
                int y = current.y - 1 + i / 3;

                if (x < 0 || y < 0 || x >= width || y >= height || i == 4) continue;

                NodeA t = nodeAS[x + y * width];

                if (getType(x, y) == NodeType.Wall || close.contains(t)) continue;

                double g = (i % 2 == 0 ? SQRT2 : 1.0);

                if (!open.contains(t)) {
                    t.parent = current;
                    t.g = current.g + g;
                    t.f = t.g + t.h;

                    open.add(t);
                } else {
                    if (current.g + g > t.g) continue;

                    t.parent = current;
                    t.g = current.g + g;
                    t.f = t.g + t.h;
                }
            }
        }

        long passedTime = System.currentTimeMillis() - lastTime;

        if (error) {
            System.err.println("Error: No path, " + passedTime + "ms");
        } else {
            NodeA t = end.parent;

            // Back track
            while (t != start && t != null) {
                t.type = NodeType.Road;
                result.add(t);
                t = t.parent;
            }

            Collections.reverse(result);

            //System.out.println("Done!: " + result.size() + " blocks far, " + passedTime + "ms");
        }
    }


    private void setType(int x, int y, NodeType type) {
        if (x < 0 || x >= width || y < 0 || y >= height) return;

        switch (type) {
            case Start: {
                if (start != null) setType(start.x, start.y, NodeType.Air);
                break;
            }
            case End: {
                if (end != null) setType(end.x, end.y, NodeType.Air);
                break;
            }
        }

        nodeAS[x + y * width].type = type;
    }


    public NodeType getType(int x, int y) {
        return nodeAS[x + y * width].type;
    }

}
