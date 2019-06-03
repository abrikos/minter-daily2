#!/usr/bin/env bash
echo $1 $2
cd /home/abrikos/minter-daily2

case "${1}" in
"minute" )
node server/cron.js --minute >>minute.log
;;

"minute5" )
node server/cron.js --minute5 >>minute5.log
;;

"day" )
node server/cron.js --day>>day.log
;;

"hour" )
node server/cron.js --hour>>hour.log
rm package-lock.json
git pull
npm i
npm run build
;;
esac