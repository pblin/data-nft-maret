-- Drop database rebloc_data 

CREATE DATABASE rebloc_data
    WITH 
    OWNER = reblocadmin
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE rebloc_data TO app;

GRANT ALL ON DATABASE rebloc_data TO app_dev WITH GRANT OPTION;

GRANT TEMPORARY, CONNECT ON DATABASE rebloc_data TO PUBLIC;

GRANT ALL ON DATABASE rebloc_data TO reblocadmin;