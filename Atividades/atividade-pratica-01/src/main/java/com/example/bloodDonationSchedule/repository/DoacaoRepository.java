package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.Doacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoacaoRepository extends JpaRepository<Doacao, Integer> {
}
