
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.omg.CORBA.Current;

import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.Extra.CurrentVehicle;
import GeneticAlgorithms.Extra.PendingOrders;
import GeneticAlgorithms.Problem.Solucion;

public class Main {

    public static void main(String[] args) {

        try {
            // calculate the execution time
            long startTime = System.currentTimeMillis();

            GeneticAlgorithmVRP algorithmVRP;

            //create a start date
            Calendar calendar_s = Calendar.getInstance();
            calendar_s.set(Calendar.YEAR, 2023);
            calendar_s.set(Calendar.MONTH, 10);
            calendar_s.set(Calendar.DAY_OF_MONTH, 29);
            calendar_s.set(Calendar.HOUR_OF_DAY, 1);
            calendar_s.set(Calendar.MINUTE, 0);

            Calendar calendar_e = Calendar.getInstance();
            calendar_e.set(Calendar.YEAR, 2023);
            calendar_e.set(Calendar.MONTH, 10);
            calendar_e.set(Calendar.DAY_OF_MONTH, 29);
            calendar_e.set(Calendar.HOUR_OF_DAY, 5);
            calendar_e.set(Calendar.MINUTE, 0);


            ArrayList<CurrentVehicle> currentVehicles = new ArrayList<CurrentVehicle>();
            ArrayList<PendingOrders> pendingOrders = new ArrayList<PendingOrders>();

            // create a current vehicle
            CurrentVehicle currentVehicle = new CurrentVehicle();
            currentVehicle.id = 1;
            currentVehicle.x = 9;
            currentVehicle.y = 9;
            currentVehicles.add(currentVehicle);

            // create a pending order
            PendingOrders pendingOrder = new PendingOrders();
            pendingOrder.id = "C10";
            pendingOrder.x = 10;
            pendingOrder.y = 10;
            pendingOrder.start = calendar_s.getTime();
            pendingOrder.end = calendar_e.getTime();
            pendingOrder.GLP = 5;
            pendingOrders.add(pendingOrder);



            algorithmVRP = new GeneticAlgorithmVRP(calendar_s.getTime(), calendar_e.getTime(),"",'P');

            Solucion solucion = algorithmVRP.getSolucion();

            try {
                // get the default desktop path
                String desktopPath = System.getProperty("user.home") + "/Desktop";
                FileWriter fileWriter = new FileWriter(desktopPath + "/solucion.json");
                fileWriter.write(solucion.solucionToJson());
                fileWriter.close();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }

            // calculate the execution time
            long endTime = System.currentTimeMillis();
            long timeElapsed = endTime - startTime;
            System.out.println("Execution time in secounds: " + timeElapsed / 1000.0);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
