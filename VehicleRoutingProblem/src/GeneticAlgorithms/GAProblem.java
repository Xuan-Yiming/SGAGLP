package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.util.ArrayList;

public class GAProblem {
    private ArrayList<Vehicle> vehicles;
    private ArrayList<Node> orders;
    private ArrayList<Node> depots;
    private ArrayList<Node> blocks;

    // Constructors
    public GAProblem(ArrayList<Node> orders, ArrayList<Vehicle> vehicles, ArrayList<Node> depots, ArrayList<Node> blocks) {
        this.orders = orders;
        this.vehicles = vehicles;
        this.depots = depots;
        this.blocks = blocks;
    }

    // Getters and Setters

    public ArrayList<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(ArrayList<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public ArrayList<Node> getOrders() {
        return orders;
    }

    public void setOrders(ArrayList<Node> orders) {
        this.orders = orders;
    }

    public ArrayList<Node> getDepots() {
        return depots;
    }

    public void setDepots(ArrayList<Node> depots) {
        this.depots = depots;
    }

    public ArrayList<Node> getBlocks() {
        return blocks;
    }

    public void setBlocks(ArrayList<Node> blocks) {
        this.blocks = blocks;
    }
}
