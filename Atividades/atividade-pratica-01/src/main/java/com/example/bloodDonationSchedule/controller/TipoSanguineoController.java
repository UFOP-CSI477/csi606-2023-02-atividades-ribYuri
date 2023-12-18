package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.TipoSanguineoDTO;
import com.example.bloodDonationSchedule.entity.TipoSanguineo;
import com.example.bloodDonationSchedule.service.TipoSanguineoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sangue/tipos")
public class TipoSanguineoController {

    private final TipoSanguineoService tipoSanguineoService;

    public TipoSanguineoController(TipoSanguineoService tipoSanguineoService) {
        this.tipoSanguineoService = tipoSanguineoService;
    }

    @GetMapping
    public ResponseEntity<List<TipoSanguineo>> getAllCitys() {
        return ResponseEntity.ok().body(tipoSanguineoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoSanguineo> getCityById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(tipoSanguineoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Integer> insertCity(@RequestBody @Valid TipoSanguineoDTO tipoSanguineoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tipoSanguineoService.save(tipoSanguineoDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<TipoSanguineo> updateCity(@PathVariable(value = "id") Integer id,
                                             @RequestBody @Valid TipoSanguineoDTO tipoSanguineoDTO) {
        return ResponseEntity.ok().body(tipoSanguineoService.update(id, tipoSanguineoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TipoSanguineo> deleteCity(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(tipoSanguineoService.delete(id));
    }
}
