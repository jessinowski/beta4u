package com.github.backend.models.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Hold {
    CRIMP("crimp"),
    JUG("jug"),
    PINCH("pinch"),
    POCKET("pocket"),
    SLOPER("sloper"),
    VOLUME("volume"),
    MACRO("macro"),
    DUAL_TEX("dual tex");

    private final String value;
}
