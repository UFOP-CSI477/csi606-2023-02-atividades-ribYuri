package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.CidadeDTO;
import com.example.bloodDonationSchedule.entity.Cidade;
import com.example.bloodDonationSchedule.service.CidadeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cidades")
public class CidadeController {

    private final CidadeService cidadeService;

    public CidadeController(CidadeService cidadeService) {
        this.cidadeService = cidadeService;
    }

    @GetMapping
    public ResponseEntity<List<Cidade>> getAllCitys() {
        return ResponseEntity.ok().body(cidadeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cidade> getCityById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(cidadeService.getById(id));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Cidade>> getCityByName(@PathVariable(value = "nome") String nome) {
        return ResponseEntity.ok().body(cidadeService.getByName(nome));
    }

    @PostMapping
    public ResponseEntity<Integer> insertCity(@RequestBody @Valid CidadeDTO cidadeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cidadeService.save(cidadeDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Cidade> updateCity(@PathVariable(value = "id") Integer id,
                                              @RequestBody @Valid CidadeDTO cidadeDTO) {
        return ResponseEntity.ok().body(cidadeService.update(id, cidadeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cidade> deleteCity(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(cidadeService.delete(id));
    }
}
