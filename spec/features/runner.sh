screen -dmS selenium-driver java -jar selenium-server-standalone-2.53.0.jar
node_modules/.bin/wdio conf/local.conf.js
screen -X -S selenium-driver quit