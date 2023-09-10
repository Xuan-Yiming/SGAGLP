package Clases;

import java.util.ArrayList;
import java.util.List;

public class Route {
    public List<Pedido> points;
    public double fitness;

    public Route(List<Pedido> points) {
        this.points = new ArrayList<>(points);
        calculateFitness();
    }

    public void calculateFitness() {
        double totalDistance = 0.0;

        // Calculate the total distance of the route
        for (int i = 0; i < points.size() - 1; i++) {
            Pedido point1 = points.get(i);
            Pedido point2 = points.get(i + 1);

            double distance = calculateDistance(point1, point2);
            totalDistance += distance;
        }

        // You can adjust the fitness based on your optimization goal
        // In this example, we set fitness as the inverse of the total distance
        fitness = 1.0 / totalDistance;
    }
    private double calculateDistance(Pedido point1, Pedido point2) {
        // Calculate the Euclidean distance between two points
        double dx = point1.getX() - point2.getX();
        double dy = point1.getY() - point2.getY();
        return Math.sqrt(dx * dx + dy * dy);
    }
}
