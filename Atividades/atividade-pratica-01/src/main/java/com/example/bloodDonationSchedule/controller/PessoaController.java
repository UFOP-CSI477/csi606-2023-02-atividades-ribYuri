package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.PessoaDTO;
import com.example.bloodDonationSchedule.entity.Pessoa;
import com.example.bloodDonationSchedule.service.PessoaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {
    private final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> getAllPeople() {
        return ResponseEntity.ok().body(pessoaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> getPeopleById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(pessoaService.getById(id));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Pessoa>> getPeopleByName(@PathVariable(value = "nome") String nome) {
        return ResponseEntity.ok().body(pessoaService.getByName(nome));
    }

    @PostMapping
    public ResponseEntity<Integer> insertPeople(@RequestBody @Valid PessoaDTO pessoaDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaService.save(pessoaDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Pessoa> updatePeople(@PathVariable(value = "id") Integer id,
                                              @RequestBody @Valid PessoaDTO pessoaDTO) {
        return ResponseEntity.ok().body(pessoaService.update(id, pessoaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pessoa> deletePeople(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(pessoaService.delete(id));
    }

}
