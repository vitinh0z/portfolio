package dev.vitinh0z.backend.repository;

import dev.vitinh0z.backend.model.Visitor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VisitorRepository extends JpaRepository<Visitor, UUID> {

    Optional<Visitor> findByGithubId(Long githubId);

    List<Visitor> findAllByOrderByFirstVisitAtDesc(Pageable pageable);
}