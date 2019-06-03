#!/bin/bash
cd /home/abrikos/abrikos.pro
git pull
if [ ! -f ./build/index.html ]; then
    /usr/bin/node scripts/build.js
fi