-- FUNCTION: marketplace.search_dataset(integer, integer, text, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset(integer, integer, text, text, text, text, text);
-- FUNCTION: marketplace.search_dataset(integer, integer, text, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset(integer, integer, text, text, text, text, text);
CREATE OR REPLACE FUNCTION marketplace.search_dataset(
	purchased_by integer,
	user_id integer,
	topics text,
	terms text,
	cities text,
	region text,
	cn text)
    RETURNS SETOF marketplace.data_source_detail 
    LANGUAGE 'plpgsql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$
BEGIN
IF user_id <= 0 THEN
	RETURN query (select * from marketplace.data_source_detail 
	where ( terms = '' OR 
			((select to_tsvector(name) || ' ' || 
			         to_tsvector(coalesce(description,' '))  || ' ' || 
					 to_tsvector(state_province) || ' ' || 
			     	 array_to_tsvector(topic) || ' ' || 
					 array_to_tsvector(search_terms) || ' ' ||
					 array_to_tsvector(city) ) @@ to_tsquery(terms)) 
			OR terms %> (state_province || ' ' || country) 
			OR terms % ANY (city) )
	AND ( topics = '' OR topics % ANY (topic) )
	AND ( cities = '' OR cities % ANY (city) ) 
	AND ( region = '' OR region <% state_province ) 
	AND ( cn = '' OR cn <% country )
	AND (purchased_by = 0 
				or id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by)));
ELSE
	RETURN query (select * from marketplace.data_source_detail 
	where ( terms = '' OR 
			((select to_tsvector(name) || ' ' || 
			         to_tsvector(coalesce(description,' '))  || ' ' || 
					 to_tsvector(state_province) || ' ' || 
			     	 array_to_tsvector(topic) || ' ' || 
					 array_to_tsvector(search_terms) || ' ' ||
					 array_to_tsvector(city) ) @@ to_tsquery(terms)) 
			OR terms %> (state_province || ' ' || country) 
			OR terms % ANY (city) )
	AND ( topics = '' OR topics % ANY (topic) )
	AND ( cities = '' OR cities % ANY (city) ) 
	AND ( region = '' OR region <% state_province ) 
	AND ( cn = '' OR cn <% country )
	AND (purchased_by = 0 
			or id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
	AND ( dataset_owner_id <> user_id ));
END IF;
END;
$BODY$;

ALTER FUNCTION marketplace.search_dataset(integer, integer, text, text, text, text, text)
    OWNER TO reblocadmin;


-- FUNCTION: marketplace.search_dataset_schema(integer, integer, text, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset_schema(integer, integer, text, text, text, text, text);

CREATE OR REPLACE FUNCTION marketplace.search_dataset_schema(
	purchased_by integer,
	user_id integer,
	fields text,
	topics text,
	cities text,
	region text,
	ctn text)
    RETURNS SETOF marketplace.field_in_schema 
    LANGUAGE 'plpgsql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$
BEGIN
IF user_id < 0 THEN
	RETURN query (select dataset_id,
		   dataset_name,
		   country,
		   state_province,
		   city,
		   topic,
		   dataset_owner_id,
		   field_name,
		   field_type,
		   field_label,
		   field_description
	from marketplace.field_in_schema, 
				  to_tsvector(coalesce(field_label,' ')) t1, 
				  to_tsvector(coalesce(field_description,' ')) t2
		where (t1 @@ to_tsquery(fields) OR t2 @@ to_tsquery(fields)) 
			and (topics = '' or topics % any (topic))
			and (cities = '' or cities % any (city))
			and (region = '' or region %> (state_province))
			and (ctn = '' or ctn %> (country))
			and (purchased_by = 0 
				or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
			order by state_province, country);
ELSE
	RETURN query (select dataset_id,
			dataset_name,
			country,
			state_province,
			city,
			topic,
			dataset_owner_id,
			field_name,
			field_type,
			field_label,
			field_description
		from marketplace.field_in_schema, 
					to_tsvector(coalesce(field_label,' ')) t1, 
					to_tsvector(coalesce(field_description,' ')) t2
			where (t1 @@ to_tsquery(fields) OR t2 @@ to_tsquery(fields)) 
				and (topics = '' or topics % any (topic))
				and (cities = '' or cities % any (city))
				and (region = '' or region %> (state_province))
				and (ctn = '' or ctn %> (country))
				and ((purchased_by = 0 or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
					 or dataset_owner_id = user_id 
					)
				order by state_province, country);
END IF;
END;
$BODY$;



ALTER FUNCTION marketplace.search_dataset_schema(integer, integer, text, text, text, text, text)
    OWNER TO reblocadmin;

-- FUNCTION: marketplace.search_dataset_object(integer, integer, text, text, text, text)

-- DROP FUNCTION marketplace.search_dataset_object(integer, integer, text, text, text, text);

CREATE OR REPLACE FUNCTION marketplace.search_dataset_object(
	purchased_by integer,
	user_id integer,
	fields text,
	in_city_county text,
	in_region text,
	ctn text)
    RETURNS SETOF marketplace.object_dataset_view 
    LANGUAGE 'plpgsql'

    COST 100
    STABLE 
    ROWS 1000
AS $BODY$
BEGIN
IF user_id < 0 THEN
	RETURN query ( 
		select 
		   object_name,
           field_name,
		   field_label,
           field_description,
           field_category,
           country,
           state_province,
           city,
           dataset_name,
		   topic,
           dataset_id,
		   dataset_owner_id
		from marketplace.object_dataset_view,to_tsvector(coalesce(field_label,' ')) t1
		where (fields = '' or t1 @@ to_tsquery(fields))
		and (in_city_county = '' or in_city_county %> any(city))
		and (in_region = '' or in_region %> state_province)
		and (ctn = '' or ctn %> country)
		and (purchased_by = 0 or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by))
	);
ELSE
	RETURN query ( 
		select 
		   object_name,
           field_name,
		   field_label,
           field_description,
           field_category,
           country,
           state_province,
           city,
           dataset_name,
		   topic,
           dataset_id,
		   dataset_owner_id
		from marketplace.object_dataset_view, to_tsvector(coalesce(field_label,' ')) t1
		where (fields = '' or t1 @@ to_tsquery(fields))
		and (in_city_county = '' or in_city_county %> any(city))
		and (in_region = '' or in_region %> state_province)
		and (ctn = '' or ctn %> country)
		and (purchased_by = 0 
			 or dataset_id in (select dataset_id from marketplace.order_book where buyer_id = purchased_by)
			 or dataset_owner_id = user_id)
		);
END IF;
END;
$BODY$;

ALTER FUNCTION marketplace.search_dataset_object(integer, integer, text, text, text, text)
    OWNER TO reblocadmin;
