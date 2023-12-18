package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.LocalColetaDTO;
import com.example.bloodDonationSchedule.entity.LocalColeta;
import com.example.bloodDonationSchedule.service.LocalColetaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coleta/local")
public class LocalColetaController {

    private final LocalColetaService localColetaService;

    public LocalColetaController(LocalColetaService localColetaService) {
        this.localColetaService = localColetaService;
    }

    @GetMapping
    public ResponseEntity<List<LocalColeta>> getAllCollectLocal() {
        return ResponseEntity.ok().body(localColetaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocalColeta> getCollectLocalById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(localColetaService.getById(id));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<LocalColeta>> getCollectLocalByName(@PathVariable(value = "nome") String nome) {
        return ResponseEntity.ok().body(localColetaService.getByName(nome));
    }

    @PostMapping
    public ResponseEntity<Integer> insertCollectLocal(@RequestBody @Valid LocalColetaDTO localColetaDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(localColetaService.save(localColetaDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<LocalColeta> updateCollectLocal(@PathVariable(value = "id") Integer id,
                                             @RequestBody @Valid LocalColetaDTO localColetaDTO) {
        return ResponseEntity.ok().body(localColetaService.update(id, localColetaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LocalColeta> deleteCollectLocal(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(localColetaService.delete(id));
    }
}
