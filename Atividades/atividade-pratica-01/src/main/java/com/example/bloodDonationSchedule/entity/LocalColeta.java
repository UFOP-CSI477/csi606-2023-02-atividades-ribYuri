package com.example.bloodDonationSchedule.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "locais_coleta")
public class LocalColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String nome;
    @Column
    private String rua;
    @Column
    private String numero;
    @Column
    private String complemento;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
    @Column
    private LocalDateTime created_at;
    @Column
    private LocalDateTime updated_at;
}
