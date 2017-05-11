#!/usr/bin/env bash

server_already_running=false
server_pid=

function stop_server()
{
  # run if user hits control-c
  # stop server if it wasn't already up before tests
  echo -en "\n*** Tests failed!***\n"
  if [[ $server_already_running = false ]]; then
    echo "Stopping server"
    kill "$server_pid"
  fi

}

# trap keyboard interrupt (control-c) or any other errors to stop server
# if started with test suite
trap stop_server ERR SIGINT

function wait_for_server() {
  timeout 40 bash -c 'until { echo > /dev/tcp/localhost/3000; } 2>/dev/null; do sleep 2; done'
}

function run_integration_tests() {

  if exec 6<>/dev/tcp/127.0.0.1/3000; then
    server_already_running=true
    echo "Server is already running,using app running on port 3000 for tests"
  else
    echo "Server is not runnung locally, starting server for integration tests"
    node lib/server.js &
    server_pid=$!
    wait_for_server || { echo "Server startup timedout"; stop_server; exit 1; }
  fi
  exec 6>&- # close output connection
  exec 6<&- # close input connection

  node_modules/.bin/wdio conf/single.conf.js
}

run_integration_tests
