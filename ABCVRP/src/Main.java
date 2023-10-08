import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Define parameters and input data
        int numIterations = 100;
        int numEmployedBees = 20;
        int numOnlookerBees = 20;
        int numScoutBees = 10;

        // create storages
        List<Storage> storages = new ArrayList<>();
        storages.add(new Storage(12, 8, Double.MAX_VALUE, 'A'));
        storages.add(new Storage(42, 42, 160.0, 'B'));
        storages.add(new Storage(63, 3, 160.0, 'C'));

        // Create a list of cars with their maximum capacities
        List<Car> cars = new ArrayList<>();
        cars.add(new Car(500)); // Car 1 with a maximum capacity of 10.0
        cars.add(new Car(50)); // Car 2 with a maximum capacity of 12.0
        cars.add(new Car(50));  // Car 3 with a maximum capacity of 8.0

        // Add more cars with their maximum capacities as needed

        // Create a list of orders with their positions (positionX, positionY) and demand
        List<Order> orders = new ArrayList<>();

        orders.add(new Order(1, 10, 20,1, new Date(2023, 12, 12, 15, 0, 0))); // Order 1 with demand 3
        orders.add(new Order(2, 15, 25, 2, new Date(2023, 12, 12, 19, 0, 0))); // Order 2 with demand 2
        orders.add(new Order(3, 5, 8,3, new Date(2023, 12, 12, 14, 0, 0)));  // Order 3 with demand 4
        orders.add(new Order(4, 11, 10,4, new Date(2023, 12, 12, 9, 0, 0))); // Order 4 with demand 1
        orders.add(new Order(5, 7, 3,5, new Date(2023, 12, 12, 20, 0, 0)));  // Order 5 with demand 3
        orders.add(new Order(6, 9, 5,6, new Date(2023, 12, 12, 19, 0, 0)));  // Order 6 with demand 2
        orders.add(new Order(7, 13, 7,7, new Date(2023, 12, 12, 8, 0, 0))); // Order 7 with demand 4
        orders.add(new Order(8, 17, 9,8, new Date(2023, 12, 12, 6, 0, 0))); // Order 8 with demand 1
        orders.add(new Order(9, 19, 11,9, new Date(2023, 12, 12, 22, 0, 0))); // Order 9 with demand 3
        orders.add(new Order(10, 21, 13,10, new Date(2023, 12, 12, 16, 0, 0))); // Order 10 with demand 2
        orders.add(new Order(11, 23, 15,11, new Date(2023, 12, 12, 4, 0, 0))); // Order 11 with demand 4
        orders.add(new Order(12, 25, 17,12, new Date(2023, 12, 12, 21, 0, 0))); // Order 12 with demand 1
        orders.add(new Order(13, 27, 19,13, new Date(2023, 12, 12, 5, 0, 0))); // Order 13 with demand 3
        orders.add(new Order(14, 29, 21,14, new Date(2023, 12, 12, 1, 0, 0))); // Order 14 with demand 2
        orders.add(new Order(15, 31, 23,15, new Date(2023, 12, 12, 3, 0, 0))); // Order 15 with demand 4
        orders.add(new Order(16, 33, 25,16, new Date(2023, 12, 12, 13, 0, 0))); // Order 16 with demand 1
        orders.add(new Order(17, 35, 27,17, new Date(2023, 12, 12, 12, 0, 0))); // Order 17 with demand 3
        orders.add(new Order(18, 37, 29,18, new Date(2023, 12, 12, 11, 0, 0))); // Order 18 with demand 2
        orders.add(new Order(19, 39, 31,19, new Date(2023, 12, 12, 10, 0, 0))); // Order 19 with demand 4
        orders.add(new Order(20, 41, 33,20, new Date(2023, 12, 12, 2, 0, 0))); // Order 20 with demand 1
        // Add more orders with their positions and demand as needed

//        // Create an instance of the ABCAlgorithm with the defined parameters, cars, and orders
//        ABCAlgorithm abcAlgorithm = new ABCAlgorithm(numIterations, numEmployedBees, numOnlookerBees,
//                numScoutBees, cars, orders, storages);
//
//        // Solve the VRP problem using the ABC algorithm
//        abcAlgorithm.solve();

        // Create an instance of the PathFind algorithm with the defined parameters, cars, and orders
        PathFind pathFind = new PathFind();
        pathFind.cars = cars;
        pathFind.orders = orders;
        pathFind.datePriority = 0.99;
        pathFind.distancePriority = 0.5;
        List<List<Node>>  solution = pathFind.solution();

        // Print the solution
        for (int i = 0; i < solution.size(); i++) {
            System.out.println("\nCar " + (i + 1) + ":");
            for (int j = 0; j < solution.get(i).size(); j++) {
                if (solution.get(i).get(j) != null) {
                    //cast solution[i][j] as Order
                    Order order = (Order) solution.get(i).get(j);
                    System.out.print(order.getID()+ " - ");
                }
            }
            System.out.println();
        }

    }
}










