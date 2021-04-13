#!/bin/bash

npm i --prefer-offline --no-audit && npm run build && nohup ./tsc-watch.sh > /dev/null 2>&1 && cd dist && nodemon gideon