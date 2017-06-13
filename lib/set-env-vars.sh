#!/usr/bin/env bash
echo "Setting environment variables"

# Set variables to either current or default values
if [[ -n $BASE_IIGB_URL ]]; then
    defaultSiteURL=$BASE_IIGB_URL;
else
    defaultSiteURL=http://localhost:3000;
fi

if [[ -n $PORT ]]; then
    defaultPort=$PORT;
else
    defaultPort=3000;
fi

if [[ -n $HTTPS_PORT ]]; then
    defaultHttpsPort=$HTTPS_PORT;
else
    defaultHttpsPort=5555;
fi

if [[ -n $IIGB_SEARCH ]]; then
    defaultSearch=$IIGB_SEARCH;
else
    defaultSearch=https://5dle4b7qu3.execute-api.eu-west-1.amazonaws.com/prod;
fi

if [[ -n $DIT_ENV ]]; then
    defaultEnv=$DIT_ENV;
else
    defaultEnv=development;
fi

if [[ -n $SUBDOMAIN ]]; then
    defaultSubdomain=$SUBDOMAIN;
else
    defaultSubdomain=;
fi

#Get the user(dev) to set the variable values for the current environment.
echo "Set the environment variables for where you are running the service [Default value]"
echo -n "Enter base url for the site [$defaultSiteURL] > "
read baseURL
if [[ -n $baseURL ]]; then
    export BASE_IIGB_URL=$baseURL
else
    export BASE_IIGB_URL=$defaultSiteURL
fi

echo -n "Enter port for the site [$defaultPort] > "
read port
if [[ -n $port ]]; then
    export PORT=$port
else
    export PORT=$defaultPort
fi

echo -n "Enter HHTPs port for the site [$defaultHttpsPort] > "
read httpPort
if [[ -n $httpPort ]]; then
    export HTTPS_PORT=$httpPort
else
    export HTTPS_PORT=$defaultHttpsPort
fi

echo -n "Enter search url for the site [$defaultSearch] > "
read search
if [[ -n $search ]]; then
    export IIGB_SEARCH=$search
else
    export IIGB_SEARCH=$defaultSearch
fi

echo -n "Enter environment name for the site [$defaultEnv] > "
read env
if [[ -n $env ]]; then
    export DIT_ENV=$env
else
    export DIT_ENV=$defaultEnv
fi

echo -n "Enter subdomain for the environment [$defaultSubdomain] > "
read subdomain
if [[ -n $subdomain ]]; then
    export SUBDOMAIN=$subdomain
else
    export SUBDOMAIN=$defaultSubdomain
fi
