
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

class ABCAlgorithm {
    private int numIterations;
    private int numEmployedBees;
    private int numOnlookerBees;
    private int numScoutBees;
    private List<Car> cars;
    private List<Order> orders;
    private List<Storage> storages;

    public ABCAlgorithm(int numIterations, int numEmployedBees, int numOnlookerBees, int numScoutBees,
                        List<Car> cars, List<Order> orders, List<Storage> storages) {
        this.numIterations = numIterations;
        this.numEmployedBees = numEmployedBees;
        this.numOnlookerBees = numOnlookerBees;
        this.numScoutBees = numScoutBees;
        this.cars = cars;
        this.orders = orders;
        this.storages = storages;
    }

    public void solve() {
        // Implementation of ABC algorithm
        // Initialize the population of solutions (routes)
        List<List<Node>> solutions = initializeSolutions();
        for (List<Node> solution : solutions) {
            // Insert the starting point at the beginning of each route
            solution.add(0, cars.get(0));
        }
        // Initialize a list to track solution qualities over iterations
        List<Double> solutionQualities = new ArrayList<>();

        // Run ABC algorithm for a specified number of iterations
        for (int iteration = 0; iteration < numIterations; iteration++) {
            // Employed bee phase
            employedBeePhase(solutions);

            // Onlooker bee phase
            onlookerBeePhase(solutions);

            // Scout bee phase
            scoutBeePhase(solutions, solutionQualities);
        }

        // Select the best solution (route)
        List<Node> bestSolution = selectBestSolution(solutions);

        // Output or use the best solution as needed
        System.out.println("Best Solution: " + bestSolution);
        // ptint the x, y of the best solution
        for (Node order : bestSolution) {
            System.out.println("(" + order.getX() + ", " + order.getY() + "), ");
        }

    }


    private List<List<Node>> initializeSolutions() {
        // Initialize the population of solutions (routes) here
        // For simplicity, you can generate random initial routes
        List<List<Node>> solutions = new ArrayList<>();
        for (int i = 0; i < numEmployedBees; i++) {
            // Create an initial random route for each employed bee
            List<Node> initialRoute = generateRandomRoute();
            solutions.add(initialRoute);
        }
        return solutions;
    }

