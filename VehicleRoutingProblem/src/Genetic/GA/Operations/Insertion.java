package Genetic.GA.Operations;

import Genetic.GA.Metrics;
import Genetic.MDVRP.Customer;
import Genetic.MDVRP.Depot;
import Genetic.MDVRP.Manager;
import Genetic.Utils.Euclidian;

import java.util.List;

/*
Data wrapper class to represent a possible insertion of a customer into a route
 */
public class Insertion implements Comparable<Insertion> {
    private final Manager manager;
    private final Depot depot;
    private final double cost;
    private final boolean isFeasible;
    private final List<List<Integer>> result;  // The result (all routes in depot) of this insertion


    public Insertion(Manager manager, Metrics metrics, Depot depot, List<List<Integer>> augmentedRoutes, int customerID, int routeLoc, int index) {
        this.manager = manager;
        this.depot = depot;

        this.cost = this.insertionCost(augmentedRoutes, customerID, routeLoc, index);
        this.isFeasible = metrics.checkRoutes(depot, augmentedRoutes.get(routeLoc));
        this.result = augmentedRoutes;
    }

    public static Insertion findBest(List<Insertion> insertions) {
        Insertion leader = insertions.get(0);
        for (Insertion insertion : insertions) {
            if (insertion.getCost() < leader.getCost()) {
                leader = insertion;
            }
        }
        return leader;
    }

    private double insertionCost(List<List<Integer>> routes, int customerID, int routeLoc, int index) {
        /*
        Computes the insertion cost of the insertion, based on which route and location in said route insertion is applied
         */
        List<Integer> augmentedRoute = routes.get(routeLoc);
        Customer customer = this.manager.getCustomer(customerID);

        // If this insertion created a new route distance, the cost is simply twice the distance between depot and customer
        if (augmentedRoute.size() == 1) {
//            return 2 * Euclidian.distance(new int[]{depot.getX(), depot.getY()}, new int[]{customer.getX(), customer.getY()}, this.manager);
            return 2 * Euclidian.distance(depot.getId(), customer.getId(), this.manager);
        }


        // If this insertion was at start or end of route,
        // cost = distance from depot to customer and customer to old first/last customer minus distance from depot to old first/last customer
        if (index == 0 || index == augmentedRoute.size() - 1) {
            int offset = index == 0 ? 1 : -1;
            Customer otherCustomer = this.manager.getCustomer(augmentedRoute.get(index + offset));
//            double distanceToDepot = Euclidian.distance(new int[]{depot.getX(), depot.getY()}, new int[]{customer.getX(), customer.getY()}, this.manager);
            double distanceToDepot = Euclidian.distance(depot.getId(), customer.getId(), this.manager);
//            double distanceToOther = Euclidian.distance(new int[]{customer.getX(), customer.getY()}, new int[]{otherCustomer.getX(), otherCustomer.getY()}, this.manager);
            double distanceToOther = Euclidian.distance(customer.getId(), otherCustomer.getId(), this.manager);
//            double distanceDepotToOther = Euclidian.distance(new int[]{depot.getX(), depot.getY()}, new int[]{otherCustomer.getX(), otherCustomer.getY()}, this.manager);
            double distanceDepotToOther = Euclidian.distance(depot.getId(), otherCustomer.getId(), this.manager);
            return distanceToDepot + distanceToOther - distanceDepotToOther;
        }

        // Else insertion is at location between two customers, and
        // cost = distance from customer to both other customers minus distance between both other customers
        Customer customerBefore = this.manager.getCustomer(augmentedRoute.get(index - 1));
        Customer customerAfter = this.manager.getCustomer(augmentedRoute.get(index + 1));
//        double distanceToCustomerBefore = Euclidian.distance(new int[]{customer.getX(), customer.getY()}, new int[]{customerBefore.getX(), customerBefore.getY()}, this.manager);
        double distanceToCustomerBefore = Euclidian.distance(customer.getId(), customerBefore.getId(), this.manager);
//        double distanceToCustomerAfter = Euclidian.distance(new int[]{customer.getX(), customer.getY()}, new int[]{customerAfter.getX(), customerAfter.getY()}, this.manager);
        double distanceToCustomerAfter = Euclidian.distance(customer.getId(), customerAfter.getId(), this.manager);
//        double distanceBetweenBeforeAfter = Euclidian.distance(new int[]{customerBefore.getX(), customerBefore.getY()}, new int[]{customerAfter.getX(), customerAfter.getY()}, this.manager);
        double distanceBetweenBeforeAfter = Euclidian.distance(customerBefore.getId(), customerAfter.getId(), this.manager);
        return (distanceToCustomerBefore + distanceToCustomerAfter) - distanceBetweenBeforeAfter;
    }

    public Depot getDepot() {
        return depot;
    }

    public double getCost() {
        return cost;
    }

    public boolean isFeasible() {
        return isFeasible;
    }

    public List<List<Integer>> getResult() {
        return result;
    }

    @Override
    public String toString() {
        return "" + this.cost;
    }

    @Override
    public int compareTo(Insertion insertion) {
        return Double.compare(this.cost, insertion.getCost());
    }
}
