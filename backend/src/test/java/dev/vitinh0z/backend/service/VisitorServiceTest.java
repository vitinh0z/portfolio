// [Backend #9] Teste do VisitorService.
// Cobre o DoD da #5: upsert cria na 1a chamada, é idempotente por githubId (não duplica linha),
// recupera de corrida de login concorrente, e createMessage barra mensagem duplicada.
// Ver issue: https://github.com/vitinh0z/portfolio/issues/9
package dev.vitinh0z.backend.service;

import dev.vitinh0z.backend.dto.VisitorDtoRequest;
import dev.vitinh0z.backend.exception.MessageException;
import dev.vitinh0z.backend.exception.VisitorNotFoundException;
import dev.vitinh0z.backend.model.Visitor;
import dev.vitinh0z.backend.repository.VisitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VisitorServiceTest {

    private static final Long GITHUB_ID = 4242L;

    @Mock
    private VisitorRepository visitorRepository;

    @InjectMocks
    private VisitorService visitorService;

    private VisitorDtoRequest request() {
        return new VisitorDtoRequest(GITHUB_ID, "vitinh0z", "Victor", "https://github.com/vitinh0z");
    }

    private Visitor existingVisitor(int visitCount) {
        Visitor visitor = new Visitor();
        visitor.setGithubId(GITHUB_ID);
        visitor.setLogin("vitinh0z");
        visitor.setVisitCount(visitCount);
        return visitor;
    }

    @Test
    void upsertOnLogin_quandoVisitanteNaoExiste_criaNovoComVisitCount1() {
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.empty());
        when(visitorRepository.saveAndFlush(any(Visitor.class))).thenAnswer(inv -> inv.getArgument(0));

        Visitor resultado = visitorService.upsertOnLogin(request());

        ArgumentCaptor<Visitor> captor = ArgumentCaptor.forClass(Visitor.class);
        verify(visitorRepository).saveAndFlush(captor.capture());
        verify(visitorRepository, never()).save(any(Visitor.class));

        Visitor criado = captor.getValue();
        assertThat(criado.getGithubId()).isEqualTo(GITHUB_ID);
        assertThat(criado.getLogin()).isEqualTo("vitinh0z");
        assertThat(criado.getName()).isEqualTo("Victor");
        assertThat(criado.getProfileUrl()).isEqualTo("https://github.com/vitinh0z");
        assertThat(criado.getVisitCount()).isEqualTo(1);
        assertThat(criado.getFirstVisitAt()).isNotNull();
        assertThat(resultado).isSameAs(criado);
    }

    @Test
    void upsertOnLogin_quandoVisitanteExiste_naoDuplicaEIncrementaVisitCount() {
        Visitor existente = existingVisitor(3);
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.of(existente));
        when(visitorRepository.save(any(Visitor.class))).thenAnswer(inv -> inv.getArgument(0));

        Visitor resultado = visitorService.upsertOnLogin(request());

        // DoD: logar de novo não cria uma segunda linha — nenhuma inserção nova (saveAndFlush).
        verify(visitorRepository, never()).saveAndFlush(any(Visitor.class));
        verify(visitorRepository).save(existente);
        assertThat(resultado.getVisitCount()).isEqualTo(4);
        assertThat(resultado).isSameAs(existente);
    }

    @Test
    void upsertOnLogin_quandoCorridaDeLoginConcorrente_recuperaSemVazarErro() {
        Visitor vencedor = existingVisitor(1);
        // 1a leitura vê vazio (decide criar); após a violação, 2a leitura vê a linha vencedora.
        when(visitorRepository.findByGithubId(GITHUB_ID))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(vencedor));
        when(visitorRepository.saveAndFlush(any(Visitor.class)))
                .thenThrow(new DataIntegrityViolationException("unique(github_id) violado"));
        when(visitorRepository.save(any(Visitor.class))).thenAnswer(inv -> inv.getArgument(0));

        Visitor resultado = visitorService.upsertOnLogin(request());

        // Recuperou relendo o vencedor e tratou como login normal (incrementa), sem propagar 500.
        assertThat(resultado).isSameAs(vencedor);
        assertThat(resultado.getVisitCount()).isEqualTo(2);
        verify(visitorRepository).save(vencedor);
    }

    @Test
    void upsertOnLogin_quandoCorridaSemLinhaVencedora_propagaExcecao() {
        // Violação de integridade que NÃO é corrida recuperável: releitura segue vazia.
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.empty());
        DataIntegrityViolationException erro = new DataIntegrityViolationException("violação não recuperável");
        when(visitorRepository.saveAndFlush(any(Visitor.class))).thenThrow(erro);

        assertThatThrownBy(() -> visitorService.upsertOnLogin(request()))
                .isSameAs(erro);
    }

    @Test
    void createMessage_quandoVisitanteNaoExiste_lancaVisitorNotFound() {
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> visitorService.createMessage("Passei por aqui!", GITHUB_ID))
                .isInstanceOf(VisitorNotFoundException.class);

        verify(visitorRepository, never()).save(any(Visitor.class));
    }

    @Test
    void createMessage_quandoJaPossuiMensagem_lancaMessageException() {
        Visitor comMensagem = existingVisitor(1);
        comMensagem.setMessage("Mensagem anterior");
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.of(comMensagem));

        assertThatThrownBy(() -> visitorService.createMessage("Tentando de novo", GITHUB_ID))
                .isInstanceOf(MessageException.class);

        verify(visitorRepository, never()).save(any(Visitor.class));
    }

    @Test
    void createMessage_quandoVisitanteSemMensagem_persisteARecado() {
        Visitor semMensagem = existingVisitor(1);
        when(visitorRepository.findByGithubId(GITHUB_ID)).thenReturn(Optional.of(semMensagem));
        when(visitorRepository.save(any(Visitor.class))).thenAnswer(inv -> inv.getArgument(0));

        Visitor resultado = visitorService.createMessage("Passei por aqui!", GITHUB_ID);

        verify(visitorRepository).save(semMensagem);
        assertThat(resultado.getMessage()).isEqualTo("Passei por aqui!");
    }
}
