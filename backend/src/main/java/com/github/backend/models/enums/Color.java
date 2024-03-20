package com.github.backend.models.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Color {
    BLACK("black"),
    WHITE("white"),
    YELLOW("yelllow"),
    ORANGE("orange"),
    RED("red"),
    PINK("pink"),
    PURPLE("purple"),
    BLUE("blue"),
    GREEN("green"),
    MINT("mint");

    private final String value;
}
