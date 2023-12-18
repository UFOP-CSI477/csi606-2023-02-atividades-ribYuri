package com.example.bloodDonationSchedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TipoSanguineoDTO {
    @NotNull
    private String tipo;
    @NotNull
    private String fator;
}
