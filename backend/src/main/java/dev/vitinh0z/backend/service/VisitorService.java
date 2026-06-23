package dev.vitinh0z.backend.service;// [Backend #5] VisitorService — upsert idempotente por githubId.

import dev.vitinh0z.backend.dto.VisitorDtoRequest;
import dev.vitinh0z.backend.exception.MessageException;
import dev.vitinh0z.backend.exception.VisitorNotFoundException;
import dev.vitinh0z.backend.model.Visitor;
import dev.vitinh0z.backend.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VisitorService {


    private final VisitorRepository visitorRepository;


    public Visitor upsertOnLogin(VisitorDtoRequest visitorDtoRequest){
        return visitorRepository.findByGithubId(visitorDtoRequest.githubId())
                .map(this::registerVisitor)
                .orElseGet(() -> createVisitor(visitorDtoRequest));
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

    public Visitor createMessage (String message, Long githubId){
        Visitor visitor = visitorRepository.findByGithubId(githubId).orElseThrow(()
                -> new VisitorNotFoundException(githubId));

        if (visitor.getMessage() != null){
            throw new MessageException(githubId);
        }
        visitor.setMessage(message);
        return visitorRepository.save(visitor);
    }



}