#Edit /etc/postgresql/9.4/main/pg_hba.conf 

local   all             postgres                                trust #peer

#######################################################################

sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
psql -f db.sql -U postgres

#GET models
curl http://127.0.0.1:8000/api/models

#GET models/:id
curl http://127.0.0.1:8000/api/models/:id

#POST models
curl -H "Content-Type: application/json" -X POST -d '{"name":"killbill"}' http://127.0.0.1:8000/api/models

#PUT models
curl -H "Content-Type: application/json" -X PUT -d '{"name":"Kill Bill"}' http://127.0.0.1:8000/api/models/2

#DELETE models
curl -X DELETE http://127.0.0.1:8000/api/models/1