package Genetic.MDVRP;

import java.util.ArrayList;
import java.util.List;


/*
Represents a customer in the problem domain
 */
public class Customer {
    private final int id;
    private int x;
    private int y;
    private final int duration;
    private final int demand;
    private boolean onBorderline;
    private final List<Integer> possibleDepotsIDs = new ArrayList<>();


    public Customer(Integer id, Integer x, Integer y, Integer duration, Integer demand) {
        this.id = id;
        this.x = x;                     // x coordinate
        this.y = y;                     // y coordinate
        this.duration = duration;       // service duration
        this.demand = demand;           // service demand
    }

    public void addPossibleDepot(int possibleDepotsID) {
        this.possibleDepotsIDs.add(possibleDepotsID);
    }

    public void setOnBorderline() {
        if (!this.onBorderline) {
            this.onBorderline = true;
        }
    }

    public int getId() {
        return id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }  // Used to shift coordinates before plotting

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getDuration() {
        return duration;
    }

    public int getDemand() {
        return demand;
    }

    public boolean getOnBorder() {
        return onBorderline;
    }

    public List<Integer> getPossibleDepots() {
        return possibleDepotsIDs;
    }

    @Override
    public String toString() {
        // return customer id
        return "" + this.id;
    }

}
