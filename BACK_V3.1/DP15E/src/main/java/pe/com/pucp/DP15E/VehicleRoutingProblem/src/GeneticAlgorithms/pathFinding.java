package pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class pathFinding {
    public ArrayList<Point> findPath(int width, int height, ArrayList<Point> obstacles, Point start, Point end) throws Exception{

        if (start == end){
            ArrayList<Point> path = new ArrayList<>();
            path.add(start);
            return path;
        }

        // Create the map
        boolean[][] map = new boolean[width][height];
        for (Point obstacle : obstacles) {
            map[obstacle.x][obstacle.y] = true;
        }

        // Initialize the queue and visited set
        Queue<Point> queue = new LinkedList<>();
        Set<Point> visited = new HashSet<>();
        queue.add(start);
        visited.add(start);

        // Initialize the parent map
        Map<Point, Point> parent = new HashMap<>();
        parent.put(start, null);

        // BFS
        while (!queue.isEmpty()) {
            Point current = queue.remove();
            if (current.equals(end)) {
                // Build the path
                ArrayList<Point> path = new ArrayList<>();
                while (current != null) {
                    path.add(current);
                    current = parent.get(current);
                }
                Collections.reverse(path);
                return path;
            }
            for (Point neighbor : getNeighbors(current, map)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                    parent.put(neighbor, current);
                }
            }
        }
        // print the start, end and obstacles in a map
        System.out.println("Start: " + start);
        System.out.println("End: " + end);
        System.out.println("Obstacles: " + obstacles.toString());
        System.out.println("Map:");
        for (int i = 0; i < map.length; i++) {
            System.out.print("[");
            for (int j = 0; j < map[0].length; j++) {
                if (start.equals(new Point(i, j))) {
                    System.out.print("S");
                } else if (end.equals(new Point(i, j))) {
                    System.out.print("E");
                } else
                if (map[i][j]) {
                    System.out.print("X");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println("]");
        }
        // No path found
        throw new Exception("No path found: " + start + " -> " + end+"\n" + obstacles.toString());
    }

    private ArrayList<Point> getNeighbors(Point point, boolean[][] map) {
        ArrayList<Point> neighbors = new ArrayList<>();
        int x = point.x;
        int y = point.y;
        if (x > 0 && !map[x - 1][y]) {
            neighbors.add(new Point(x - 1, y));
        }
        if (x < map.length - 1 && !map[x + 1][y]) {
            neighbors.add(new Point(x + 1, y));
        }
        if (y > 0 && !map[x][y - 1]) {
            neighbors.add(new Point(x, y - 1));
        }
        if (y < map[0].length - 1 && !map[x][y + 1]) {
            neighbors.add(new Point(x, y + 1));
        }
        return neighbors;
    }
}
