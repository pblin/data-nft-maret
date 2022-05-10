-- Table: marketplace.customer

-- Table: marketplace.customer

--DROP TABLE marketplace.customer;

CREATE TABLE marketplace.customer
(
    id serial NOT NULL,
    primary_email character varying(80),
    secondary_email character varying(80),
    wallet_key_1 character varying(22),
    wallet_key_2 character varying(22),
    roles "char"[],
    last_name character varying(40),
    first_name character varying(40),
    is_org_admin boolean, 
    CONSTRAINT customer_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)

TABLESPACE pg_default;
