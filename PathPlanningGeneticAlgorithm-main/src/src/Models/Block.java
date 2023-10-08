package Models;

import java.util.Date;

public class Block extends Node{
    private Date startTime;
    private Date endTime;

    public Block(int x, int y, Date startTime, Date endTime) {
        super(x, y);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
