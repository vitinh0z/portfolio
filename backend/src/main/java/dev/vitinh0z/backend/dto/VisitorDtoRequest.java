package dev.vitinh0z.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VisitorDtoRequest(
        @NotNull Long githubId,
        @NotBlank String login,
        String name,
        String profileUrl) {
}
