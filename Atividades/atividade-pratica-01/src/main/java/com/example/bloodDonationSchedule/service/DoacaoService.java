package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.DoacaoDTO;
import com.example.bloodDonationSchedule.entity.Doacao;
import com.example.bloodDonationSchedule.entity.LocalColeta;
import com.example.bloodDonationSchedule.entity.Pessoa;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.DoacaoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DoacaoService {

    private final DoacaoRepository doacaoRepository;
    private final PessoaService pessoaService;
    private final LocalColetaService localColetaService;

    public DoacaoService(DoacaoRepository doacaoRepository, PessoaService pessoaService, LocalColetaService localColetaService) {
        this.doacaoRepository = doacaoRepository;
        this.pessoaService = pessoaService;
        this.localColetaService = localColetaService;
    }

    public List<Doacao> getAll() {
        return doacaoRepository.findAll();
    }

    public Doacao getById(Integer id) {
        return getAndVerifyDonation(id);
    }

    public Integer save(DoacaoDTO doacaoDTO) {
        Pessoa pessoa = pessoaService.getAndVerifyPeople(doacaoDTO.getPessoa_id());
        LocalColeta localColeta = localColetaService.getAndVerifyCollectLocal(doacaoDTO.getLocalColeta_id());

        Doacao doacao = new Doacao();
        BeanUtils.copyProperties(doacaoDTO, doacao);

        doacao.setCreated_at(LocalDateTime.now());
        doacao.setUpdated_at(LocalDateTime.now());
        doacao.setPessoa(pessoa);
        doacao.setLocalColeta(localColeta);

        saveInDatabase(doacao);
        return doacao.getId();
    }

    public Doacao update(Integer id, DoacaoDTO doacaoDTO) {
        Doacao doacaoBanco = getAndVerifyDonation(id);
        Doacao attDoacao = new Doacao();

        BeanUtils.copyProperties(doacaoDTO, attDoacao);
        attDoacao.setId(doacaoBanco.getId());
        attDoacao.setCreated_at(doacaoBanco.getCreated_at());
        attDoacao.setUpdated_at(LocalDateTime.now());
        attDoacao.setPessoa(doacaoBanco.getPessoa());
        attDoacao.setLocalColeta(doacaoBanco.getLocalColeta());

        if (!Objects.equals(doacaoBanco.getPessoa().getId(), doacaoDTO.getPessoa_id())) {
            Pessoa pessoa = pessoaService.getAndVerifyPeople(doacaoDTO.getPessoa_id());
            attDoacao.setPessoa(pessoa);
        }
        if (!Objects.equals(doacaoBanco.getLocalColeta().getId(), doacaoDTO.getLocalColeta_id())) {
            LocalColeta localColeta = localColetaService.getAndVerifyCollectLocal(doacaoDTO.getLocalColeta_id());
            attDoacao.setLocalColeta(localColeta);
        }

        saveInDatabase(attDoacao);
        return attDoacao;
    }

    public Doacao delete(Integer id) {
        Doacao doacao = getAndVerifyDonation(id);
        try {
            doacaoRepository.delete(doacao);
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return doacao;
    }

    public Doacao getAndVerifyDonation(Integer id) {
        Optional<Doacao> doacao = doacaoRepository.findById(id);
        if (doacao.isEmpty()) throw new ExceptionCustom("Doação não existe!", HttpStatus.NOT_FOUND);

        return doacao.get();
    }

    private void saveInDatabase(Doacao doacao) {
        try {
            doacao.setId(doacaoRepository.save(doacao).getId());
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
