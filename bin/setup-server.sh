
here=$(dirname $0)
server=$here/../server

if [ -e $server/db.json ]
then
  echo "already initialized"
else
  bash $here/initialize-server.sh
fi
