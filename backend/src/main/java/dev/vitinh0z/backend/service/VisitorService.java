package dev.vitinh0z.backend.service;// [Backend #5] VisitorService — upsert idempotente por githubId.

import dev.vitinh0z.backend.dto.VisitorDtoRequest;
import dev.vitinh0z.backend.dto.VisitorDtoResponse;
import dev.vitinh0z.backend.exception.MessageException;
import dev.vitinh0z.backend.exception.VisitorNotFoundException;
import dev.vitinh0z.backend.model.Visitor;
import dev.vitinh0z.backend.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VisitorService {


    private final VisitorRepository visitorRepository;



    public Visitor upsertOnLogin(VisitorDtoRequest visitorDtoRequest){
        Optional<Visitor> existente = visitorRepository.findByGithubId(visitorDtoRequest.githubId());
        if (existente.isPresent()) {
            return registerVisitor(existente.get());
        }
        try {
            return createVisitor(visitorDtoRequest);
        } catch (DataIntegrityViolationException loginConcorrente) {

            return visitorRepository.findByGithubId(visitorDtoRequest.githubId())
                    .map(this::registerVisitor)
                    .orElseThrow(() -> loginConcorrente);
        }
    }

    private Visitor registerVisitor(Visitor visitor){
        visitor.setVisitCount(visitor.getVisitCount() + 1);
        return visitorRepository.save(visitor);
    }

    private Visitor createVisitor(VisitorDtoRequest visitorDtoRequest) {
        Visitor visitor = new Visitor();

        visitor.setGithubId(visitorDtoRequest.githubId());
        visitor.setLogin(visitorDtoRequest.login());
        visitor.setName(visitorDtoRequest.name());
        visitor.setProfileUrl(visitorDtoRequest.profileUrl());

        LocalDateTime localDateTime = LocalDateTime.now();

        visitor.setFirstVisitAt(localDateTime);
        visitor.setVisitCount(1);

        return visitorRepository.saveAndFlush(visitor);
    }

    @Transactional
    public Visitor createMessage (String message, Long githubId){
        Visitor visitor = visitorRepository.findByGithubId(githubId).orElseThrow(()
                -> new VisitorNotFoundException(githubId));

        if (visitor.getMessage() != null){
            throw new MessageException(githubId);
        }
        visitor.setMessage(message);
        return visitorRepository.save(visitor);
    }

    @Transactional(readOnly = true)
    public List<VisitorDtoResponse> listarMural(int limit) {
        int tamanho = Math.clamp(limit, 1, 100);
        return visitorRepository.findAllByOrderByFirstVisitAtDesc(PageRequest.of(0, tamanho))
                .stream()
                .map(VisitorDtoResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public VisitorDtoResponse buscarPorGithubId(Long githubId) {
        return visitorRepository.findByGithubId(githubId)
                .map(VisitorDtoResponse::from)
                .orElseThrow(() -> new VisitorNotFoundException(githubId));
    }
}