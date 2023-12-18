CREATE TABLE tipos_sanguineos
(
    id         SERIAL,
    tipo       VARCHAR,
    fator      VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE estados
(
    id         SERIAL,
    nome       VARCHAR,
    sigla      VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE cidades
(
    id         SERIAL,
    nome       VARCHAR,
    estado_id  INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (estado_id) REFERENCES estados (id)
);

CREATE TABLE pessoas
(
    id          SERIAL,
    nome        VARCHAR,
    rua         VARCHAR,
    numero      VARCHAR,
    complemento VARCHAR,
    rg          VARCHAR,
    cidade_id   INTEGER,
    tipo_id     INTEGER,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidades (id),
    FOREIGN KEY (tipo_id) REFERENCES tipos_sanguineos (id)
);

CREATE TABLE locais_coleta
(
    id          SERIAL,
    nome        VARCHAR,
    rua         VARCHAR,
    numero      VARCHAR,
    complemento VARCHAR,
    cidade_id   INTEGER,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidades (id)
);

CREATE TABLE doacoes
(
    id         SERIAL,
    pessoa_id  INTEGER,
    local_id   INTEGER,
    data       DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoas (id),
    FOREIGN KEY (local_id) REFERENCES locais_coleta (id)
)