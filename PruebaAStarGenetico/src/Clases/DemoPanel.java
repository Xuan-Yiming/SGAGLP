package Clases;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;

public class DemoPanel extends JPanel {
    final int maxCol =70;
    final int maxRow = 40;


    //NODE

    Node[][] node = new Node[maxCol][maxRow];
    Node startNode,goalNode,currentNode;
    ArrayList<Node> openList = new ArrayList<>();
    ArrayList<Node> checkedList = new ArrayList<>();
    boolean goalReached = false;
    int step = 0;
    int maxSteps = maxCol*maxRow;

    public ArrayList<Node> BestPath = new ArrayList<>();


    public DemoPanel(ArrayList<Node> bloqueos,Node inicio,Node fin)
    {

        //PLACE NODES
        int col = 0;
        int row = 0;


        while(col < maxCol && row < maxRow){
            node[col][row] = new Node(col,row);
            this.add(node[col][row]);
            col++;
            if(col == maxCol){
                col =0;
                row ++;
            }
        }

        setStartNode(inicio.col, inicio.row);
        setGoalNode(fin.col, fin.row);



        for(int i=0;i<bloqueos.size();i++){
            setSolidNode(bloqueos.get(i).col,bloqueos.get(i).row);
        }

        setCostOnNodes();

    }

    private void setStartNode(int col,int row){
        node[col][row].setAsStar();
        startNode = node[col][row];
        currentNode = startNode;
    }

    private void setGoalNode(int col,int row){
        node[col][row].setAsGoal();
        goalNode = node[col][row];
    }

    private void setSolidNode(int col, int row){
        node[col][row].setAsSolid();
    }

    private void setCostOnNodes(){
        int col =0;
        int row =0 ;


        while(col < maxCol && row <maxRow){

            getCost(node[col][row]);
            col++;
            if(col == maxCol){
                col = 0;
                row++;
            }

        }
    }

    private void getCost(Node node){
        // get Gcost distance from start node

        int xDistance = Math.abs(node.col- startNode.col);
        int yDistance = Math.abs(node.row- startNode.row);
        node.gCost  = xDistance + yDistance;

        // get Hcost, ditance from goal node

        xDistance = Math.abs(node.col- goalNode.col);
        yDistance = Math.abs(node.row- goalNode.row);
        node.hCost  = xDistance + yDistance;

        // get Fcost, total cost

        node.fCost = node.gCost + node.hCost;



    }

    public void search(){
        if(goalReached == false && step < 300){
            int col = currentNode.col;
            int row = currentNode.row;

            currentNode.setAsChecked();
            checkedList.add(currentNode);
            openList.remove(currentNode);

            //open the up node
            if(row-1>=0){
                openNode(node[col][row-1]);
            }

            //open the left node
            if(col-1 >=0){
                openNode(node[col-1][row]);
            }

            //open the down node
            if(row+1 <maxRow){
                openNode(node[col][row+1]);
            }

            //open the right node
            if(col+1 <maxCol){
                openNode(node[col+1][row]);
            }

            //FIND THE BEST NODE

            int bestNodeIndex =0;
            int besNodefCost = 999;

            for(int i =0 ; i< openList.size();i++){
                //check if this node Fcost is better
                if(openList.get(i).fCost < besNodefCost){
                    bestNodeIndex = i;
                    besNodefCost = openList.get(i).fCost;
                }
                //if F cost is equal, check G cost
                else if(openList.get(i).fCost == besNodefCost){
                    if(openList.get(i).gCost < openList.get(bestNodeIndex).gCost){
                        bestNodeIndex = i;
                    }
                }

            }

            //After the loop, we get the best node which is our next step
            currentNode = openList.get(bestNodeIndex);

            if(currentNode == goalNode){
                goalReached = true;
            }
        }
        step++;
    }

    public void autoSearch(){
        while(goalReached == false && step <maxSteps){
            int col = currentNode.col;
            int row = currentNode.row;

            currentNode.setAsChecked();
            checkedList.add(currentNode);
            openList.remove(currentNode);

            //open the up node
            if(row-1>=0){
                openNode(node[col][row-1]);
            }

            //open the left node
            if(col-1 >=0){
                openNode(node[col-1][row]);
            }

            //open the down node
            if(row+1 <maxRow){
                openNode(node[col][row+1]);
            }

            //open the right node
            if(col+1 <maxCol){
                openNode(node[col+1][row]);
            }

            //FIND THE BEST NODE

            int bestNodeIndex =0;
            int besNodefCost = 999;

            for(int i =0 ; i< openList.size();i++){
                //check if this node Fcost is better
                if(openList.get(i).fCost < besNodefCost){
                    bestNodeIndex = i;
                    besNodefCost = openList.get(i).fCost;
                }
                //if F cost is equal, check G cost
                else if(openList.get(i).fCost == besNodefCost){
                    if(openList.get(i).gCost < openList.get(bestNodeIndex).gCost){
                        bestNodeIndex = i;
                    }
                }

            }

            //After the loop, we get the best node which is our next step
            currentNode = openList.get(bestNodeIndex);

            if(currentNode == goalNode){
                goalReached = true;
                trackThePath();
            }
            step++;
        }
    }

    private  void openNode(Node node){
        if(node.open == false && node.checked == false && node.solid== false){
            //if the node is not opened yet, add it to the open list
            node.setAsOpen();;
            node.parent = currentNode;
            openList.add(node);
        }
    }

    private void trackThePath()
    {

        //backtrack and draw best path
        Node current = goalNode;


        while(current != startNode){

            current = current.parent;

            if(current != startNode){
                BestPath.add(current);
                //System.out.println("X:" +  current.row + " Y: "+ current.col);
                current.setAsPath();
            }
        }
    }
}
