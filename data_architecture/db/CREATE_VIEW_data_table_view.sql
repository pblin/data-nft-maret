-- View: cherre_sample_data.table_view

-- DROP VIEW cherre_sample_data.table_view;

CREATE OR REPLACE VIEW cherre_sample_data.table_view AS
 SELECT tables.table_name,
    columns.column_name,
    columns.data_type
   FROM information_schema.tables,
    information_schema.columns
  WHERE tables.table_schema::text = 'cherre_sample_data'::text AND tables.table_name::text = columns.table_name::text;

ALTER TABLE cherre_sample_data.table_view
    OWNER TO reblocadmin;

GRANT ALL ON TABLE cherre_sample_data.table_view TO app;
GRANT ALL ON TABLE cherre_sample_data.table_view TO reblocadmin;
