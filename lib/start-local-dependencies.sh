#!/usr/bin/env bash

currentPath=$PWD

if [[ -n $FORM_PROCESSOR_PATH ]]; then
    cd $FORM_PROCESSOR_PATH
    screen -dmS formProcessor source ./lib/run-dev.sh
fi

if [[ -n $SEARCH_PROCESSOR_PATH ]]; then
    cd $SEARCH_PROCESSOR_PATH
#    TODO write start up process for the search
#    screen -dmS searchProcessor npm start
fi

cd $currentPath
