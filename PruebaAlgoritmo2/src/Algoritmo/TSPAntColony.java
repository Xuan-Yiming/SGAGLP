package Algoritmo;

import Clases.Pedido;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class TSPAntColony {
    private List<Pedido> pedidos;
    private int numAnts;
    private int numIterations;
    private double[][] distanceMatrix;
    private double[][] pheromoneMatrix;
    private double alpha; // Parámetro alpha
    private double beta; // Parámetro beta
    private double evaporationRate; // Tasa de evaporación de feromonas
    private double[][] probabilities;

    public Pedido puntoInicio = new Pedido(3,21);

    public TSPAntColony(List<Pedido> pedidos, int numAnts, int numIterations,
                        double alpha, double beta, double evaporationRate) {
        this.pedidos = pedidos;
        this.numAnts = numAnts;
        this.numIterations = numIterations;
        this.alpha = alpha;
        this.beta = beta;
        this.evaporationRate = evaporationRate;
        int numPedidos = pedidos.size();
        this.distanceMatrix = new double[numPedidos][numPedidos];
        this.pheromoneMatrix = new double[numPedidos][numPedidos];
        this.probabilities = new double[numPedidos][numPedidos];

        // Inicializa la matriz de distancias con las distancias euclidianas
        for (int i = 0; i < numPedidos; i++) {
            for (int j = 0; j < numPedidos; j++) {
                if (i != j) {
                    distanceMatrix[i][j] = calculateDistance(pedidos.get(i), pedidos.get(j));
                } else {
                    distanceMatrix[i][j] = 0.0; // Distancia de un pedido a sí mismo es cero
                }
                pheromoneMatrix[i][j] = 0.1; // Inicializa la matriz de feromonas con valores iniciales
            }
        }
    }

    // Resto de los métodos, similares a la implementación anterior
    public double calculateDistance(Pedido pedido1, Pedido pedido2) {
        int dx = pedido1.getX() - pedido2.getX();
        int dy = pedido1.getY() - pedido2.getY();
        return Math.sqrt(dx * dx + dy * dy);
    }
    public List<Pedido> solveTSP() {
        Random random = new Random();
        List<Pedido> bestTour = null;
        double bestTourLength = Double.MAX_VALUE;

        for (int iteration = 0; iteration < numIterations; iteration++) {
            List<List<Pedido>> antTours = new ArrayList<>();

            // Construye soluciones para todas las hormigas
            for (int ant = 0; ant < numAnts; ant++) {
                List<Pedido> tour = buildSolution(ant, random);
                antTours.add(tour);

                double tourLength = calculateTourLength(tour);
                if (tourLength < bestTourLength) {
                    bestTourLength = tourLength;
                    bestTour = new ArrayList<>(tour);
                }
            }

            // Actualiza las feromonas en la matriz de feromonas
            updatePheromones(bestTour);
        }

        return bestTour;
    }
    private void updatePheromones(List<Pedido> bestTour) {
        // Evaporación de feromonas
        for (int i = 0; i < pedidos.size(); i++) {
            for (int j = 0; j < pedidos.size(); j++) {
                if (i != j) {
                    pheromoneMatrix[i][j] *= (1.0 - evaporationRate);
                }
            }
        }

        // Depósito de feromonas en la mejor solución encontrada
        for (int i = 0; i < bestTour.size() - 1; i++) {
            Pedido fromPedido = bestTour.get(i);
            Pedido toPedido = bestTour.get(i + 1);
            pheromoneMatrix[fromPedido.getIndex()][toPedido.getIndex()] += 1.0 / calculateTourLength(bestTour);
            pheromoneMatrix[toPedido.getIndex()][fromPedido.getIndex()] = pheromoneMatrix[fromPedido.getIndex()][toPedido.getIndex()]; // Simetría
        }
    }
    private double calculateTourLength(List<Pedido> tour) {
        double tourLength = 0.0;

        // Recorre la lista de pedidos en el orden del tour
        for (int i = 0; i < tour.size() - 1; i++) {
            Pedido fromPedido = tour.get(i);
            Pedido toPedido = tour.get(i + 1);

            // Calcula la distancia entre los dos pedidos y suma a la longitud del tour
            double distance = distanceMatrix[fromPedido.getIndex()][toPedido.getIndex()];
            tourLength += distance;
        }

       /* // Agrega la distancia desde el último pedido de vuelta al primero
        Pedido lastPedido = tour.get(tour.size() - 1);
        Pedido firstPedido = tour.get(0);
        double distanceBack = distanceMatrix[lastPedido.getIndex()][firstPedido.getIndex()];
        tourLength += distanceBack;

        */

        return tourLength;
    }
    private List<Pedido> buildSolution(int ant, Random random) {
        List<Pedido> tour = new ArrayList<>();
        List<Pedido> remainingPedidos = new ArrayList<>(pedidos); // Copia de la lista de pedidos no visitados

        Pedido currentPedido = remainingPedidos.get(random.nextInt(remainingPedidos.size())); // Nodo inicial aleatorio
        tour.add(currentPedido);
        remainingPedidos.remove(currentPedido);

        while (!remainingPedidos.isEmpty()) {
            double[] probabilities = calculateProbabilities(currentPedido, remainingPedidos);

            // Selección del próximo pedido basado en las probabilidades calculadas
            int nextIndex = selectNextPedido(probabilities, random);
            Pedido nextPedido = remainingPedidos.get(nextIndex);

            // Agrega el próximo pedido a la ruta y actualiza el pedido actual
            tour.add(nextPedido);
            currentPedido = nextPedido;
            remainingPedidos.remove(nextPedido);
        }

        tour.add(0, puntoInicio);
        tour.add(puntoInicio);

        return tour;
    }
    private double[] calculateProbabilities(Pedido currentPedido, List<Pedido> remainingPedidos) {
        double[] probabilities = new double[remainingPedidos.size()];
        double totalProbability = 0.0;

        for (int i = 0; i < remainingPedidos.size(); i++) {
            Pedido nextPedido = remainingPedidos.get(i);
            double pheromone = pheromoneMatrix[currentPedido.getIndex()][nextPedido.getIndex()]; // Asegúrate de tener un método getIndex en la clase Pedido
            double distance = distanceMatrix[currentPedido.getIndex()][nextPedido.getIndex()]; // Asegúrate de tener un método getIndex en la clase Pedido
            probabilities[i] = Math.pow(pheromone, alpha) * Math.pow(1.0 / distance, beta);
            totalProbability += probabilities[i];
        }

        for (int i = 0; i < remainingPedidos.size(); i++) {
            probabilities[i] /= totalProbability;
        }

        return probabilities;
    }

    private int selectNextPedido(double[] probabilities, Random random) {
        double randomValue = random.nextDouble();
        double cumulativeProbability = 0.0;

        for (int i = 0; i < probabilities.length; i++) {
            cumulativeProbability += probabilities[i];
            if (randomValue <= cumulativeProbability) {
                return i;
            }
        }

        return probabilities.length - 1; // Por si hay errores de redondeo
    }

    public void chequearDistancias(){

        System.out.println( calculateDistance(puntoInicio,pedidos.get(0)));

        System.out.println( calculateDistance(pedidos.get(0),pedidos.get(4)));
        System.out.println( calculateDistance(pedidos.get(4),pedidos.get(3)));
        System.out.println( calculateDistance(pedidos.get(3),pedidos.get(2)));
        System.out.println( calculateDistance(pedidos.get(2),pedidos.get(1)));

        System.out.println( calculateDistance(pedidos.get(1),puntoInicio));

    }

    public static void main(String[] args) {
        List<Pedido> pedidos = new ArrayList<>();

        // Agrega los pedidos a la lista
/*

        Pedido ped1 = new Pedido(1,18,0);
        Pedido ped2 = new Pedido(1,1,1);
        Pedido ped3 = new Pedido(12,4,2);
        Pedido ped4 = new Pedido(10,13,3);
        Pedido ped5 = new Pedido(9,19,4);
*/
        Pedido ped1 = new Pedido(4,7,0);
        Pedido ped2 = new Pedido(11,1,1);
        Pedido ped3 = new Pedido(9,11,2);
        Pedido ped4 = new Pedido(14,18,3);
        Pedido ped5 = new Pedido(1,15,4);


        pedidos.add(ped1);
        pedidos.add(ped2);
        pedidos.add(ped3);
        pedidos.add(ped4);
        pedidos.add(ped5);
        pedidos.add(new Pedido(13,4));






        // Agrega más pedidos según sea necesario

        int numAnts = 200; // Número de hormigas
        int numIterations = 100; // Número de iteraciones
        double alpha = 1.0; // Parámetro alpha
        double beta = 2.0; // Parámetro beta
        double evaporationRate = 0.01; // Tasa de evaporación de feromonas

        TSPAntColony antColony = new TSPAntColony(pedidos, numAnts, numIterations, alpha, beta, evaporationRate);



        for (int i=0;i<1;i++){
            List<Pedido> bestTour = antColony.solveTSP();

            System.out.println("Mejor tour encontrado: " + bestTour);
            System.out.println("Longitud del tour: " + antColony.calculateTourLength(bestTour));
            //antColony.chequearDistancias();
        }

    }
}


