-- View: marketplace.object_dataset_view

-- DROP VIEW marketplace.object_dataset_view;

CREATE OR REPLACE VIEW marketplace.object_dataset_view AS
 SELECT a.object_name,
    a.name AS field_name,
    a.label AS field_label,
    a.description AS field_description,
    a.category AS field_category,
    b.country,
    b.state_province,
    b.city,
    b.name AS dataset_name,
	b.topic AS topic
    b.id AS dataset_id,
    b.dataset_owner_id
   FROM marketplace.field a
     JOIN marketplace.data_source_detail b ON a.object_name = b.object_name
  ORDER BY b.state_province, b.country;

ALTER TABLE marketplace.object_dataset_view
    OWNER TO reblocadmin;

GRANT ALL ON TABLE marketplace.object_dataset_view TO app;
GRANT ALL ON TABLE marketplace.object_dataset_view TO reblocadmin;
