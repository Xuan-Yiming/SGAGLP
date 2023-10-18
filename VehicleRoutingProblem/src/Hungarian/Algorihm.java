package Hungarian;
import Genetic.MDVRP.Customer;
import Genetic.MDVRP.Depot;

import java.awt.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Algorihm {
    List<Storage> storages = new ArrayList();
    List<Car> cars = new ArrayList();
    List<Order> orders = new ArrayList();
    List<List<Node>> solution = new ArrayList();
    int width;
    int height;
    List<Point> obstacles = new ArrayList();

    public Algorihm(List<Depot> depots, List<Customer> customers, List<Point> obstacles, int nVehicles, double maxCapacity, int width, int height){

        for(Depot depot: depots){
            storages.add(new Storage(depot.getX(), depot.getY(), depot.getMaxVehicleLoad(), 'A'));
        }

        for (int i = 0; i < nVehicles; i++) {
            cars.add(new Car(maxCapacity,storages.get(i%storages.size()).getX(), storages.get(i%storages.size()).getY()));
        }

        for(Customer customer: customers) {
            //create a new date using the date of the system and add the duration of the route
            Date date = new Date();
            date.setHours(date.getHours() + customer.getDuration());
            orders.add(new Order(customer.getX(), customer.getY(), customer.getDemand(), customer.getId(), date));
        }
        this.width = width;
        this.height = height;
    }

    public void run() throws InterruptedException {
        PathFind pathFind = new PathFind( this.width, this.height, this.obstacles);
        pathFind.cars = cars;
        pathFind.orders = orders;
        pathFind.datePriority = 0.99;
        pathFind.distancePriority = 0.5;
        this.solution = pathFind.solution();
    }

    public List<List<Node>> getSolution(){
        return this.solution;
    }

    public double getCost(){
        double cost = 0;
        for(int i = 0; i < solution.size(); ++i) {
            for(int j = 0; j < ((List)solution.get(i)).size(); ++j) {
                if (((List)solution.get(i)).get(j) != null) {
                    Order order = (Order)((List)solution.get(i)).get(j);
                    cost += order.getVolumn();
                }
            }
        }
        return cost;
    }
}
