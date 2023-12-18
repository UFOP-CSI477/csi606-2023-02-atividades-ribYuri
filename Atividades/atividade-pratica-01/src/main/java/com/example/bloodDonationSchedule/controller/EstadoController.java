package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.EstadoDTO;
import com.example.bloodDonationSchedule.entity.Estado;
import com.example.bloodDonationSchedule.service.EstadoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estados")
public class EstadoController {

    private final EstadoService estadoService;

    public EstadoController(EstadoService estadoService) {
        this.estadoService = estadoService;
    }

    @GetMapping
    public ResponseEntity<List<Estado>> getAllStates() {
        return ResponseEntity.ok().body(estadoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estado> getStateById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(estadoService.getById(id));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Estado> getStateByName(@PathVariable(value = "nome") String nome) {
        return ResponseEntity.ok().body(estadoService.getByName(nome));
    }

    @PostMapping
    public ResponseEntity<Integer> insertState(@RequestBody @Valid EstadoDTO estadoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(estadoService.save(estadoDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Estado> updateState(@PathVariable(value = "id") Integer id,
                                              @RequestBody @Valid EstadoDTO estadoDTO) {
        return ResponseEntity.ok().body(estadoService.update(id, estadoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Estado> deleteState(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(estadoService.delete(id));
    }
}
