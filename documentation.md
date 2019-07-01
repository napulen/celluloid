## Vagrant container documentation

Using an `ubuntu-18.04` vagrant box, which is named `bento/ubuntu-18.04`.

First step is to install `nodejs` and `yarn` automatically


### nodejs

```
sudo apt install -y nodejs
```

### yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

```
sudo apt-get update && sudo apt-get install -y yarn
```

### postgres

```
sudo apt install -y postgresql
```



### copy repository inside vm

```
cp -R /vagrant/* ~/
cd ~
```

```
yarn
```

```
sudo -u postgres psql -c "create user celluloid with encrypted password 'USE_A_STRONGER_PASSWORD';"
sudo -u postgres psql -c "alter user celluloid with SUPERUSER;"
sudo -u postgres psql -c "create database celluloid with owner celluloid;"
```

```
cp sample.env .env
```

### create schema

```
cd bin
./create_schema.sh
cd ..
```

### build and deploy

```
yarn build
yarn start
```




