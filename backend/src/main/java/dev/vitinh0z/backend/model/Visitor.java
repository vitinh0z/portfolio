package dev.vitinh0z.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "visitors")
@Getter
@Setter
@NoArgsConstructor
public class Visitor{

    @Id()
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;

    @NotNull
    @Column(unique = true, nullable = false)
    private long githubId;

    private String login;

    private String name;

    private String profileUrl;

    @Column(length = 100)
    private String message;

    private LocalDateTime firstVisitAt;

    @Column(nullable = false)
    private int visitCount;
}