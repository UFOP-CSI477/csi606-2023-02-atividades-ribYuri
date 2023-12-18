package com.example.bloodDonationSchedule.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "doacoes")
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "local_id")
    private LocalColeta localColeta;
    @Column
    private LocalDateTime data;
    @Column
    private LocalDateTime created_at;
    @Column
    private LocalDateTime updated_at;
}
