#!/usr/bin/env bash

if [[ -n $BROWSERSTACK_USERNAME ]]; then
    currentBrowserstackUsername=$BROWSERSTACK_USERNAME;
fi

if [[ -n $currentBrowserstackUsername ]]; then
    echo -n "Enter your BrowserStack account username [Current = $currentBrowserstackUsername ]> "
    read browserstackUsername
else
    echo -n "Enter your BrowserStack account username > "
    read browserstackUsername
fi
if [[ -n $browserstackUsername ]]; then
    export BROWSERSTACK_USERNAME=$browserstackUsername
else
    export BROWSERSTACK_USERNAME=$currentBrowserstackUsername
fi

echo -n "Enter your BrowserStack password > "
read -s browserstackPassword
export BROWSERSTACK_PASSWORD=$browserstackPassword

