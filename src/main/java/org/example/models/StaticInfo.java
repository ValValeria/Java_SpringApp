package org.example.models;

import javax.enterprise.inject.Default;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="java_static",schema="1oASotOvGd")
public class StaticInfo{
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="day",length=30)
    @NotNull
    private String date;

    @Column(name="visits",length=30)
    @NotNull
    private int visits;

    @Column(name="ips")
    private String ips;

    public String getIps() {
        return ips;
    }

    public void setIps(String ips) {
        this.ips = ips;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getVisits() {
        return visits;
    }

    public void setVisits(int visits) {
        this.visits = visits;
    }
}
