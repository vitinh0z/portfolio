package dev.vitinh0z.backend.exception;

public class VisitorNotFoundException extends RuntimeException {
    public VisitorNotFoundException(Long githubId) {
        super("Visitante com githubId " + githubId + " não encontrado. Faça login antes de deixar uma mensagem.");
    }
}
