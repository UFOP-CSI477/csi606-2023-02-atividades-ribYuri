CREATE TABLE categories (
    id          SERIAL,
    name        VARCHAR     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id              SERIAL,
    title           VARCHAR,
    price           FLOAT,
    description     VARCHAR,
    category_id     INTEGER,
    image           VARCHAR,
    rate            FLOAT,
    count           INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) references categories (id)
);

