package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.CidadeDTO;
import com.example.bloodDonationSchedule.entity.Cidade;
import com.example.bloodDonationSchedule.entity.Estado;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.CidadeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CidadeService {

    private final CidadeRepository cidadeRepository;
    private final EstadoService estadoService;

    public CidadeService(CidadeRepository cidadeRepository, EstadoService estadoService) {
        this.cidadeRepository = cidadeRepository;
        this.estadoService = estadoService;
    }

    public List<Cidade> getAll() {
        return cidadeRepository.findAll();
    }

    public Cidade getById(Integer id) {
        return getAndVerifyCity(id);
    }

    public List<Cidade> getByName(String nome) {
        List<Cidade> cidades = cidadeRepository.findByNome(nome);
        if (cidades.isEmpty()) throw new ExceptionCustom("Não há cidades com o nome!", HttpStatus.NOT_FOUND);

        return cidades;
    }

    public Integer save(CidadeDTO cidadeDTO) {
        Estado estado = estadoService.getAndVerifyState(cidadeDTO.getEstado_id());

        Cidade cidade = new Cidade();
        BeanUtils.copyProperties(cidadeDTO, cidade);

        cidade.setCreated_at(LocalDateTime.now());
        cidade.setUpdated_at(LocalDateTime.now());
        cidade.setEstado(estado);

        saveInDatabase(cidade);
        return cidade.getId();
    }

    public Cidade update(Integer id, CidadeDTO cidadeDTO) {
        Cidade cidadeBanco = getAndVerifyCity(id);
        Cidade attCidade = new Cidade();

        BeanUtils.copyProperties(cidadeDTO, attCidade);
        attCidade.setId(cidadeBanco.getId());
        attCidade.setCreated_at(cidadeBanco.getCreated_at());
        attCidade.setUpdated_at(LocalDateTime.now());
        attCidade.setEstado(cidadeBanco.getEstado());

        if (!Objects.equals(cidadeBanco.getEstado().getId(), cidadeDTO.getEstado_id())) {
            Estado estado = estadoService.getAndVerifyState(cidadeDTO.getEstado_id());
            attCidade.setEstado(estado);
        }

        saveInDatabase(attCidade);
        return attCidade;
    }

    public Cidade delete(Integer id) {
        Cidade cidade = getAndVerifyCity(id);
        try {
            cidadeRepository.delete(cidade);
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return cidade;
    }

    public Cidade getAndVerifyCity(Integer id) {
        Optional<Cidade> cidade = cidadeRepository.findById(id);
        if (cidade.isEmpty()) throw new ExceptionCustom("Cidade não existe!", HttpStatus.NOT_FOUND);

        return cidade.get();
    }

    private void saveInDatabase(Cidade cidade) {
        try {
            cidade.setId(cidadeRepository.save(cidade).getId());
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
