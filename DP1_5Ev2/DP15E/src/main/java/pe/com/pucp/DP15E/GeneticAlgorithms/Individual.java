package pe.com.pucp.DP15E.GeneticAlgorithms;

import pe.com.pucp.DP15E.GeneticAlgorithms.Problem.Node;

import java.util.ArrayList;

//una solucion
public class Individual implements Cloneable {
    private Chromosome chromosome;
    private double fitness = 0;
    private GAProblem problem;

    // Constructors
    public Individual(GAProblem problem) {
        this.problem = problem.clone();
        chromosome = new Chromosome(this.problem);
    }

    // Methods
    public double calculateFitness() {
        fitness = chromosome.calculateFitness();
        return fitness;
    }

    // @Override
    // public Individual clone() {
    // try {
    // return (Individual) super.clone();
    // } catch (CloneNotSupportedException e) {
    // throw new AssertionError(); // This should not happen.
    // }
    // }

    public Individual clone() {
        Individual individual = new Individual(this.problem);
        individual.setFitness(this.fitness);
        individual.setChromosome(new Chromosome());
        individual.getChromosome().setGAProblem(problem.clone());
        individual.getChromosome().setDepotRate(problem.DEPOTRATE);

        ArrayList<Gene> genes = new ArrayList<>();
        for (int i = 0; i < this.chromosome.genes.size(); i++) {
            Gene gene = new Gene();
            gene.setId(this.chromosome.genes.get(i).getId());
            gene.setPosicion(this.chromosome.genes.get(i).getPosicion());
            gene.setType(this.chromosome.genes.get(i).getType());
            gene.setPesoBruto(this.chromosome.genes.get(i).getPesoBruto());
            gene.setCargaGLP(this.chromosome.genes.get(i).getCargaGLP());
            gene.setPesoNeto(this.chromosome.genes.get(i).getPesoNeto());
            gene.setVelocidad(this.chromosome.genes.get(i).getVelocidad());
            gene.setCargaPetroleo(this.chromosome.genes.get(i).getCargaPetroleo());
            gene.setMantenimiento(this.chromosome.genes.get(i).getMantenimiento());
            gene.setTotalTime(this.chromosome.genes.get(i).getTotalTime());

            ArrayList<Node> nodes = new ArrayList<>();

            for (int j = 0; j < this.chromosome.genes.get(i).getRoute().size(); j++) {
                nodes.add(this.chromosome.genes.get(i).getRoute().get(j).clone());
            }
            gene.setRoute(nodes);
            genes.add(gene);
        }

        individual.getChromosome().genes = genes;
        return individual;
    }

    // Getters and Setters
    public Chromosome getChromosome() {
        return chromosome;
    }

    public void setChromosome(Chromosome chromosome) {
        this.chromosome = chromosome;
    }

    public double getFitness() {
        return fitness;
    }

    public void setFitness(double fitness) {
        this.fitness = fitness;
    }
}
