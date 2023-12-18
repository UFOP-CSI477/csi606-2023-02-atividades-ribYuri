package com.example.bloodDonationSchedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LocalColetaDTO {
    @NotNull
    private String nome;
    @NotNull
    private String rua;
    @NotNull
    private String numero;
    @NotNull
    private String complemento;
    @NotNull
    private Integer cidade_id;
}
