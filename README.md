## TRACKING CHAIN PROJECT

# Setu up docker and database

docker pull mysql:latest
docker run --name trackingchain -e MYSQL_ROOT_PASSWORD=test -d mysql:latest

# Set up the database with Dbeaver
