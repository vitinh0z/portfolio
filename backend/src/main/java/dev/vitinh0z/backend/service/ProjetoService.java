package dev.vitinh0z.backend.service;

import dev.vitinh0z.backend.model.Projeto;
import dev.vitinh0z.backend.repository.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository repository;

    public List<Projeto> listarTodos() {
        return repository.findAll();
    }

    public Optional<Projeto> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Projeto salvar(Projeto projeto) {
        return repository.save(projeto);
    }

    public Optional<Projeto> atualizar(Long id, Projeto dados) {
        return repository.findById(id).map(existente -> {
            existente.setTitulo(dados.getTitulo());
            existente.setDescricao(dados.getDescricao());
            existente.setTecnologias(dados.getTecnologias());
            existente.setUrlGithub(dados.getUrlGithub());
            existente.setUrlDemo(dados.getUrlDemo());
            return repository.save(existente);
        });
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
