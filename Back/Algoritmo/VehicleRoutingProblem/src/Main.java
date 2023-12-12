
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
            calendar_s.set(Calendar.MONTH, 11);
            calendar_s.set(Calendar.DAY_OF_MONTH, 12);
            calendar_s.set(Calendar.HOUR_OF_DAY, 12);
            calendar_s.set(Calendar.MINUTE, 14);

            Calendar calendar_e = Calendar.getInstance();
            calendar_e.set(Calendar.YEAR, 2023);
            calendar_e.set(Calendar.MONTH, 11);
            calendar_e.set(Calendar.DAY_OF_MONTH, 12);
            calendar_e.set(Calendar.HOUR_OF_DAY, 12);
            calendar_e.set(Calendar.MINUTE, 20);


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

            data = "{\"vehiculos\":[{\"id\":\"TA1\",\"x\":16,\"y\":8,\"pedido\":\"C999\"},{\"id\":\"TA2\",\"x\":16,\"y\":8,\"pedido\":\"C998\"},{\"id\":\"TB3\",\"x\":16,\"y\":8,\"pedido\":\"C997\"},{\"id\":\"TB4\",\"x\":16,\"y\":8,\"pedido\":\"C996\"},{\"id\":\"TB5\",\"x\":16,\"y\":8,\"pedido\":\"C995\"},{\"id\":\"TB6\",\"x\":16,\"y\":8,\"pedido\":\"C994\"},{\"id\":\"TC7\",\"x\":16,\"y\":8,\"pedido\":\"C993\"},{\"id\":\"TC8\",\"x\":16,\"y\":8,\"pedido\":\"C992\"},{\"id\":\"TC9\",\"x\":16,\"y\":8,\"pedido\":\"C991\"},{\"id\":\"TC10\",\"x\":16,\"y\":8,\"pedido\":\"C990\"},{\"id\":\"TD11\",\"x\":16,\"y\":8,\"pedido\":\"C989\"},{\"id\":\"TD12\",\"x\":16,\"y\":8,\"pedido\":\"C988\"},{\"id\":\"TD13\",\"x\":16,\"y\":8,\"pedido\":\"C987\"},{\"id\":\"TD14\",\"x\":16,\"y\":8,\"pedido\":\"C986\"},{\"id\":\"TD15\",\"x\":16,\"y\":8,\"pedido\":\"C985\"},{\"id\":\"TD16\",\"x\":16,\"y\":8,\"pedido\":\"C984\"},{\"id\":\"TD17\",\"x\":16,\"y\":8,\"pedido\":\"C983\"},{\"id\":\"TD18\",\"x\":16,\"y\":8,\"pedido\":\"C982\"},{\"id\":\"TD19\",\"x\":16,\"y\":8,\"pedido\":\"C981\"},{\"id\":\"TD20\",\"x\":16,\"y\":8,\"pedido\":\"C980\"}],\"pedidos\":[{\"id\":\"C999\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":25},{\"id\":\"C998\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":25},{\"id\":\"C997\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":15},{\"id\":\"C996\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":15},{\"id\":\"C995\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":15},{\"id\":\"C994\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":15},{\"id\":\"C993\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":10},{\"id\":\"C992\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":10},{\"id\":\"C991\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":10},{\"id\":\"C990\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":10},{\"id\":\"C989\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C988\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C987\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C986\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C985\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C984\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C983\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C982\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C981\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5},{\"id\":\"C980\",\"x\":69,\"y\":49,\"start\":\"2023-12-12T17:08:09.502Z\",\"end\":\"2023-12-01T14:25:00.000Z\",\"glp\":5}]}";
            
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
