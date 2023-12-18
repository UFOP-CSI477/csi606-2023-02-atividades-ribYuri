package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Integer> {
}
