import Algoritmos.HungarianAlgorithm;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        double[][] costMatrix = {
                {3, 5, 6, 7},
                {5, 5, 2, 3},
                {7, 7, 9, 5},
                {1, 8, 8, 3}
        };


        HungarianAlgorithm hbm = new HungarianAlgorithm(costMatrix);
        int[] result = hbm.execute();
        int [][] assigment = new int[4][4];
        for (int i = 0; i < 4; i++) {
            assigment[i][result[i]] = (int)costMatrix[i][result[i]];
        }

        for (int i = 0; i < 4; i++) {
            System.out.println(Arrays.toString(assigment[i]));
        }
    }

}