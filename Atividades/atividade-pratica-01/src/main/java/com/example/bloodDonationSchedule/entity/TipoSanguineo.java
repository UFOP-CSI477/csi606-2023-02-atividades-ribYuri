package com.example.bloodDonationSchedule.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tipos_sanguineos")
public class TipoSanguineo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String tipo;
    @Column
    private String fator;
    @Column
    private LocalDateTime created_at;
    @Column
    private LocalDateTime updated_at;
}
