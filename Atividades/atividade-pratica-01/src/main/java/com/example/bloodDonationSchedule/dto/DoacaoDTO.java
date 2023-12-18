package com.example.bloodDonationSchedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DoacaoDTO {
    @NotNull
    private Integer pessoa_id;
    @NotNull
    private Integer localColeta_id;
    @NotNull
    private LocalDateTime data;
}
