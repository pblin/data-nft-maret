-- Table: marketplace.data_source_detail

-- DROP TABLE marketplace.data_source_detail;

CREATE TABLE marketplace.data_source_detail
(
    parameters character varying(40)[] COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    dataset_owner_id integer NOT NULL,
    delivery_method text COLLATE pg_catalog."default",
    id text COLLATE pg_catalog."default" NOT NULL,
    search_terms text[] COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default",
    state_province text COLLATE pg_catalog."default",
    date_created timestamp with time zone NOT NULL,
    date_modified timestamp with time zone,
    name text COLLATE pg_catalog."default",
    num_of_records integer,
    price_low numeric,
    price_high numeric,
    json_schema text COLLATE pg_catalog."default",
    stage integer DEFAULT 1,
    table_name text COLLATE pg_catalog."default",
    sample_hash text COLLATE pg_catalog."default",
    data_hash text COLLATE pg_catalog."default",
    sample_access_url text COLLATE pg_catalog."default",
    enc_sample_key text COLLATE pg_catalog."default",
    enc_data_key text COLLATE pg_catalog."default",
    access_url text COLLATE pg_catalog."default",
    api_key text COLLATE pg_catalog."default",
    pricing_unit character varying(4) COLLATE pg_catalog."default" DEFAULT 'usd'::character varying,
    data_compression character varying(6) COLLATE pg_catalog."default" DEFAULT 'gzip'::character varying,
    asset_token_address text COLLATE pg_catalog."default",
    city text[] COLLATE pg_catalog."default",
    topic text[] COLLATE pg_catalog."default",
    schema jsonb,
    CONSTRAINT data_source_detail_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.data_source_detail
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.data_source_detail TO app;

GRANT ALL ON TABLE marketplace.data_source_detail TO reblocadmin;

COMMENT ON COLUMN marketplace.data_source_detail.id
    IS 'uuid';

COMMENT ON COLUMN marketplace.data_source_detail.stage
    IS 'stage of dataset ';

-- Index: city_idx

-- DROP INDEX marketplace.city_idx;

CREATE INDEX city_idx
    ON marketplace.data_source_detail USING gin
    (city COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: data_source_owner_idx

-- DROP INDEX marketplace.data_source_owner_idx;

CREATE INDEX data_source_owner_idx
    ON marketplace.data_source_detail USING btree
    (dataset_owner_id)
    TABLESPACE pg_default;

-- Index: region_idx

-- DROP INDEX marketplace.region_idx;

CREATE INDEX region_idx
    ON marketplace.data_source_detail USING gin
    (((state_province || ' '::text) || country) COLLATE pg_catalog."default" gin_trgm_ops)
    TABLESPACE pg_default;

-- Index: schema_idx

-- DROP INDEX marketplace.schema_idx;

CREATE INDEX schema_idx
    ON marketplace.data_source_detail USING gin
    (schema)
    TABLESPACE pg_default;

-- Index: search_term_idx

-- DROP INDEX marketplace.search_term_idx;

CREATE INDEX search_term_idx
    ON marketplace.data_source_detail USING gin
    (search_terms COLLATE pg_catalog."default")
    TABLESPACE pg_default;

-- Index: topic_idx

-- DROP INDEX marketplace.topic_idx;

CREATE INDEX topic_idx
    ON marketplace.data_source_detail USING gin
    (topic COLLATE pg_catalog."default")
    TABLESPACE pg_default;