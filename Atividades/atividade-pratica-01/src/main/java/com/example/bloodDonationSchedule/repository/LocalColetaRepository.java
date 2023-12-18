package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.LocalColeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalColetaRepository extends JpaRepository<LocalColeta, Integer> {
}
