-- Table: marketplace.source_of_field

-- DROP TABLE marketplace.source_of_field;

CREATE TABLE marketplace.source_of_field
(
    source_id text COLLATE pg_catalog."default" NOT NULL,
    field_type text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    field_name text COLLATE pg_catalog."default" NOT NULL,
    field_label text COLLATE pg_catalog."default",
    region text COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default",
    search_terms text[] COLLATE pg_catalog."default",
    CONSTRAINT source_of_field_pkey PRIMARY KEY (source_id, field_name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.source_of_field
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.source_of_field TO app;

GRANT ALL ON TABLE marketplace.source_of_field TO reblocadmin;

-- Index: field_label_idx

-- DROP INDEX marketplace.field_label_idx;

CREATE INDEX field_label_idx
    ON marketplace.source_of_field USING btree
    (field_label COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: fki_source_id_fkey

-- DROP INDEX marketplace.fki_source_id_fkey;

CREATE INDEX fki_source_id_fkey
    ON marketplace.source_of_field USING btree
    (source_id COLLATE pg_catalog."default")
    TABLESPACE pg_default;