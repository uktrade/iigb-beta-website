#!/usr/bin/env bash

echo "Setting dependencies paths"

if [[ -n $FORM_PROCESSOR_PATH ]]; then
    defaultFormPath=$FORM_PROCESSOR_PATH;
fi

if [[ -n $SEARCH_PROCESSOR_PATH ]]; then
    defaultSearchPath=$SEARCH_PROCESSOR_PATH;
fi

echo "Set the paths for local dependencies (leave blank if using remotes) [Default value]"
echo -n "Enter path for the form processor [$defaultFormPath] > "
read formPath
if [[ -n $formPath ]]; then
    export FORM_PROCESSOR_PATH=$formPath
else
    export FORM_PROCESSOR_PATH=$defaultFormPath
fi

echo -n "Enter port for the site [$defaultSearchPath] > "
read searchPath
if [[ -n $searchPath ]]; then
    export SEARCH_PROCESSOR_PATH=$searchPath
else
    export SEARCH_PROCESSOR_PATH=$defaultSearchPath
fi
