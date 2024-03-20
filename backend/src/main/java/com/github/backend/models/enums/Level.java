package com.github.backend.models.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Level {
    ONE("1"),
    TWO("2"),
    THREE("3"),
    FOUR("4"),
    FIVE("5"),
    SIX("6"),
    SEVEN("7"),
    EIGHT("8"),
    UNKNOWN("unknown");

    private final String value;
}
