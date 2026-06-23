package dev.vitinh0z.backend.exception;

public class MessageException extends RuntimeException {

    public MessageException(Long githubId) {
        super("Visitante " + githubId + " já deixou uma mensagem no mural.");
    }
}
