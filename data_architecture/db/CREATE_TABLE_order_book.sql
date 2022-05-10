-- Table: marketplace.order_book

-- DROP TABLE marketplace.order_book;

CREATE TABLE marketplace.order_book
(
    buyer_id integer NOT NULL,
    offer numeric DEFAULT 0,
    bid numeric DEFAULT 0,
    trade numeric,
    seller_id integer,
    order_status integer,
    payment_txn_ref text COLLATE pg_catalog."default",
    buyer_wallet_addr text COLLATE pg_catalog."default",
    seller_wallet_addr text COLLATE pg_catalog."default",
    dataset_id text COLLATE pg_catalog."default",
    data_loc_hash text COLLATE pg_catalog."default",
    id text COLLATE pg_catalog."default" NOT NULL,
    pricing_unit character varying(4) COLLATE pg_catalog."default" DEFAULT 'usd'::character varying,
    settlement_txn_timestamp timestamp with time zone,
    order_timestamp timestamp with time zone,
    dataset_description text COLLATE pg_catalog."default",
    CONSTRAINT order_book_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE marketplace.order_book
    OWNER to reblocadmin;

GRANT ALL ON TABLE marketplace.order_book TO app;

GRANT ALL ON TABLE marketplace.order_book TO reblocadmin;

-- Index: orderindex

-- DROP INDEX marketplace.orderindex;

CREATE UNIQUE INDEX orderindex
    ON marketplace.order_book USING btree
    (id COLLATE pg_catalog."default")
    TABLESPACE pg_default;