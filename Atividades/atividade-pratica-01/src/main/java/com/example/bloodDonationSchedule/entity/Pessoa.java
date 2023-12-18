package com.example.bloodDonationSchedule.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pessoas")
public class Pessoa {
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
    @Column
    private String rg;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_id")
    private TipoSanguineo tipoSanguineo;
    @Column
    private LocalDateTime created_at;
    @Column
    private LocalDateTime updated_at;
}
