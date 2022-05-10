-- Table: marketplace.organization

-- DROP TABLE marketplace.organization;

CREATE TABLE marketplace.organization
(
    id serial NOT NULL,
    org_name character varying(40),
    address character varying(154),
    memember_id integer REFERENCES customer (id),
    CONSTRAINT organization_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

--ALTER TABLE marketplace.organization
--    OWNER to reblocadmin;

-- GRANT ALL ON TABLE marketplace.organization TO app;

--GRANT ALL ON TABLE marketplace.organization TO reblocadmin;