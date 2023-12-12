package GeneticAlgorithms;

import GeneticAlgorithms.Extra.CurrentVehicle;
import GeneticAlgorithms.Extra.PendingOrders;
import GeneticAlgorithms.Problem.Node;
import GeneticAlgorithms.Problem.Vehicle;

import java.awt.Point;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class GAProblem implements Cloneable {
    private ArrayList<Vehicle> vehicles;
    private ArrayList<Node> orders;
    private ArrayList<Node> depots;
    private ArrayList<Node> blocks;

    public int populationSize = 50;
    public int maxGenerations = 100000;

    public double crossoverRate = 0.7;
    public double mutationRate = 0.8;
    public double depotRate = 0.8;
    public double acceptRate = 0.6;

    private int numOfOrders = 100;
    private int numOfBlocks = 50;

    public int maxclock = 40;

    private String baseURL = "https://raw.githubusercontent.com/Xuan-Yiming/SGAGLP/main/Data_2/";
    // Constructors

    // Load from file
    public GAProblem(Date startDate, Date endDate, ArrayList<CurrentVehicle> currentVehicle,
            ArrayList<PendingOrders> pendingOrders, char mode) throws Exception {


        if (startDate == null || endDate == null) {
            throw new NullPointerException("startDate or endDate is null");
        }


        // create depots
        this.depots = new ArrayList<>();
        this.depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        this.depots.add(new Node(2, 42, 42, Double.MAX_VALUE));
        this.depots.add(new Node(3, 63, 3, Double.MAX_VALUE));


        // blocks
        // read and load the blocks from file ./data/bloqueo/202311.bloqueos.txt
        // 29d00h11m-29d20h51m:10,20,10,21,10,22 dayOfMoth d HourOfday h MinuteOfHour m
        // - dayOfMoth d HourOfday h MinuteOfHour m: x, y, x, y, x, y, ...
        this.blocks = new ArrayList<>();
        int id = 0;

        // get each file under ./data/bloqueo/
        // for each file, read and load the blocks
        String fileName;

        Calendar _calendar = Calendar.getInstance();
        _calendar.setTime(startDate);
        int _year = _calendar.get(Calendar.YEAR);
        int _month = _calendar.get(Calendar.MONTH) + 1;
        //month have format 08
        if(_month < 10){
            fileName = _year + "0" + _month + ".bloqueos.txt";
        }else{
        fileName = _year + "" + _month + ".bloqueos.txt";
        }
        try {
            URL url = new URL(this.baseURL + "bloqueo/" + fileName);
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(":");
                String timePart = parts[0];
                String[] coordinates = parts[1].split(",");

                String[] times = timePart.split("-");
                String startTime = times[0];
                String endTime = times[1];

                String startDay = startTime.substring(0, startTime.indexOf('d'));
                String startHour = startTime.substring(startTime.indexOf('d') + 1, startTime.indexOf('h'));
                String startMinute = startTime.substring(startTime.indexOf('h') + 1, startTime.indexOf('m'));

                String endDay = endTime.substring(0, endTime.indexOf('d'));
                String endHour = endTime.substring(endTime.indexOf('d') + 1, endTime.indexOf('h'));
                String endMinute = endTime.substring(endTime.indexOf('h') + 1, endTime.indexOf('m'));

                // get the name of the file
                String year = fileName.substring(0, 4);
                String month = fileName.substring(4, 6);

                Calendar calendar_s = Calendar.getInstance();
                calendar_s.set(Calendar.YEAR, Integer.parseInt(year));
                calendar_s.set(Calendar.MONTH, Integer.parseInt(month) - 1);
                calendar_s.set(Calendar.DAY_OF_MONTH, Integer.parseInt(startDay));
                calendar_s.set(Calendar.HOUR_OF_DAY, Integer.parseInt(startHour));
                calendar_s.set(Calendar.MINUTE, Integer.parseInt(startMinute));
                calendar_s.set(Calendar.SECOND, 0);

                Calendar calendar_e = Calendar.getInstance();
                calendar_e.set(Calendar.YEAR, Integer.parseInt(year));
                calendar_e.set(Calendar.MONTH, Integer.parseInt(month) - 1);
                calendar_e.set(Calendar.DAY_OF_MONTH, Integer.parseInt(endDay));
                calendar_e.set(Calendar.HOUR_OF_DAY, Integer.parseInt(endHour));
                calendar_e.set(Calendar.MINUTE, Integer.parseInt(endMinute));
                calendar_e.set(Calendar.SECOND, 0);

                // if startDate id between the calendar_s and calendar_e date, then continue
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                if (!(calendar.after(calendar_s) && calendar.before(calendar_e))) {
                    continue;
                }

                ArrayList<Point> blockPoints = new ArrayList<>();

                for (int i = 0; i < coordinates.length; i += 2) {
                    int x = Integer.parseInt(coordinates[i]);
                    int y = Integer.parseInt(coordinates[i + 1]);
                    blockPoints.add(new Point(x, y));
                }

                // get the line between 2 points
                for (int i = 0; i < blockPoints.size() - 1; i++) {
                    int x1 = blockPoints.get(i).x;
                    int y1 = blockPoints.get(i).y;
                    int x2 = blockPoints.get(i + 1).x;
                    int y2 = blockPoints.get(i + 1).y;

                    // if the line is vertical
                    if (x1 == x2) {
                        int y = Math.min(y1, y2);
                        for (int j = 0; j < Math.abs(y1 - y2); j++) {
                            this.blocks.add(new Node(id++, x1, y + j, calendar_s.getTime(), calendar_e.getTime()));
                        }
                    } else {
                        int x = Math.min(x1, x2);
                        for (int j = 0; j < Math.abs(x1 - x2); j++) {
                            this.blocks.add(new Node(id++, x + j, y1, calendar_s.getTime(), calendar_e.getTime()));
                        }
                    }
                }

            }
        } catch (IOException e) {
            e.printStackTrace();
        }


        // orders
        this.orders = new ArrayList<>();

        if (pendingOrders != null) {
            for (PendingOrders order : pendingOrders) {
                int _id = Integer.parseInt(order.id.substring(1));
                Node _order = new Node(_id, order.x, order.y, order.glp, order.start, order.end);
                this.orders.add(_order);
            }
        }

        if (mode == 'S') {
            return;
        }

        if (this.orders.size() == 0) {
            id = 0;
        } else {
            id = Integer.parseInt(this.orders.get(this.orders.size() - 1).getId().substring(1)) + 1;
        }

        // read and load the orders from file ./data/ventas/ventas202311.txt
        // 29d12h01m:20,16,c-42,1m3,14h dayOfMoth d HourOfday h MinuteOfHour m : x, y,
        // customer, Q m3, deadline h

        if (_month < 10) {
            fileName = "ventas" + _year + "0" + _month + ".txt";
        } else {
            fileName = "ventas" + _year + "" + _month + ".txt";
        }

        try {
            URL url = new URL(this.baseURL + "ventas/" + fileName);
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
            String line;
            String year = fileName.substring(6, 10);
            String month = fileName.substring(10, 12);

            while ((line = br.readLine()) != null) {
                String[] parts = line.split(":");
                String timePart = parts[0];
                String[] orderDetails = parts[1].split(",");

                String day = timePart.substring(0, timePart.indexOf('d'));
                String hour = timePart.substring(timePart.indexOf('d') + 1, timePart.indexOf('h'));
                String minute = timePart.substring(timePart.indexOf('h') + 1, timePart.indexOf('m'));

                int x = Integer.parseInt(orderDetails[0]);
                int y = Integer.parseInt(orderDetails[1]);

                if (x < 0 || x >= 70 || y < 0 || y >= 50) {
                    continue;
                }

                String customer = orderDetails[2];
                String quantity = orderDetails[3].substring(0, orderDetails[3].indexOf('m'));
                String deadline = orderDetails[4].substring(0, orderDetails[4].indexOf('h'));

                Calendar calendar_s = Calendar.getInstance();
                calendar_s.set(Calendar.YEAR, Integer.parseInt(year));
                calendar_s.set(Calendar.MONTH, Integer.parseInt(month) - 1);
                calendar_s.set(Calendar.DAY_OF_MONTH, Integer.parseInt(day));
                calendar_s.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hour));
                calendar_s.set(Calendar.MINUTE, Integer.parseInt(minute));
                calendar_s.set(Calendar.SECOND, 0);

                // if startDate id between the calendar_s and calendar_e date, then continue
                Calendar calendar_sd = Calendar.getInstance();
                calendar_sd.setTime(startDate);

                Calendar calendar_ed = Calendar.getInstance();
                calendar_ed.setTime(endDate);

                if (!(calendar_s.after(calendar_sd) && calendar_s.before(calendar_ed))) {
                    continue;
                }

                Calendar calendar_e = Calendar.getInstance();
                calendar_e.set(Calendar.YEAR, Integer.parseInt(year));
                calendar_e.set(Calendar.MONTH, Integer.parseInt(month) - 1);
                calendar_e.set(Calendar.DAY_OF_MONTH, Integer.parseInt(day));
                calendar_e.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hour) + Integer.parseInt(deadline));
                calendar_e.set(Calendar.MINUTE, Integer.parseInt(minute));
                calendar_e.set(Calendar.SECOND, 0);

                double _quantity = Double.parseDouble(quantity);

                for (double i = 0; i < _quantity / 25; i++) {

                    double _q = 25;
                    if (_quantity - i * 25 < 25) {
                        _q = _quantity - i * 25;
                    }
                    Node order = new Node(id++, x, y, _q, calendar_s.getTime(),
                            calendar_e.getTime());
                    this.orders.add(order);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        //check if the orders have the same posicion as the block, if yes, remove the order
        for (int i = 0; i < this.orders.size(); i++) {
            Node order = this.orders.get(i);
            for (Node block : this.blocks) {
                if (order.getPosicion().getX() == block.getPosicion().getX()
                        && order.getPosicion().getY() == block.getPosicion().getY()) {
                    this.orders.remove(order);
                    i--;
                    break;
                }
            }
        }


        // vehicles
        // read and load the vehicles from file data/mantenimiento/mantpreventivo.txt
        // 20230801:TA01 year month day:T vehicleType vehicleId
        this.vehicles = new ArrayList<>();
        try {
            URL url = new URL(this.baseURL + "mantenimiento/mantpreventivo.txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));

            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(":");
                String datePart = parts[0];
                String vehiclePart = parts[1];

                String year = datePart.substring(0, 4);
                String month = datePart.substring(4, 6);
                String day = datePart.substring(6, 8);

                // if the startDate has the same year and month and day as vehicle's date, then
                // cotinue
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(startDate);
                if (calendar.get(Calendar.YEAR) == Integer.parseInt(year)
                        && calendar.get(Calendar.MONTH) == Integer.parseInt(month) - 1
                        && calendar.get(Calendar.DAY_OF_MONTH) == Integer.parseInt(day)) {
                    continue;
                }

                String vehicleType = vehiclePart.substring(1, 2);
                String vehicleId = vehiclePart.substring(2);

                // Assuming Vehicle constructor takes (year, month, day, type, id)
                calendar = Calendar.getInstance();
                calendar.set(Calendar.YEAR, Integer.parseInt(year));
                calendar.set(Calendar.MONTH, Integer.parseInt(month) - 1);
                calendar.set(Calendar.DAY_OF_MONTH, Integer.parseInt(day));
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);

                // find the order with the same id
                Vehicle vehicle;
                Boolean isCurrent = false;
                // if the vehicle is in the currentVehicle, then continue
                if (currentVehicle != null) {
                    for (CurrentVehicle current : currentVehicle) {
                        String _id = "T" + vehicleType + Integer.parseInt(vehicleId);
                        if (current.id.equals(_id)) {
                            vehicle = new Vehicle(Integer.parseInt(vehicleId), vehicleType.charAt(0),
                                    calendar.getTime(),
                                    current.x, current.y);
                            isCurrent = true;

                            // keep the current order
                            if (current.pedido.contains("D")) {
                                //get the depot with the same ID
                                for (Node depot : this.depots) {
                                    if (depot.getId().equals(depot.getId()) ) {
                                        if(depot.getPosicion().getX() != current.x && depot.getPosicion().getY() != current.y){
                                            vehicle.addNode(depot);
                                            break;
                                        }
                                    }
                                }
                            }else{
                                //get the order with the same ID
                                for (Node order : this.orders) {
                                    if (order.getId().equals(current.pedido) ) {
                                        if (order.getPosicion().getX() != current.x
                                                || order.getPosicion().getY() != current.y) {
                                            
                                            vehicle.addNode(order);
                                            // remove the order from the orders
                                            // this.orders.remove(order);
                                            break;
                                        }
                                    }
                                }
                            }


                            this.vehicles.add(vehicle);
                        }
                    }
                }

                if (!isCurrent) {
                    vehicle = new Vehicle(Integer.parseInt(vehicleId), vehicleType.charAt(0), calendar.getTime());
                    this.vehicles.add(vehicle);
                }

            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Test
    // Generate a random problem
    public GAProblem(char test) {
        // create random problem
        Random random = new Random();

        // create depots
        this.depots = new ArrayList<>();
        this.depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        this.depots.add(new Node(2, 42, 42, Double.MAX_VALUE));
        this.depots.add(new Node(3, 63, 3, Double.MAX_VALUE));

        // create orders
        this.orders = new ArrayList<>();
        Date date = new Date();
        // set the date to 00:00:00
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        date = calendar.getTime();

        for (int i = 0; i < numOfOrders; i++) {
            calendar.setTime(date);

            calendar.add(Calendar.HOUR_OF_DAY, random.nextInt(23) + 1);
            Date finalDate = calendar.getTime();
            this.orders.add(new Node((i), random.nextInt(70), random.nextInt(50),
                    (double) (random.nextInt(20)), date, finalDate));
        }

        // create blocks
        this.blocks = new ArrayList<>();

        for (int i = 0; i < numOfBlocks; i++) {
            int x = random.nextInt(70);
            int y = random.nextInt(50);
            // if the point is inside a depot, or a order point, then generate another point
            while (x == 12 && y == 8 || x == 42 && y == 42 || x == 63 && y == 3) {
                for (int j = 0; j < numOfOrders; j++) {
                    if (x == this.orders.get(j).getPosicion().getX() && y == this.orders.get(j).getPosicion().getY()) {
                        x = random.nextInt(70);
                        y = random.nextInt(50);
                        j = 0;
                    } else {
                        break;
                    }
                }
            }
            this.blocks.add(new Node(i, x, y, date, date));
        }

        // create vehicles
        this.vehicles = new ArrayList<>();

        date = new Date();
        // A - 2
        this.vehicles.add(new Vehicle(1, 'A', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(2, 'A', date));

        // B - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(3, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(4, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(5, 'B', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(6, 'B', date));

        // C - 4
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(7, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(8, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(9, 'C', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(10, 'C', date));

        // D - 10
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(11, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(12, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(13, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(14, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(15, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(16, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(17, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(18, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(19, 'D', date));

        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        date = calendar.getTime();
        this.vehicles.add(new Vehicle(20, 'D', date));

    }

    // Methods

    // Validate the problem
    public boolean validate() throws Exception {

        // if has no vehicles
        if (this.vehicles.size() == 0) {
            throw new Exception("No vehicles");
        }

        // // if has no orders
        // if (this.orders.size() == 0) {
        // throw new Exception("No orders");
        // }

        // if has no depots
        if (this.depots.size() == 0) {
            throw new Exception("No depots");
        }

        // if has no date

        // get the max capacity of the vehicles
        double maxCapacity = 0;
        for (Vehicle vehicle : this.vehicles) {
            if (vehicle.getCargaGLP() > maxCapacity) {
                maxCapacity = vehicle.getCargaGLP();
            }
        }

        // if any of the node out of the bounds, or the date is not valid
        // add one day to the date

        for (Node order : this.orders) {

            if (order.getPosicion().getX() < 0 || order.getPosicion().getX() >= 70 || order.getPosicion().getY() < 0
                    || order.getPosicion().getY() >= 50) {
                throw new Exception("Order: " + order.getId() + " - coordinate out of bounds - ("
                        + order.getPosicion().getX() + " , " + order.getPosicion().getY() + ") - ("
                        + order.getPosicion().getY() + " , " + order.getPosicion().getY() + " )");
            }

            if (order.getCantidad() > maxCapacity) {
                throw new Exception("Order: " + order.getId() + " - quantity out of bounds - " + order.getCantidad()
                        + " - " + maxCapacity);
            }
        }

        for (Node block : this.blocks) {
            if (block.getPosicion().getX() < 0 || block.getPosicion().getX() >= 70 || block.getPosicion().getY() < 0
                    || block.getPosicion().getY() >= 50) {
                throw new Exception("Block: " + block.getId() + " - coordinate out of bounds - ("
                        + block.getPosicion().getX() + " , " + block.getPosicion().getY() + ") - ("
                        + block.getPosicion().getY() + " , " + block.getPosicion().getY() + " )");

            }

        }

        for (Node depot : this.depots) {
            if (depot.getPosicion().getX() < 0 || depot.getPosicion().getX() >= 70 || depot.getPosicion().getY() < 0
                    || depot.getPosicion().getY() >= 50) {
                throw new Exception("Depot: " + depot.getId() + " - coordinate out of bounds - ("
                        + depot.getPosicion().getX() + " , " + depot.getPosicion().getY() + ") - ("
                        + depot.getPosicion().getY() + " , " + depot.getPosicion().getY() + " )");
            }
        }

        // if any of the block any customer has overlay
        for (Node block : this.blocks) {
            for (Node order : this.orders) {
                if (block.getPosicion().getX() == order.getPosicion().getX()
                        && block.getPosicion().getY() == order.getPosicion().getY()) {
                    throw new Exception("Block and order overlay : " + block.getId() + " - " + order.getId());
                }
            }
        }

        return true;
    }

    @Override
    public GAProblem clone() {
        try {
            return (GAProblem) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // This should not happen.
        }
    }
    // Getters and Setters

    public ArrayList<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(ArrayList<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public ArrayList<Node> getOrders() {
        return orders;
    }

    public void setOrders(ArrayList<Node> orders) {
        this.orders = orders;
    }

    public ArrayList<Node> getDepots() {
        return depots;
    }

    public void setDepots(ArrayList<Node> depots) {
        this.depots = depots;
    }

    public ArrayList<Node> getBlocks() {
        return blocks;
    }

    public void setBlocks(ArrayList<Node> blocks) {
        this.blocks = blocks;
    }
}
