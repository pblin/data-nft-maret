
-- DROP VIEW marketplace.field_in_table
CREATE VIEW marketplace.field_in_table AS
SELECT column_name as field_name, table_name
FROM information_schema.columns
WHERE table_schema = 'cherre_sample_data'
and column_name in (select name from marketplace.available_fields);
