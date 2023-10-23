package GeneticAlgorithms;

import GeneticAlgorithms.Problem.Node;

public class Gene {
    private Node node;

    // Constrator
    public Gene(Node node) {
        this.node = node;
    }

    // getters and setters
    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }
}
