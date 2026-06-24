package dev.vitinh0z.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Corpo do POST /api/presenca. O limite de 100 espelha o @Column(length = 100) de Visitor.message,
// validando na entrada (400) em vez de estourar no banco.
public record MessageDtoRequest(
        @NotBlank @Size(max = 100) String message) {
}
