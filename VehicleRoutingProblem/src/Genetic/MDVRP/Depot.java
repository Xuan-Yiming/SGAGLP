package Genetic.MDVRP;


/*
Represents a depot in the problem domain. Superclass for CrowdedDepot.
 */
public class Depot {
    private final int id;
    private int x;
    private int y;
    private final int maxVehicles;
    private final int maxDuration;
    private final int maxVehicleLoad;  // Capacity


    public Depot(Integer id, Integer x, Integer y, Integer maxVehicles, Integer maxDuration, Integer maxVehicleLoad) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.maxVehicles = maxVehicles;
        this.maxDuration = maxDuration;
        this.maxVehicleLoad = maxVehicleLoad;
    }

    // Getters //
    public int getId() {
        return this.id;
    }

    public int getX() {
        return this.x;
    }

    // Setters //
    protected void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return this.y;
    }

    protected void setY(int y) {
        this.y = y;
    }

    public int getMaxDuration() {
        return maxDuration;
    }

    public int getMaxVehicles() {
        return this.maxVehicles;
    }

    public int getMaxVehicleLoad() {
        return maxVehicleLoad;
    }

    public Depot getDepotCopy() {
        return new Depot(this.id, this.x, this.y, this.maxVehicles, this.maxDuration, this.getMaxVehicleLoad());
    }


    @Override
    public String toString() {
        // return depot id
        return "" + this.id;
    }
}