    private List<Node> generateRandomRoute() {
        // Generate a random route for an employed bee here
        // You can use any heuristic or random method to create a route
        // Make sure to consider the capacity of cars and the refueling at branches
        // Return a list of orders representing the route
        try {
            List<Node> randomRoute = new ArrayList<>();

            // Shuffle the orders randomly to explore different routes
            List<Order> shuffledOrders = new ArrayList<>(orders);
            Collections.shuffle(shuffledOrders);

            // Initialize variables to track car capacity and branch storage capacity
            double currentCarCapacity = cars.get(0).getMaxCapacity();
            List<Storage> temStorages = new ArrayList<>(storages);
            temStorages = temStorages.subList(1, temStorages.size());

            // Add orders to the route until the car can't reach the next order
            for (Order shuffledOrder : shuffledOrders) {
                // Check if the car can reach the order
                if (canReachNode(cars.get(0), shuffledOrder, randomRoute, currentCarCapacity) == 1) {
                    // If the car can reach the order, add it to the route
                    randomRoute.add(shuffledOrder);
                    currentCarCapacity -= shuffledOrder.getVolumn();
                } else {
                    // If the car can't reach the order, refill at the closest branch storage
                    // Check if the car has enough capacity to reach the branch storage
                    if (currentCarCapacity < shuffledOrder.getVolumn()) {
                        // get the closet branch and add it to the route
                        int closestStorageIndex = getClosestStorage(cars.get(0), shuffledOrder.getVolumn(), temStorages);
                        randomRoute.add(temStorages.get(closestStorageIndex));
                        // Refill the car at the branch storage
                        temStorages.get(closestStorageIndex).consume(cars.get(0).getMaxCapacity() - currentCarCapacity); // Reduce branch storage capacity by the amount of refilled fuel
                        currentCarCapacity = cars.get(0).getMaxCapacity();
                    }

                    // Recheck if the car can reach the order after refilling
                    if (canReachNode(cars.get(0), shuffledOrder, randomRoute, currentCarCapacity) >= 0) {
                        randomRoute.add(shuffledOrder);
                        currentCarCapacity -= shuffledOrder.getVolumn(); // Reduce car capacity
                    } else {
                        // Handle the case where the car can't reach the order even after refilling
                        break;
                    }
                }
            }

            return randomRoute;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private int getClosestStorage(Car car, double requiredCapacity, List<Storage> storages) throws Exception {
        // Implement your logic here to find the closest branch to the car
        // You can use any distance metric such as Euclidean distance or Manhattan distance
        // Return the closest branch

        double lastCost = Double.MAX_VALUE;
        for (int i = 0; i < storages.size(); i++) {
            if (storages.get(i).getMaxCapacity() < requiredCapacity) {
                continue;
            }

            if (canReachNode(car, storages.get(i), new ArrayList<>(), requiredCapacity) < 0) {
                continue;
            }

            double cost = calculateDistance(car, storages.get(i));
            if ( cost < lastCost) {
                return i;
            }   else {
                lastCost = cost;
            }

        }

        // For simplicity, let's assume the first branch is the closest
        throw new Exception("No branch found");
    }
    private double calculateDistance(Node node1, Node node2) {
        // Implement your distance calculation logic here
        // You may use Euclidean distance, Manhattan distance, or any other distance metric
        // For simplicity, let's assume Euclidean distance in this example
        double deltaX = node1.getX() - node2.getX();
        double deltaY = node1.getY() - node2.getY();
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    private int canReachNode(Car car, Node node, List<Node> route, double carCapacity) {
        /*
        * casos:
        * 1: si llega
        * 2: no llega por gasolina
        * 3: no llega por capacidad
        * 4: no llega por mantenimiento
        * */

        // Implement your logic here to check if the car can reach the order
        // Consider the car's current position (last visited order) and capacity
        // If it can reach the order and stay within its capacity, return true; otherwise, return false
        // You may need to calculate the distance between the car and the order
        // Also, consider the car's capacity and the capacity of the branch storage
        // You may want to implement a more sophisticated check based on your requirements
        // If it can reach the closest branch to the Node.
        // For now, this function always returns true as a placeholder
        return 1;
    }

    private void handleUnreachableOrder(Order order) {
        // Implement your custom logic here for handling orders that can't be reached
        // This is a placeholder, and you can define your own strategy for such cases
        // You may want to log, skip, or take specific actions based on your requirements
    }

    private void employedBeePhase(List<List<Node>> solutions) {
        // Implement the employed bee phase of the ABC algorithm here
        // Modify the solutions/routes using employed bees
        // You can use various local search methods or operators to improve routes
        // Update the solutions list with the modified routes

        for (int i = 0; i < numEmployedBees; i++) {
            List<Node> currentRoute = solutions.get(i);

            // Apply a local search operator to improve the current route
            List<Node> improvedRoute = applyLocalSearchOperator(currentRoute);

            // Evaluate the quality of the improved route and the current route
            double currentRouteQuality = evaluateSolution(currentRoute);
            double improvedRouteQuality = evaluateSolution(improvedRoute);

            // Update the route in the solutions list if the improved route is better
            if (improvedRouteQuality < currentRouteQuality) {
                solutions.set(i, improvedRoute);
            }
        }
    }

    private double evaluateSolution(List<Node> route) {
        // Implement your evaluation logic here
        // Calculate the total distance of the given route

        double totalDistance = 0.0;

        // Calculate the distance between consecutive orders in the route
        for (int i = 0; i < route.size() - 1; i++) {
            Node currentOrder = route.get(i);
            Node nextOrder = route.get(i + 1);

            // Calculate the distance between currentOrder and nextOrder
            double distance = calculateDistance(currentOrder, nextOrder);

            totalDistance += distance;
        }

        // Add the distance from the last order back to the starting point (if it's a closed route)
        if (!route.isEmpty()) {
            Node firstOrder = route.get(0);
            Node lastOrder = route.get(route.size() - 1);

            double distanceToStart = calculateDistance(lastOrder, firstOrder);

            totalDistance += distanceToStart;
        }

        return totalDistance;
    }


    private List<Node> applyLocalSearchOperator(List<Node> route) {
        // Implement a local search operator to improve the given route
        // This can be a simple operation like swapping two orders or more sophisticated methods
        // Return the modified route

        // Example: Swap two random orders in the route to improve it
        List<Node> improvedRoute = new ArrayList<>(route);
        Random random = new Random();
        int index1 = random.nextInt(improvedRoute.size());
        int index2 = random.nextInt(improvedRoute.size());

        // Swap the orders at index1 and index2
        Node order1 = improvedRoute.get(index1);
        Node order2 = improvedRoute.get(index2);
        improvedRoute.set(index1, order2);
        improvedRoute.set(index2, order1);

        return improvedRoute;
    }

// Implement other functions as needed...


    private void onlookerBeePhase(List<List<Node>> solutions) {
        // Implement the onlooker bee phase of the ABC algorithm here
        // Select onlooker bees and guide them to promising solutions
        // Modify the solutions/routes using onlooker bees
        // You can use various selection methods and local search operators
        // Update the solutions list with the modified routes

        Random random = new Random();

        // Initialize an array to track the probabilities of selecting each solution
        double[] probabilities = calculateProbabilities(solutions);

        for (int i = 0; i < numOnlookerBees; i++) {
            // Select a solution based on the probabilities using roulette wheel selection
            int selectedSolutionIndex = selectSolutionWithRouletteWheel(probabilities, random);

            // Get the selected solution
            List<Node> selectedSolution = solutions.get(selectedSolutionIndex);

            // Apply a local search operator to improve the selected solution
            List<Node> improvedSolution = applyLocalSearchOperator(selectedSolution);

            // Evaluate the quality of the improved solution and the selected solution
            double selectedSolutionQuality = evaluateSolution(selectedSolution);
            double improvedSolutionQuality = evaluateSolution(improvedSolution);

            // Update the solution in the solutions list if the improved solution is better
            if (improvedSolutionQuality < selectedSolutionQuality) {
                solutions.set(selectedSolutionIndex, improvedSolution);
            }
        }
    }

    private double[] calculateProbabilities(List<List<Node>> solutions) {
        // Implement a function to calculate the selection probabilities for onlooker bees
        // You can use a fitness-based probability calculation method, such as roulette wheel selection
        // Calculate the fitness values for all solutions and convert them into probabilities
        // Return an array of probabilities corresponding to each solution

        double[] probabilities = new double[solutions.size()];
        double totalFitness = 0.0;

        // Calculate the total fitness of all solutions
        for (int i = 0; i < solutions.size(); i++) {
            List<Node> solution = solutions.get(i);
            double fitness = 1.0 / evaluateSolution(solution); // Invert fitness for minimization problem
            totalFitness += fitness;
        }

        // Calculate probabilities based on fitness values
        for (int i = 0; i < solutions.size(); i++) {
            List<Node> solution = solutions.get(i);
            double fitness = 1.0 / evaluateSolution(solution); // Invert fitness for minimization problem
            probabilities[i] = fitness / totalFitness;
        }

        return probabilities;
    }

    private int selectSolutionWithRouletteWheel(double[] probabilities, Random random) {
        // Implement roulette wheel selection to choose a solution index based on probabilities
        // Return the selected solution index

        double randomValue = random.nextDouble();
        double cumulativeProbability = 0.0;

        for (int i = 0; i < probabilities.length; i++) {
            cumulativeProbability += probabilities[i];
            if (randomValue <= cumulativeProbability) {
                return i;
            }
        }

        // If no solution is selected, return the last solution
        return probabilities.length - 1;
    }

    private void scoutBeePhase(List<List<Node>> solutions, List<Double> solutionQualities) {
        // Implement the scout bee phase of the ABC algorithm here
        // Identify and replace abandoned solutions/routes (e.g., solutions with no improvement)
        // Update the solutions list with the new routes
        // Track the solution qualities for each solution

        int maxIterationsWithoutImprovement = 10; // Adjust this threshold as needed

        for (int i = 0; i < solutions.size(); i++) {
            List<Node> solution = solutions.get(i);

            // Check if the solution has not improved for a certain number of iterations
            if (solutionQualities.size() > i && i >= maxIterationsWithoutImprovement) {
                // Compare the quality of the current solution with the solution from
                // maxIterationsWithoutImprovement iterations ago
                double currentSolutionQuality = evaluateSolution(solution);
                double previousSolutionQuality = solutionQualities.get(i - maxIterationsWithoutImprovement);

                if (currentSolutionQuality >= previousSolutionQuality) {
                    // Replace the abandoned solution with a new randomly generated solution
                    List<Node> newSolution = generateRandomRoute();
                    solutions.set(i, newSolution);
                }
            }

            // Update the solution qualities list
            double currentQuality = evaluateSolution(solution);
            solutionQualities.add(currentQuality);
        }
    }


    private boolean hasNoImprovement(List<Node> solution, List<Double> solutionQualities) {
        // Implement a condition to check if a solution has not improved
        // You can use a threshold or some criteria to determine this
        // Return true if there's no improvement, false otherwise

        // Example: Compare the quality of the current solution with its previous versions
        int iterationsWithoutImprovement = 5; // Adjust this threshold as needed

        if (solutionQualities.size() < iterationsWithoutImprovement) {
            // If we don't have enough previous solutions to compare, consider it as an improvement
            return false;
        }

        double currentSolutionQuality = evaluateSolution(solution);

        // Compare the quality of the current solution with the last 'iterationsWithoutImprovement' solutions
        for (int i = 1; i <= iterationsWithoutImprovement; i++) {
            double previousSolutionQuality = solutionQualities.get(solutionQualities.size() - i);
            if (currentSolutionQuality > previousSolutionQuality) {
                // If the current solution is worse than any of the previous solutions, consider it as no improvement
                return true;
            }
        }

        // If none of the previous solutions were better, consider it as no improvement
        return false;
    }



// Implement other functions as needed...


    private List<Node> selectBestSolution(List<List<Node>> solutions) {
        // Select the best solution (route) from the list of solutions
        // You can use any criteria such as total distance, cost, or fitness
        // Return the best solution

        List<Node> bestSolution = null;
        double bestSolutionQuality = Double.MAX_VALUE; // Initialize with a high value for minimization

        for (List<Node> solution : solutions) {
            double solutionQuality = evaluateSolution(solution);

            // Compare the quality of the current solution with the best solution so far
            if (solutionQuality < bestSolutionQuality) {
                bestSolution = solution;
                bestSolutionQuality = solutionQuality;
            }
        }

        return bestSolution;
    }

}
