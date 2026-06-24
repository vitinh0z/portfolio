// [Backend #8] PresencaController — endpoints da API do mural de presenca.
// GET  /api/presenca?limit=N  (publico)     -> mural com os ultimos visitantes
// POST /api/presenca          (autenticado) -> deixa a mensagem do visitante logado (uma vez)
// GET  /api/me                (autenticado) -> visitante logado (401 se nao autenticado)
// POST /api/logout            -> tratado pelo SecurityConfig (Spring Security)
// Ver issue: https://github.com/vitinh0z/portfolio/issues/8
package dev.vitinh0z.backend.controller;

import dev.vitinh0z.backend.dto.MessageDtoRequest;
import dev.vitinh0z.backend.dto.VisitorDtoResponse;
import dev.vitinh0z.backend.service.VisitorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PresencaController {

    private final VisitorService visitorService;

    // Mural publico: ultimos visitantes (e suas mensagens, quando houver).
    @GetMapping("/presenca")
    public List<VisitorDtoResponse> mural(@RequestParam(defaultValue = "50") int limit) {
        return visitorService.listarMural(limit);
    }

    // Deixa a mensagem do visitante logado no mural (apenas uma vez por visitante).
    @PostMapping("/presenca")
    public VisitorDtoResponse deixarMensagem(@AuthenticationPrincipal OAuth2User principal,
                                             @Valid @RequestBody MessageDtoRequest body) {
        return VisitorDtoResponse.from(visitorService.createMessage(body.message(), githubId(principal)));
    }

    // Visitante atualmente logado. Sem sessao valida, a cadeia de seguranca responde 401.
    @GetMapping("/me")
    public VisitorDtoResponse me(@AuthenticationPrincipal OAuth2User principal) {
        return visitorService.buscarPorGithubId(githubId(principal));
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    private Long githubId(OAuth2User principal) {
        return ((Number) principal.getAttribute("id")).longValue();
    }
}
