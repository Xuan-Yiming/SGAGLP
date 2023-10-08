import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

public class Genetic {

	public static final String GO_LEFT = "L";
	public static final String GO_UP = "U";
	public static final String GO_RIGHT = "R";
	public static final String GO_DOWN = "D";

	public static final char GO_LEFT_c = 'L';
	public static final char GO_UP_c = 'U';
	public static final char GO_RIGHT_c = 'R';
	public static final char GO_DOWN_c = 'D';

	public static final float MAX_POINT = 100.0f;

	public static final int USE_EUCLIDIAN = 1;
	public static final int USE_MANHATTAN = 2;

	ArrayList<Vehicle> vehicleList = new ArrayList<Vehicle>();
	Map map;
	int population;
	int lengthOfDNA;
	double selectionRate, mutuationRate;
	int deterministicMode;
	ArrayList<Vehicle> selectedVehicle = new ArrayList<Vehicle>();

	public Genetic(int population, int lengthOfDNA, Map map, double selectionRate, double mutuationRate,
				   int deterministicMode) {
		this.population = population;
		this.lengthOfDNA = lengthOfDNA;
		this.map = map;
		this.selectionRate = selectionRate;
		this.mutuationRate = mutuationRate;
		this.deterministicMode = deterministicMode;

		for (int i = 0; i < population; i++) {
			vehicleList.add(new Vehicle(lengthOfDNA, map));
			vehicleList.get(i).createDNA();
		}
	}

	/**
	 * Check if mice's DNA includes LR, RL, UD, DU. If then it means penalty
	 * 
	 * @param vehicle the vehicle
	 * @param i    DNA index
	 * @return If penalty 1, otherwise 0
	 */
	public int isPenalty(Vehicle vehicle, int i) {
		if ((vehicle.dna[i - 1].x + vehicle.dna[i].x == 0) && (vehicle.dna[i - 1].y + vehicle.dna[i].y == 0)) {
			return 1;
		} else
			return 0;
	}

	public int dnaConflictPenalty(Vehicle vehicle) {
		int penalty = 0;
//		char dna[] = vehicle.dna;
		Point dna[] = vehicle.dna;
		for (int i = 1; i < dna.length; i++) {
			if ((dna[i - 1].x + dna[i].x == 0) && (dna[i - 1].y + dna[i].y == 0)) {
				penalty++;
			}
		}
		return penalty * 2;
	}

	public float deterministic(int x1, int y1, int x2, int y2) {
		if (deterministicMode == USE_EUCLIDIAN) {
			return euclidian(x1, y1, x2, y2);
		} else if (deterministicMode == USE_MANHATTAN) {
			return manhattan(x1, y1, x2, y2);
		}
		System.out.println("Set Deterministic Mode!");
		return -1.0f;
	}

	public float euclidian(int x1, int y1, int x2, int y2) {
		float x_sqr = (float) ((x1 - x2) * (x1 - x2));
		float y_sqr = (float) ((y1 - y2) * (y1 - y2));
		return (float) Math.sqrt(x_sqr + y_sqr);
	}

	public float manhattan(int x1, int y1, int x2, int y2) {
		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	}

	public void fitnessCalculation(Vehicle vehicle) {
		int i, cont, numberOfSuccessfulMove;
		int current_x, current_y, target_x, target_y, start_x, start_y;
		float maxDistance, currentDistance;

		current_x = map.getStart().getX();
		current_y = map.getStart().getY();
		target_x = map.getStop().getX();
		target_y = map.getStop().getY();
		start_x = map.getStart().getX();
		start_y = map.getStart().getY();

		i = 0;
		cont = 1; // continue
		while (i < vehicle.lengthOfDNA && cont > 0) {
//			switch (vehicle.dna[i]) {
//			case 'L': {
//				current_x--;
//				break;
//			}
//			case 'R': {
//				current_x++;
//				break;
//			}
//			case 'U': {
//				current_y--;
//				break;
//			}
//			case 'D': {
//				current_y++;
//				break;
//			}
//			}
			current_x += vehicle.dna[i].x;
			current_y += vehicle.dna[i].y;

			// Found target
			if (current_x == target_x && current_y == target_y) {
				cont = 0;
			}
			// Hit the wall
			else if (map.isObstacle(current_x, current_y)) {
				cont = -1;
			}

			i++;
		}
		numberOfSuccessfulMove = i - 1;
		vehicle.numberOfSuccessfulMove = numberOfSuccessfulMove;

		// Found target
		if (cont == 0) {
			vehicle.fitness = MAX_POINT;
		} else {
			maxDistance = deterministic(start_x, start_y, target_x, target_y);
			currentDistance = deterministic(current_x, current_y, target_x, target_y);
			vehicle.fitness = (float) (MAX_POINT * (1.0f - (currentDistance / maxDistance)));
			// mice.fitness *= (float) ( ((float)numberOfSuccessfulMove /
			// (float)lengthOfDNA));
			// mice.fitness *= (float) ( 1.0 - (dnaConflictPenalty(mice) /
			// (float)lengthOfDNA) );
		}

	}

