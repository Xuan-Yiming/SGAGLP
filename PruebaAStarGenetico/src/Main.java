import Clases.DemoPanel;
import Clases.Node;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {

        ArrayList<Node> bloqueos = new ArrayList<>();

        bloqueos.add(new Node(10,2));
        bloqueos.add(new Node(10,3));
        bloqueos.add(new Node(10,4));
        bloqueos.add(new Node(10,5));
        bloqueos.add(new Node(10,6));
        bloqueos.add(new Node(10,7));
        bloqueos.add(new Node(6,2));
        bloqueos.add(new Node(7,2));
        bloqueos.add(new Node(8,2));
        bloqueos.add(new Node(9,2));
        bloqueos.add(new Node(11,7));
        bloqueos.add(new Node(12,7));
        bloqueos.add(new Node(6,1));
        bloqueos.add(new Node(6,2));
        bloqueos.add(new Node(6,2));
        bloqueos.add(new Node(6,1));
        bloqueos.add(new Node(7,7));


        DemoPanel dp = new DemoPanel(bloqueos,new Node(4,7),new Node(11,5));

        dp.autoSearch();

        for(int i =0 ;i<dp.BestPath.size();i++){
            System.out.println("X:" + dp.BestPath.get(i).row + " Y: "+ dp.BestPath.get(i).col);
        }
        System.out.println("HOla");
    }
}