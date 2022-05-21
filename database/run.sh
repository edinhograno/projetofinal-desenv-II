#! /bin/bash
docker run --restart=always -d -p 5432:5432 -v edinho-volume:/var/lib/postgresql/data -e PGDATA=/var/lib/postgresql/data/pgdata edinho-database
#windows: docker run --restart=always -d -p 5432:5432 -v %cd%/data:/var/lib/postgresql/data edinho-database

