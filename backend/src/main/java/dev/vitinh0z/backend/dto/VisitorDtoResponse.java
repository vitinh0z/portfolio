package dev.vitinh0z.backend.dto;

import dev.vitinh0z.backend.model.Visitor;

import java.time.LocalDateTime;
import java.util.UUID;

public record VisitorDtoResponse(
        UUID id,
        String login,
        Long githubId,
        String name,
        String profileUrl,
        String message,
        LocalDateTime firstVisitAt) {

    public static VisitorDtoResponse from(Visitor visitor) {
        return new VisitorDtoResponse(
                visitor.getId(),
                visitor.getLogin(),
                visitor.getGithubId(),
                visitor.getName(),
                visitor.getProfileUrl(),
                visitor.getMessage(),
                visitor.getFirstVisitAt()
        );
    }
}
