-- View: marketplace.field_in_schema

-- DROP VIEW marketplace.field_in_schema;

CREATE OR REPLACE VIEW marketplace.field_in_schema AS
 SELECT id AS dataset_id,
    data_source_detail.name AS dataset_name,
    data_source_detail.country,
    data_source_detail.state_province,
    data_source_detail.city,
    data_source_detail.topic,
    data_source_detail.dataset_owner_id,
    each_dataset.value ->> 'name'::text AS field_name,
    each_dataset.value ->> 'type'::text AS field_type,
    each_dataset.value ->> 'label'::text AS field_label,
    each_dataset.value ->> 'description'::text AS field_description
   FROM marketplace.data_source_detail
     CROSS JOIN LATERAL jsonb_array_elements(schema) each_dataset(value);

ALTER TABLE marketplace.field_in_schema
    OWNER TO reblocadmin;

GRANT ALL ON TABLE marketplace.field_in_schema TO app;
GRANT ALL ON TABLE marketplace.field_in_schema TO reblocadmin;