package com.example.bloodDonationSchedule.controller;

import com.example.bloodDonationSchedule.dto.DoacaoDTO;
import com.example.bloodDonationSchedule.entity.Doacao;
import com.example.bloodDonationSchedule.service.DoacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doacoes")
public class DoacaoController {

    private final DoacaoService doacaoService;

    public DoacaoController(DoacaoService doacaoService) {
        this.doacaoService = doacaoService;
    }

    @GetMapping
    public ResponseEntity<List<Doacao>> getAllDonations() {
        return ResponseEntity.ok().body(doacaoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doacao> getDonationById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(doacaoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Integer> insertDonation(@RequestBody @Valid DoacaoDTO doacaoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doacaoService.save(doacaoDTO));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Doacao> updateDonation(@PathVariable(value = "id") Integer id,
                                              @RequestBody @Valid DoacaoDTO doacaoDTO) {
        return ResponseEntity.ok().body(doacaoService.update(id, doacaoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Doacao> deleteDonation(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(doacaoService.delete(id));
    }
}
