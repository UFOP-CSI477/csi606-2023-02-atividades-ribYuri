package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.TipoSanguineoDTO;
import com.example.bloodDonationSchedule.entity.TipoSanguineo;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.TipoSanguineoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TipoSanguineoService {

    private final TipoSanguineoRepository tipoSanguineoRepository;

    public TipoSanguineoService(TipoSanguineoRepository tipoSanguineoRepository) {
        this.tipoSanguineoRepository = tipoSanguineoRepository;
    }

    public List<TipoSanguineo> getAll() {
        return tipoSanguineoRepository.findAll();
    }

    public TipoSanguineo getById(Integer id) {
        return getAndVerifyBloodType(id);
    }

    public Integer save(TipoSanguineoDTO tipoSanguineoDTO) {
        TipoSanguineo tipoSanguineo = new TipoSanguineo();
        BeanUtils.copyProperties(tipoSanguineoDTO, tipoSanguineo);

        tipoSanguineo.setCreated_at(LocalDateTime.now());
        tipoSanguineo.setUpdated_at(LocalDateTime.now());

        try {
            tipoSanguineo.setId(tipoSanguineoRepository.save(tipoSanguineo).getId());
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return tipoSanguineo.getId();
    }

    public TipoSanguineo update(Integer id, TipoSanguineoDTO tipoSanguineoDTO) {
        TipoSanguineo tipoSanguineo = getAndVerifyBloodType(id);

        TipoSanguineo attTipoSanguineo = new TipoSanguineo();
        BeanUtils.copyProperties(tipoSanguineoDTO, attTipoSanguineo);
        attTipoSanguineo.setId(tipoSanguineo.getId());
        attTipoSanguineo.setCreated_at(tipoSanguineo.getCreated_at());
        attTipoSanguineo.setUpdated_at(LocalDateTime.now());

        return tipoSanguineoRepository.save(attTipoSanguineo);
    }

    public TipoSanguineo delete(Integer id) {
        TipoSanguineo tipoSanguineo = getAndVerifyBloodType(id);
        try {
            tipoSanguineoRepository.delete(tipoSanguineo);
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return tipoSanguineo;
    }

    public TipoSanguineo getAndVerifyBloodType(Integer id) {
        Optional<TipoSanguineo> tipoSanguineo = tipoSanguineoRepository.findById(id);
        if (tipoSanguineo.isEmpty()) throw new ExceptionCustom("Tipo sanguineo não existe!", HttpStatus.NOT_FOUND);

        return tipoSanguineo.get();
    }

}
