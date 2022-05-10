-- Table: marketplace.field

-- DROP TABLE marketplace.field;

CREATE TABLE marketplace.field
(
    name text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    label text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    context_id integer,
    is_tradable boolean,
    category text COLLATE pg_catalog."default",
    CONSTRAINT field_name PRIMARY KEY (name),
    CONSTRAINT field_context_id_fkey FOREIGN KEY (context_id)
        REFERENCES marketplace.context (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.field
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.field TO app;

GRANT ALL ON TABLE marketplace.field TO reblocadmin;