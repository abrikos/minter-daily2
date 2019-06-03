#!/usr/bin/env bash
DIR=`dirname $0`

case  $1 in
    minute)
        echo "Minute job"
        node ${DIR}/fetch-crypto-pairs.js
        node ${DIR}/get-transactions.js
        node ${DIR}/totes.js
        ;;
    hour)
        echo "Hour job"

        ;;
esac