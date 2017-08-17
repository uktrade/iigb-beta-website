#!/usr/bin/env bash

resetTrue="n";
reset="";
resetPaths="";

useLocalTrue="y";
useLocal="";


if [[ -n $BASE_IIGB_URL ]] && [[ -n $PORT ]] && [[ -n $HTTPS_PORT ]] && [[ -n $IIGB_SEARCH ]] && [[ -n $DIT_ENV ]]; then
    while [[ -z $reset ]]
    do
        echo -n "Use existing environment variables [y/n]?"
        read reset
        if [[ -z $reset ]]; then
            echo "You must select y/n"
        fi
    done
    if [ $reset == $resetTrue ]; then
        source ./lib/set-env-vars.sh
    else
        echo "Using existing environment variables"
    fi
else
    echo "Some environment variables need setting"
    source ./lib/set-env-vars.sh
fi

while [[ -z $useLocal ]]
do
    echo -n "Use local dependencies [y/n]?"
    read useLocal
    if [[ -z $useLocal ]]; then
        echo "You must select y/n"
    fi
done
if [[ $useLocal == $useLocalTrue ]]; then
    if [[ -n $FORM_PROCESSOR_PATH ]] && [[ -n $SEARCH_PROCESSOR_PATH ]]; then
        while [[ -z $resetPaths ]]
        do
            echo -n "Use existing dependency paths [y/n]?"
            read resetPaths
            if [[ -z $resetPaths ]]; then
                echo "You must select y/n"
            fi
        done
        if [ $resetPaths == $resetTrue ]; then
            source ./lib/set-dependency-paths.sh
        else
            echo "Using existing dependency paths"
        fi
    else
        echo "Path to the sites dependencies need setting"
        source ./lib/set-dependency-paths.sh
    fi
    source ./lib/start-local-dependencies.sh
fi

echo "Starting server"
#npm run dev
