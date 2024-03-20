package com.github.backend.models.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Gym {
    UA_HH_WEST("urban apes Hamburg West"),
    UA_HH_OST("urban apes Hamburg Ost"),
    UA_NDS("urban apes Norderstedt"),
    UA_ST_PAULI("urban apes St. Pauli");

    private final String value;
}
