package com.example.bloodDonationSchedule.repository;

import com.example.bloodDonationSchedule.entity.TipoSanguineo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoSanguineoRepository extends JpaRepository<TipoSanguineo, Integer> {
}
