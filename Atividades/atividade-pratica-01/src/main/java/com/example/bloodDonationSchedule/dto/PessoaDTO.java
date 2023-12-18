package com.example.bloodDonationSchedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PessoaDTO {
    @NotNull
    private String nome;
    @NotNull
    private String rua;
    @NotNull
    private String numero;
    @NotNull
    private String complemento;
    @NotNull
    private String rg;
    @NotNull
    private Integer cidade_id;
    @NotNull
    private Integer tipoSanguineo_id;

}
