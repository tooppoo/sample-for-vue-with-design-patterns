
here=$(dirname $0)
server=$here/../server

cp $server/db.seed.json $server/db.json

echo "initialized mock server"
