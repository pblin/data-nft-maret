#! /bin/bash
docker run -d -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://app%40rebloc-sql:Rebl0c989six@rebloc-sql.postgres.database.azure.com:5432/rebloc_data\
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v1.0.0-alpha33