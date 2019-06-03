#!/usr/bin/env bash
echo $1 $2
cd /home/abrikos/minter-daily2

case "${1}" in
"minute" )
node server/cron.js --minute >>log/minute.log.txt
;;

"minute5" )
node server/cron.js --minute5 >>log/minute5.log.txt
;;

"day" )
node server/cron.js --day>>log/day.log.txt
;;

"hour" )
node server/cron.js --hour>>log/hour.log.txt
rm package-lock.json
git pull
npm i
npm run build
;;
esac