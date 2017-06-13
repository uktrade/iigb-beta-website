#!/usr/bin/env bash

touch ./localServerErrors

resetTrue="n";

if [[ -n $BASE_IIGB_URL ]] && [[ -n $PORT ]] && [[ -n $HTTPS_PORT ]] && [[ -n $IIGB_SEARCH ]] && [[ -n $DIT_ENV ]] &&
    [[ -n $BROWSERSTACK_USERNAME ]] && [[ -n $BROWSERSTACK_ACCESS_KEY ]]; then
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
        source ./lib/set-test-envs.sh
    else
        echo "Using existing environment variables"
    fi
else
    echo "Some environment variables need setting"
    source ./lib/set-env-vars.sh
    source ./lib/set-test-envs.sh
fi

echo "Running tests"
#npm run test
