import java.awt.*;
import java.util.Random;

public class Vehicle implements Comparable<Vehicle> {

	Map map;
	String successPath = new String();
//	char dna[]; // the vehicle's DNA (route)
	Point dna[]; // the vehicle's DNA (route)
	int lengthOfDNA;
	float fitness;
	int numberOfSuccessfulMove;

	public Vehicle(int lengthOfDNA, Map map) {
		this.lengthOfDNA = lengthOfDNA;
		this.map = map;
//		dna = new char[lengthOfDNA + 1];
		dna = new Point[lengthOfDNA + 1];
		successPath = "";
	}

	/**
	 * Create random mice DNA
	 */
	public void createDNA() {
		Random rand = new Random();
		int choice;
		int i = 0;
		for (i = 0; i < lengthOfDNA; i++) {
			choice = rand.nextInt(4);
			switch (choice) {
			case 0: {
				//dna[i] = Genetic.GO_LEFT_c; // Left
				dna[i] = new Point(-1, 0);
				break;
			}
			case 1: {
				//dna[i] = Genetic.GO_UP_c; // Up
				dna[i] = new Point(0, -1);
				break;
			}
			case 2: {
				//dna[i] = Genetic.GO_RIGHT_c; // Right
				dna[i] = new Point(1, 0);
				break;
			}
			case 3: {
				//na[i] = Genetic.GO_DOWN_c; // Down
				dna[i] = new Point(0, 1);
				break;
			}
			}
		}
		dna[i] = new Point(0, 0);
	}

	/**
	 * Print vehicle DNA sequence
	 */
	public void showDNA() {
		for (int i = 0; i < lengthOfDNA; i++) {
			System.out.print(dna[i].x + "," + dna[i].y + " - ");
		}
	}

	@Override
	public int compareTo(Vehicle object) {
		Vehicle f = (Vehicle) object;

		if (fitness == object.fitness) {
			return 0;
		} else if (fitness > object.fitness)
			return -1;
		else
			return 1;
	}

}
