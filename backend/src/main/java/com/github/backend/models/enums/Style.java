package com.github.backend.models.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Style {
    DYNO("dyno"),
    SLAB("slab"),
    ROOF("roof"),
    NEGATIVE("negative"),
    MANTLE("mantle"),
    RUN_UP("run up"),
    STATIC("static"),
    BAT_HANG("bat hang"),
    CORNER("corner");

    private final String value;
}
