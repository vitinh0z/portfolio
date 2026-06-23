package dev.vitinh0z.backend.dto;

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
}
