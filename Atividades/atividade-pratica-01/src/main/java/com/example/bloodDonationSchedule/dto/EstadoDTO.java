package com.example.bloodDonationSchedule.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EstadoDTO {
    @NotNull
    private String nome;
    @NotNull
    private String sigla;
}
