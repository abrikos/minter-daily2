#!/usr/bin/env bash
echo $1 $2
cd /home/abrikos/minter-daily2

case "${1}" in
"minute" )
node server/cron.js --minute
;;

"day" )
node server/cron.js --day
;;

"hour" )
rm package-lock.json
git pull
npm i
npm run build
;;
esac