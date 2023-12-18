package com.example.bloodDonationSchedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CidadeDTO {
    @NotNull
    private String nome;
    @NotNull
    private Integer estado_id;
}
