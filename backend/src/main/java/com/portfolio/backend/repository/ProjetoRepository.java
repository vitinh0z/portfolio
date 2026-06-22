package com.portfolio.backend.repository;

import com.portfolio.backend.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    List<Projeto> findByTituloContainingIgnoreCase(String titulo);
}
