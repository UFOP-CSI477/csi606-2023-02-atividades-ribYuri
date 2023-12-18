package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    List<Pessoa> findByNome(String nome);
}
