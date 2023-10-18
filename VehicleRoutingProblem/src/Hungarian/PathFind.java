//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;

import java.awt.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PathFind {
    public List<Car> cars;
    public List<Order> orders;
    public double datePriority;
    public double distancePriority;

    private int width;
    private int height;
    public List<Point> obstacles = new ArrayList();

    public PathFind(int width, int height, List<Point> obstacles) {
        this.width = width;
        this.height = height;
        this.obstacles = obstacles;
    }

    public List<List<Node>> solution() throws InterruptedException {
        int n = this.cars.size();
        int t = this.orders.size();
        List<List<Node>> solution = new ArrayList();

        for(int i = 0; i < n; ++i) {
            solution.add(new ArrayList());
        }

        this.sortByPriority();

        while(!this.orders.isEmpty()) {
            if (this.orders.size() < n) {
                n = this.orders.size();
            }

            double[][] cost = new double[n][n];

            for(int i = 0; i < n; ++i) {
                for(int j = 0; j < n; ++j) {
                    cost[i][j] = this.calculateCost((Node)this.orders.get(i), (Node)this.cars.get(j));
                }
            }

            HungarianAlgorithm hbm = new HungarianAlgorithm(cost);
            int[] result = hbm.execute();

            int i;
            for(i = 0; i < n; ++i) {
                ((List)solution.get(i)).add((Node)this.orders.get(result[i]));
                ((Car)this.cars.get(i)).setX(((Order)this.orders.get(i)).getX());
                ((Car)this.cars.get(i)).setY(((Order)this.orders.get(i)).getY());
            }

            for(i = 0; i < n; ++i) {
                this.orders.remove(this.orders.get(0));
            }
        }

        return solution;
    }

    private void sortByPriority() throws InterruptedException {
        this.orders.sort((o1, o2) -> {
            return o1.getDeliveryDate().compareTo(o2.getDeliveryDate());
        });

        for(int i = 0; i < this.orders.size(); ++i) {
            ((Order)this.orders.get(i)).setPriority(((Order)this.orders.get(i)).getPriority() * Math.pow(this.datePriority, (double)i));
        }

        double[] distances = new double[this.orders.size()];

        int i;
        for(i = 0; i < this.orders.size(); ++i) {
            double priority = Double.MAX_VALUE;
            Iterator var5 = this.cars.iterator();

            while(var5.hasNext()) {
                Car car = (Car)var5.next();
                double cost = this.calculateCost((Node)this.orders.get(i), car);
                if (cost < priority) {
                    priority = cost;
                }
            }

            distances[i] = priority;
        }

        distances = estandarizar(distances);

        for(i = 0; i < this.orders.size(); ++i) {
            ((Order)this.orders.get(i)).setPriority(((Order)this.orders.get(i)).getPriority() + distances[i]);
        }

        this.orders.sort((o1, o2) -> {
            return Double.compare(o2.getPriority(), o1.getPriority());
        });
    }

    private double calculateCost(Node node1, Node node2) throws InterruptedException {
//        double deltaX = (double)(node1.getX() - node2.getX());
//        double deltaY = (double)(node1.getY() - node2.getY());
//        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        GeneticPathFinding.Algorithm gpf = new GeneticPathFinding.Algorithm(new Point(node1.getX(), node1.getY()), new Point(node2.getX(), node1.getY()), this.obstacles, this.width, this.height);
        return gpf.getCost();
    }

    public static double[] estandarizar(double[] datos) {
        int n = datos.length;
        double suma = 0.0;
        double[] var4 = datos;
        int var5 = datos.length;

        for(int var6 = 0; var6 < var5; ++var6) {
            double dato = var4[var6];
            suma += dato;
        }

        double media = suma / (double)n;
        double sumaCuadrados = 0.0;
        double[] var8 = datos;
        int var9 = datos.length;

        for(int var10 = 0; var10 < var9; ++var10) {
            double dato = var8[var10];
            sumaCuadrados += Math.pow(dato - media, 2.0);
        }

        double desviacionEstandar = Math.sqrt(sumaCuadrados / (double)n);
        double[] datosEstandarizados = new double[n];

        for(int i = 0; i < n; ++i) {
            datosEstandarizados[i] = (datos[i] - media) / desviacionEstandar;
        }

        return datosEstandarizados;
    }
}
