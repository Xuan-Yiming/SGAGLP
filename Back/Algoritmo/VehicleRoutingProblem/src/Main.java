
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import com.google.gson.Gson;

import GeneticAlgorithms.GeneticAlgorithmVRP;
import GeneticAlgorithms.Extra.CurrentVehicle;
import GeneticAlgorithms.Extra.InputData;
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
            calendar_s.set(Calendar.HOUR_OF_DAY, 2);
            calendar_s.set(Calendar.MINUTE, 37);

            Calendar calendar_e = Calendar.getInstance();
            calendar_e.set(Calendar.YEAR, 2023);
            calendar_e.set(Calendar.MONTH, 10);
            calendar_e.set(Calendar.DAY_OF_MONTH, 29);
            calendar_e.set(Calendar.HOUR_OF_DAY, 3);
            calendar_e.set(Calendar.MINUTE, 25);


            ArrayList<CurrentVehicle> currentVehicles = new ArrayList<CurrentVehicle>();
            ArrayList<PendingOrders> pendingOrders = new ArrayList<PendingOrders>();

            // create a current vehicle
            CurrentVehicle currentVehicle = new CurrentVehicle();
            currentVehicle.id = "TA1";
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
            pendingOrder.glp = 5;
            pendingOrders.add(pendingOrder);

            // create input data
            InputData inputData = new InputData();
            inputData.vehiculos = currentVehicles;
            inputData.pedidos = pendingOrders;

            // Create a Gson object
            Gson gson = new Gson();

            String data = gson.toJson(inputData);

            data = "{\"vehiculos\":[{\"id\":\"TA1\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TA2\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TB3\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TB4\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TB5\",\"x\":42,\"y\":42,\"pedido\":\"\"},{\"id\":\"TB6\",\"x\":51,\"y\":8,\"pedido\":\"C2\"},{\"id\":\"TC7\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TC8\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TC9\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TC10\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD11\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD12\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD13\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD14\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD15\",\"x\":1,\"y\":45,\"pedido\":\"\"},{\"id\":\"TD16\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD17\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD18\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD19\",\"x\":12,\"y\":8,\"pedido\":\"\"},{\"id\":\"TD20\",\"x\":51,\"y\":8,\"pedido\":\"C3\"}],\"pedidos\":[{\"id\":\"C2\",\"x\":59,\"y\":12,\"start\":\"2023-11-29T06:49:12.000Z\",\"end\":\"2023-06-29T16:06:00.000Z\",\"glp\":6},{\"id\":\"C3\",\"x\":61,\"y\":22,\"start\":\"2023-11-29T06:49:12.000Z\",\"end\":\"2023-08-29T07:08:00.000Z\",\"glp\":3},{\"id\":\"C4\",\"x\":21,\"y\":25,\"start\":\"2023-11-29T06:49:12.000Z\",\"end\":\"2023-10-29T13:10:00.000Z\",\"glp\":14}]}";
            
            algorithmVRP = new GeneticAlgorithmVRP(calendar_s.getTime(), calendar_e.getTime(),data,'P',40);

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
