package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.LocalColetaDTO;
import com.example.bloodDonationSchedule.entity.Cidade;
import com.example.bloodDonationSchedule.entity.LocalColeta;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.LocalColetaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LocalColetaService {

    private final LocalColetaRepository localColetaRepository;
    private final CidadeService cidadeService;

    public LocalColetaService(LocalColetaRepository localColetaRepository, CidadeService cidadeService) {
        this.localColetaRepository = localColetaRepository;
        this.cidadeService = cidadeService;
    }

    public List<LocalColeta> getAll() {
        return localColetaRepository.findAll();
    }

    public LocalColeta getById(Integer id) {
        return getAndVerifyCollectLocal(id);
    }

    public List<LocalColeta> getByName(String nome) {
        List<LocalColeta> locaisDeColeta = localColetaRepository.findByNome(nome);
        if (locaisDeColeta.isEmpty()) throw new ExceptionCustom("Não há locais de coleta com o nome!", HttpStatus.NOT_FOUND);

        return locaisDeColeta;
    }

    public Integer save(LocalColetaDTO localColetaDTO) {
        Cidade cidade = cidadeService.getAndVerifyCity(localColetaDTO.getCidade_id());

        LocalColeta localColeta = new LocalColeta();
        BeanUtils.copyProperties(localColetaDTO, localColeta);

        localColeta.setCreated_at(LocalDateTime.now());
        localColeta.setUpdated_at(LocalDateTime.now());
        localColeta.setCidade(cidade);

        saveInDatabase(localColeta);
        return localColeta.getId();
    }

    public LocalColeta update(Integer id, LocalColetaDTO localColetaDTO) {
        LocalColeta localColetaBanco = getAndVerifyCollectLocal(id);
        LocalColeta attLocalColeta = new LocalColeta();

        BeanUtils.copyProperties(localColetaDTO, attLocalColeta);
        attLocalColeta.setId(localColetaBanco.getId());
        attLocalColeta.setCreated_at(localColetaBanco.getCreated_at());
        attLocalColeta.setUpdated_at(LocalDateTime.now());
        attLocalColeta.setCidade(localColetaBanco.getCidade());

        if (!Objects.equals(localColetaBanco.getCidade().getId(), localColetaDTO.getCidade_id())) {
            Cidade cidade = cidadeService.getAndVerifyCity(localColetaDTO.getCidade_id());
            attLocalColeta.setCidade(cidade);
        }

        saveInDatabase(attLocalColeta);
        return attLocalColeta;
    }

    public LocalColeta delete(Integer id) {
        LocalColeta localColeta = getAndVerifyCollectLocal(id);
        try {
            localColetaRepository.delete(localColeta);
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return localColeta;
    }

    public LocalColeta getAndVerifyCollectLocal(Integer id) {
        Optional<LocalColeta> localColeta = localColetaRepository.findById(id);
        if (localColeta.isEmpty()) throw new ExceptionCustom("Local de coleta não existe!", HttpStatus.NOT_FOUND);

        return localColeta.get();
    }

    private void saveInDatabase(LocalColeta localColeta) {
        try {
            localColeta.setId(localColetaRepository.save(localColeta).getId());
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
