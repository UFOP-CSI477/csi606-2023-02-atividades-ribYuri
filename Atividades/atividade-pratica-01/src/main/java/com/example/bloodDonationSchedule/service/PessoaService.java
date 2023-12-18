package com.example.bloodDonationSchedule.service;

import com.example.bloodDonationSchedule.dto.PessoaDTO;
import com.example.bloodDonationSchedule.entity.Cidade;
import com.example.bloodDonationSchedule.entity.Pessoa;
import com.example.bloodDonationSchedule.entity.TipoSanguineo;
import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.repository.PessoaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final CidadeService cidadeService;
    private final TipoSanguineoService tipoSanguineoService;

    public PessoaService(PessoaRepository pessoaRepository, CidadeService cidadeService, TipoSanguineoService tipoSanguineoService) {
        this.pessoaRepository = pessoaRepository;
        this.cidadeService = cidadeService;
        this.tipoSanguineoService = tipoSanguineoService;
    }

    public List<Pessoa> getAll() {
        return pessoaRepository.findAll();
    }

    public Pessoa getById(Integer id) {
        return getAndVerifyPeople(id);
    }

    public List<Pessoa> getByName(String nome) {
        List<Pessoa> pessoas = pessoaRepository.findByNome(nome);
        if (pessoas.isEmpty()) throw new ExceptionCustom("Não há pessoas com o nome!", HttpStatus.NOT_FOUND);

        return pessoas;
    }

    public Integer save(PessoaDTO pessoaDTO) {
        Cidade cidade = cidadeService.getAndVerifyCity(pessoaDTO.getCidade_id());
        TipoSanguineo tipoSanguineo = tipoSanguineoService.getAndVerifyBloodType(pessoaDTO.getTipoSanguineo_id());

        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaDTO, pessoa);

        pessoa.setCreated_at(LocalDateTime.now());
        pessoa.setUpdated_at(LocalDateTime.now());
        pessoa.setCidade(cidade);
        pessoa.setTipoSanguineo(tipoSanguineo);

        saveInDatabase(pessoa);
        return pessoa.getId();
    }

    public Pessoa update(Integer id, PessoaDTO pessoaDTO) {
        Pessoa pessoaBanco = getAndVerifyPeople(id);
        Pessoa attPessoa = new Pessoa();

        BeanUtils.copyProperties(pessoaDTO, attPessoa);
        attPessoa.setId(pessoaBanco.getId());
        attPessoa.setCreated_at(pessoaBanco.getCreated_at());
        attPessoa.setUpdated_at(LocalDateTime.now());
        attPessoa.setCidade(pessoaBanco.getCidade());
        attPessoa.setTipoSanguineo(pessoaBanco.getTipoSanguineo());

        if (!Objects.equals(pessoaBanco.getCidade().getId(), pessoaDTO.getCidade_id())) {
            Cidade cidade = cidadeService.getAndVerifyCity(pessoaDTO.getCidade_id());
            attPessoa.setCidade(cidade);
        }
        if (!Objects.equals(pessoaBanco.getTipoSanguineo().getId(), pessoaDTO.getTipoSanguineo_id())) {
            TipoSanguineo tipoSanguineo = tipoSanguineoService.getAndVerifyBloodType(pessoaDTO.getTipoSanguineo_id());
            attPessoa.setTipoSanguineo(tipoSanguineo);
        }

        saveInDatabase(attPessoa);
        return attPessoa;
    }

    public Pessoa delete(Integer id) {
        Pessoa pessoa = getAndVerifyPeople(id);
        try {
            pessoaRepository.delete(pessoa);
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return pessoa;
    }

    public Pessoa getAndVerifyPeople(Integer id) {
        Optional<Pessoa> pessoa = pessoaRepository.findById(id);
        if (pessoa.isEmpty()) throw new ExceptionCustom("Pessoa não existe!", HttpStatus.NOT_FOUND);

        return pessoa.get();
    }

    private void saveInDatabase(Pessoa pessoa) {
        try {
            pessoa.setId(pessoaRepository.save(pessoa).getId());
        } catch (Exception e) {
            throw new ExceptionCustom(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
