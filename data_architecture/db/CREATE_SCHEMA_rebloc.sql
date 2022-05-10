-- DROP SCHEMA marketplace ;

CREATE SCHEMA marketplace
    AUTHORIZATION reblocadmin;

GRANT USAGE ON SCHEMA marketplace TO app;

GRANT ALL ON SCHEMA marketplace TO reblocadmin;

ALTER DEFAULT PRIVILEGES IN SCHEMA marketplace
GRANT ALL ON TABLES TO app;