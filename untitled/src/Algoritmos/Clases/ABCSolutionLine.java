package Algoritmos.Clases;

public class ABCSolutionLine {
    public int[] foodSource ;
    public double maximize ;
    public double fitness ;
    public int trial ;

    public ABCSolutionLine(){
        foodSource = new int[2];
        maximize =0.0;
        fitness = 0.0;
        trial = 0;
    }
}
