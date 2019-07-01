#!/bin/bash

sudo su - vagrant

echo "== Installing Node =="

sudo apt install -y nodejs

echo "== Installing yarn =="

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install -y yarn

echo "== Installing Postgres =="

sudo apt install -y postgresql

echo "== Copying repository =="

cp -R /vagrant/* ~/
cd ~

echo "== Creating user and database =="

sudo -u postgres psql -c "create user celluloid with encrypted password '${CELLULOID_PG_PASSWORD}';"
sudo -u postgres psql -c "alter user celluloid with SUPERUSER;"
sudo -u postgres psql -c "create database celluloid with owner celluloid;"

echo "== Running yarn =="

yarn

echo "== Creating environment file =="

echo "\
# HTTP server port. Do not change unless you know what you're doing.
CELLULOID_LISTEN_PORT=${CELLULOID_LISTEN_PORT}
# Postgres server IP address or hostname.
CELLULOID_PG_HOST=${CELLULOID_PG_HOST}
# Postgres port.
CELLULOID_PG_PORT=${CELLULOID_PG_PORT}
# Postgres database name.
CELLULOID_PG_DATABASE=${CELLULOID_PG_DATABASE}
# Postgres database user.
CELLULOID_PG_USER=${CELLULOID_PG_USER}
# Postgres database password.
CELLULOID_PG_PASSWORD=${CELLULOID_PG_PASSWORD}
# Postgres connection pool config. Change at your own risk.
CELLULOID_PG_MAX_POOL_SIZE=${CELLULOID_PG_MAX_POOL_SIZE}
CELLULOID_PG_IDLE_TIMEOUT=${CELLULOID_PG_IDLE_TIMEOUT}
# Cookie secret key. Generate something random and long.
CELLULOID_COOKIE_SECRET=${CELLULOID_COOKIE_SECRET}
# email params. Check with your SMTP provider
CELLULOID_SMTP_HOST=${CELLULOID_SMTP_HOST}
CELLULOID_SMTP_USER=${CELLULOID_SMTP_USER}
CELLULOID_SMTP_PASSWORD=${CELLULOID_SMTP_PASSWORD}
CELLULOID_SMTP_TLS=${CELLULOID_SMTP_TLS}
CELLULOID_SMTP_PORT=${CELLULOID_SMTP_PORT}
" > .env

echo "== Creating database schema =="

cd bin
./create_schema.sh
cd ..

echo "== Building =="
yarn build

echo "== Starting =="
yarn start &
