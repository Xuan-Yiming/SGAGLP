import java.util.ArrayList;
import java.util.List;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Define parameters and input data
        int numIterations = 100;
        int numEmployedBees = 20;
        int numOnlookerBees = 20;
        int numScoutBees = 10;

        // create storages
        List<Storange> storanges = new ArrayList<>();
        storanges.add(new Storange(12, 8, Double.MAX_VALUE, 'A'));
        storanges.add(new Storange(42, 42, 160.0, 'B'));
        storanges.add(new Storange(63, 3, 160.0, 'C'));

        // Create a list of cars with their maximum capacities
        List<Car> cars = new ArrayList<>();
        cars.add(new Car(10.0)); // Car 1 with a maximum capacity of 10.0
        cars.add(new Car(12.0)); // Car 2 with a maximum capacity of 12.0
        // Add more cars with their maximum capacities as needed

        // Create a list of orders with their positions (positionX, positionY) and demand
        List<Order> orders = new ArrayList<>();
        orders.add(new Order(1, 10, 20)); // Order 1 with demand 3
        orders.add(new Order(2, 15, 25)); // Order 2 with demand 2
        orders.add(new Order(3, 5, 8));  // Order 3 with demand 4
        orders.add(new Order(4, 11, 10)); // Order 4 with demand 1
        orders.add(new Order(5, 7, 3));  // Order 5 with demand 3
        // Add more orders with their positions and demand as needed

        // Create an instance of the ABCAlgorithm with the defined parameters, cars, and orders
        ABCAlgorithm abcAlgorithm = new ABCAlgorithm(numIterations, numEmployedBees, numOnlookerBees,
                numScoutBees, cars, orders, storanges);

        // Solve the VRP problem using the ABC algorithm
        abcAlgorithm.solve();
    }
}










