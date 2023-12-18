package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.EstadoDTO;
import com.example.bloodDonationSchedule.entity.Estado;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.EstadoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {

    private final EstadoRepository estadoRepository;

    public EstadoService(EstadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    public List<Estado> getAll() {
        return estadoRepository.findAll();
    }

    public Estado getById(Integer id) {
        return getAndVerifyState(id);
    }

    public Estado getByName(String nome) {
        Optional<Estado> estado = estadoRepository.findByNome(nome);
        if (estado.isEmpty()) throw new ExceptionCustom("Estado não existe!", HttpStatus.NOT_FOUND);

        return estado.get();
    }

    public Integer save(EstadoDTO estadoDTO) {
        Estado estado = new Estado();
        BeanUtils.copyProperties(estadoDTO, estado);

        estado.setCreated_at(LocalDateTime.now());
        estado.setUpdated_at(LocalDateTime.now());

       try{
           estado.setId(estadoRepository.save(estado).getId());
       } catch (Exception e) {
           throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
       }
        return estado.getId();
    }

    public Estado update(Integer id, EstadoDTO estadoDTO) {
        Estado estadoBanco = getAndVerifyState(id);

        Estado attEstado = new Estado();
        BeanUtils.copyProperties(estadoDTO, attEstado);
        attEstado.setId(estadoBanco.getId());
        attEstado.setCreated_at(estadoBanco.getCreated_at());
        attEstado.setUpdated_at(LocalDateTime.now());

        return estadoRepository.save(attEstado);
    }

    public Estado delete(Integer id) {
        Estado estado = getAndVerifyState(id);
        estadoRepository.delete(estado);
        return estado;
    }

    private Estado getAndVerifyState(Integer id) {
        Optional<Estado> estado = estadoRepository.findById(id);
        if (estado.isEmpty()) throw new ExceptionCustom("Estado não existe!", HttpStatus.NOT_FOUND);

        return estado.get();
    }


}
