
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PathFind {
    public List<Car> cars;
    public List<Order> orders;
    public double datePriority;
    public double distancePriority;
    public List<List<Node>>  solution() {
        // Create the parameters
        int n = cars.size();
        int t = orders.size();
        List<List<Node>> solution = new ArrayList<>();

        //initialize the solution
        for (int i = 0; i < n; i++) {
            solution.add(new ArrayList<>());
        }

        sortByPriority();

        while (!orders.isEmpty()) {
            //check how many cars are needed for this iteration
            if (orders.size() < n) {
                n = orders.size();
            }

            //create the matrix of cost
            /*
             * i/j   p1  p2  p3  p4
             * f1    [a]  []  []  []
             * f2    []  [b]  []  []
             * f3    []  []  [c]  []
             * f4    []  []  []  [d]
             * */
            double [][] cost = new double[n][n];

            //calculate cost of each order for each car
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    cost[i][j] = calculateCost(orders.get(i), cars.get(j));
                }
            }

            //use hungarian algorithm to get the assignment of orders to cars
            HungarianAlgorithm hbm = new HungarianAlgorithm(cost);
            int[] result = hbm.execute();

            for (int i = 0; i < n; i++) {
                solution.get(i).add(orders.get(result[i]));
                cars.get(i).setX(orders.get(i).getX());
                cars.get(i).setY(orders.get(i).getY());
            }

            //remove first n orders
            for (int i = 0; i < n; i++) {
                orders.remove(orders.get(0));
            }
        }

        return solution;
    }

    private void sortByPriority() {
        // First sort by the date of delivery
        orders.sort((o1, o2) -> o1.getDeliveryDate().compareTo(o2.getDeliveryDate()));

        // sign the priority of each order

        for (int i = 0; i < orders.size(); i++) {
            // priority = datePriority^i
            orders.get(i).setPriority(orders.get(i).getPriority() * Math.pow(datePriority, i) );
        }
        double[] distances = new double[orders.size()];
        for (int i = 0; i < orders.size(); i++) {
            //calculate the priority
            double priority = Double.MAX_VALUE;
            for (Car car: cars){
                double cost = calculateCost(orders.get(i), car);
                if (cost < priority) {
                    priority = cost;
                }
            }
            distances[i] = priority;
        }
        distances = estandarizar(distances);
        for (int i = 0; i < orders.size(); i++) {
            // priority = datePriority^i
            orders.get(i).setPriority(orders.get(i).getPriority() + distances[i]);
        }

        // Second sort by the priority
        orders.sort((o1, o2) -> Double.compare(o2.getPriority(), o1.getPriority()));

    }
    private double calculateCost(Node node1, Node node2) {
        // Implement your distance calculation logic here
        // You may use Euclidean distance, Manhattan distance, or any other distance metric
        // For simplicity, let's assume Euclidean distance in this example
        double deltaX = node1.getX() - node2.getX();
        double deltaY = node1.getY() - node2.getY();
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    public static double[] estandarizar(double[] datos) {
        int n = datos.length;

        // Calcular la media
        double suma = 0;
        for (double dato : datos) {
            suma += dato;
        }
        double media = suma / n;

        // Calcular la desviación estándar
        double sumaCuadrados = 0;
        for (double dato : datos) {
            sumaCuadrados += Math.pow(dato - media, 2);
        }
        double desviacionEstandar = Math.sqrt(sumaCuadrados / n);

        // Estandarizar los datos
        double[] datosEstandarizados = new double[n];
        for (int i = 0; i < n; i++) {
            datosEstandarizados[i] = (datos[i] - media) / desviacionEstandar;
        }

        return datosEstandarizados;
    }

}