	public Vehicle showFitness() {
		for (int i = 0; i < population; i++) {
			fitnessCalculation(vehicleList.get(i));
			// System.out.println(" fitness= " + miceList.get(i).fitness + " numberofMove= "
			// + miceList.get(i).numberOfSuccessfulMove);

//			vehicleList.get(i).map.drawGen(new String(vehicleList.get(i).dna), map.randomColor(),
//					vehicleList.get(i).numberOfSuccessfulMove);

			if (vehicleList.get(i).fitness >= MAX_POINT) {
				return vehicleList.get(i);
			}
		}
		return null;
	}

	public void selection() {
		Collections.sort(vehicleList);

		selectedVehicle.clear();

		for (int j = 0; j < (selectionRate * population); j++) {
			selectedVehicle.add(vehicleList.get(j));
		}
	}

	public void crossover() {
		vehicleList.clear();
		Random rand = new Random();
		for (int k = 0; k < population / 2 + population % 2; k++) {

			int mice1 = (int) (rand.nextDouble() * selectionRate * population); // selected mice1 index
			int mice2; // selected mice2 index
			do {
				mice2 = (int) (rand.nextDouble() * selectionRate * population); // update mice2 if mice1==mice2
			} while (mice2 == mice1);

			int crossoverPoint = rand.nextInt(lengthOfDNA) + 1;

			vehicleList.add(new Vehicle(lengthOfDNA, map));
			vehicleList.add(new Vehicle(lengthOfDNA, map));

			for (int j = 0; j < lengthOfDNA; j++) {
				if (j < crossoverPoint) {
					vehicleList.get(2 * k).dna[j] = selectedVehicle.get(mice1).dna[j];
					vehicleList.get(2 * k + 1).dna[j] = selectedVehicle.get(mice2).dna[j];
				} else {
					vehicleList.get(2 * k).dna[j] = selectedVehicle.get(mice2).dna[j];
					vehicleList.get(2 * k + 1).dna[j] = selectedVehicle.get(mice1).dna[j];
				}
			}
		}
	}

	public void mutuation() {
		Random rand = new Random();
		int choice;

		for (int i = 0; i < population; i++) {
			for (int j = 0; j < lengthOfDNA; j++) {
				if (rand.nextFloat() < mutuationRate) {

					choice = rand.nextInt(4);

					switch (choice) {
					case 0: {
						//vehicleList.get(i).dna[j] = Genetic.GO_LEFT_c; // Left
						vehicleList.get(i).dna[j] = new Point(-1, 0);

						break;
					}
					case 1: {
//						vehicleList.get(i).dna[j] = Genetic.GO_UP_c; // Up
						vehicleList.get(i).dna[j] = new Point(0, 1);

						break;
					}
					case 2: {
//						vehicleList.get(i).dna[j] = Genetic.GO_RIGHT_c; // Right
						vehicleList.get(i).dna[j] = new Point(1, 0);

						break;
					}
					case 3: {
//						vehicleList.get(i).dna[j] = Genetic.GO_DOWN_c; // Down
						vehicleList.get(i).dna[j] = new Point(0,1 );
						//vehicleList.get(i).dna[j] = new Point(1, 1);

						break;
					}
					}
				}
			}
		}
	}

}
