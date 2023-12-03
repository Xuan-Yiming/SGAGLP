package pe.com.pucp.DP15E.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="Usuario")
@Table(name="usuario")

public class Usuario implements Cloneable {
    private static final Integer serialVersionUID= 1;
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="fecha_creacion")
    @JsonIgnore
    private Date fechaCreacion;

    @Column(name="activo")
    @JsonIgnore
    private boolean activo;

    // Constructor para proyección
    public Usuario(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
