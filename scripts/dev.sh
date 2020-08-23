#!/usr/bin/env bash

set -a
TS_NODE_TRANSPILE_ONLY=true
TS_NODE_PREFER_TS_EXTS=true
TS_NODE_FILES=true
TS_NODE_IGNORE="/node_modules/!(ts-sql-plugin)"
NODE_ENV=development
POSTGRES_ENTITIES=services/**/{entities,views}/**/*.ts
POSTGRES_SUBSCRIBERS=common/logger/TypeORMSubscriber.ts
. .env
set +a

yarn install

export PGPASSWORD=dsmadmin
export PGUSER=dsmadmin
export PGDATABASE=dsmback
export PGHOST=localhost
export PGPORT=5432

#npx pm2 del all
#npx pm2 start 'npx ts-sql-plugin  --emit_dir ./emitted_sql  --watch -p . -c "psql -c"' --name ts-sql-plugin
#npx pm2 start scripts/pgtyped.sh --name pgtyped

#nodemon --ignore src/common/types/pgtyped --ignore test --exec """
#  node -r ts-node/register src/generate-schema.ts &
#  node --inspect -r ts-node/register src/server.ts;
#"""

nodemon --exec
