package dev.vitinh0z.backend.config;

import dev.vitinh0z.backend.dto.VisitorDtoRequest;
import dev.vitinh0z.backend.service.VisitorService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final VisitorService visitorService;

    @Value("${app.frontend.redirect-url}")
    private String frontendRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        Long githubId = ((Number) oAuth2User.getAttribute("id")).longValue();
        String login = oAuth2User.getAttribute("login");
        String name = oAuth2User.getAttribute("name");
        String avatar = oAuth2User.getAttribute("avatar_url");

        VisitorDtoRequest visitor = new VisitorDtoRequest(githubId, login, name, avatar);
        visitorService.upsertOnLogin(visitor);

        response.sendRedirect(frontendRedirectUrl);
    }
}