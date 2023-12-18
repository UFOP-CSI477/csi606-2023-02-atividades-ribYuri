package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.LocalColeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalColetaRepository extends JpaRepository<LocalColeta, Integer> {
    List<LocalColeta> findByNome(String nome);
}
