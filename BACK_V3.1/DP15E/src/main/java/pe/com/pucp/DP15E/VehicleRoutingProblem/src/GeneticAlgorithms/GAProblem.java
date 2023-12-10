package pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms;

import pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms.Extra.CurrentVehicle;
import pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms.Extra.PendingOrders;
import pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms.Problem.Node;
import pe.com.pucp.DP15E.VehicleRoutingProblem.src.GeneticAlgorithms.Problem.Vehicle;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class GAProblem implements Cloneable {
    private ArrayList<Vehicle> vehicles;
    private ArrayList<Node> orders;
    private ArrayList<Node> depots;
    private ArrayList<Node> blocks;

    public int populationSize = 10;
    public int maxGenerations = 100000;

    public double crossoverRate = 0.5;
    public double mutationRate = 0.5;
    public double depotRate = 0.4;

    private int numOfOrders = 100;
    private int numOfBlocks = 50;

    public int maxclock = 160;
    // Constructors

    // Load from file
    public GAProblem(Date startDate, Date endDate, ArrayList<CurrentVehicle> currentVehicle,
            ArrayList<PendingOrders> pendingOrders, char mode) throws Exception {
        // read and load the vehicles from file data/mantenimiento/mantpreventivo.txt
        // 20230801:TA01 year month day:T vehicleType vehicleId

        if (startDate == null || endDate == null) {
            throw new NullPointerException("startDate or endDate is null");
        }

        this.depots = new ArrayList<>();
        this.depots.add(new Node(1, 12, 8, Double.MAX_VALUE));
        this.depots.add(new Node(2, 42, 42, Double.MAX_VALUE));
        this.depots.add(new Node(3, 63, 3, Double.MAX_VALUE));

        this.vehicles = new ArrayList<>();
        //try (BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\reida\\Desktop\\CURSOS\\2023-2\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\mantenimiento\\mantpreventivo.txt"))) {
        try (BufferedReader br = new BufferedReader(new FileReader("/home/inf226.981.5e/data/mantenimiento/mantpreventivo.txt"))) {
        //try (BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\FABIAN\\Documents\\CURSOS\\2023-2\\DP1\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\mantenimiento\\mantpreventivo.txt"))) {
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

                Vehicle vehicle;
                Boolean isCurrent = false;
                // if the vehicle is in the currentVehicle, then continue
                if (currentVehicle != null) {
                    for (CurrentVehicle current : currentVehicle) {
                        if (current.id == vehicleId) {
                        //if (current.id == Integer.parseInt(vehicleId)) {
                            vehicle = new Vehicle(Integer.parseInt(vehicleId), vehicleType.charAt(0),
                                    calendar.getTime(),
                                    current.x, current.y);
                            isCurrent = true;
                            this.vehicles.add(vehicle);
                        }
                    }
                }

                if (!isCurrent) {
                    vehicle = new Vehicle(Integer.parseInt(vehicleId), vehicleType.charAt(0), calendar.getTime());
                    this.vehicles.add(vehicle);
                }

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // read and load the blocks from file ./data/bloqueo/202311.bloqueos.txt
        // 29d00h11m-29d20h51m:10,20,10,21,10,22 dayOfMoth d HourOfday h MinuteOfHour m
        // - dayOfMoth d HourOfday h MinuteOfHour m: x, y, x, y, x, y, ...
        this.blocks = new ArrayList<>();
        int id = 0;

        // get each file under ./data/bloqueo/
        // for each file, read and load the blocks

        //Path dir = Paths.get("C:\\Users\\reida\\Desktop\\CURSOS\\2023-2\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\bloqueo");
        Path dir = Paths.get("/home/inf226.981.5e/data/bloqueo");
        //Path dir = Paths.get("C:\\Users\\FABIAN\\Documents\\CURSOS\\2023-2\\DP1\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\bloqueo");
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path file : stream) {
                try (BufferedReader br = new BufferedReader(new FileReader(file.toFile()))) {
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
                        String fileName = file.getFileName().toString();
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

                        for (int i = 0; i < coordinates.length; i += 2) {
                            int x = Integer.parseInt(coordinates[i]);
                            int y = Integer.parseInt(coordinates[i + 1]);
                            Node block = new Node(id++, x, y, calendar_s.getTime(), calendar_e.getTime());
                            this.blocks.add(block);
                        }

                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.orders = new ArrayList<>();

        if (pendingOrders != null) {
            for (PendingOrders order : pendingOrders) {
                int _id = Integer.parseInt(order.id.substring(1));
                Node _order = new Node(_id, order.x, order.y, order.GLP, order.start, order.end);
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

        //dir = Paths.get("C:\\Users\\reida\\Desktop\\CURSOS\\2023-2\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\ventas");
        dir = Paths.get("/home/inf226.981.5e/data/ventas");
        //dir = Paths.get("C:\\Users\\FABIAN\\Documents\\CURSOS\\2023-2\\DP1\\SGAGLP\\BACK_V3.1\\DP15E\\src\\main\\java\\pe\\com\\pucp\\DP15E\\VehicleRoutingProblem\\data\\ventas");
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path file : stream) {
                try (BufferedReader br = new BufferedReader(new FileReader(file.toFile()))) {
                    String line;
                    String fileName = file.getFileName().toString();
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
                        if(Integer.parseInt(quantity) > 20)continue;
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

                        Node order = new Node(id++, x, y, Double.parseDouble(quantity), calendar_s.getTime(),
                                calendar_e.getTime());
                        this.orders.add(order);
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // Test
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

    public boolean validate() throws Exception {

        // if has no vehicles
        if (this.vehicles.size() == 0) {
            throw new Exception("No vehicles");
        }

        // if has no orders
        if (this.orders.size() == 0) {
            throw new Exception("No orders");
        }

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
