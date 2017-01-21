#!/bin/bash
# Build and install a self-signed localhost SSL certificate

echo "Generating an SSL private key to sign your certificate..."
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

echo "Generating a Certificate Signing Request. Specify localhost for FQDN..."
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr

echo "Generating certificate..."
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt

echo "Copying certificate (server.crt) to /etc/ssl/certs/"
mkdir -p  /etc/ssl/certs
cp server.crt /etc/ssl/certs/

echo "Copying key (server.key) to /etc/ssl/private/"
mkdir -p  /etc/ssl/private
cp server.key /etc/ssl/private/

echo "Cleaning up..."
rm server.crt
rm server.key
rm server.csr

echo "Done"
