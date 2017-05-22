#!/usr/bin/env bash

server_already_running=false
server_pid=

function stop_server()
{
  if [[ $server_already_running = false ]]; then
    echo "Stopping server"
    kill "$server_pid"
  fi
}

function on_error() {
  # run if user hits control-c
  # stop server if it wasn't already up before tests
  echo -en "\n*** Tests failed!***\n"
  stop_server
}

# trap keyboard interrupt (control-c) or any other errors to stop server
# if started with test suite
trap on_error ERR SIGINT

function wait_for_server() {
  local timeout=40 #seconds
  local count=$((timeout/2))
  until { echo > /dev/tcp/localhost/3000; } 2>/dev/null; do
    if [[ $count -eq 0  ]]; then
      return 1
    fi
    sleep 2;
    echo "Remaining attempts to connect to server: $count"
    count=$((count-1))
  done
}

function run_integration_tests() {

  if exec 6<>/dev/tcp/127.0.0.1/3000; then
    server_already_running=true
    echo "Server is already running,using app running on port 3000 for tests"
  else
    echo "Server is not running locally, starting server for integration tests"
    node lib/server.js &
    server_pid=$!
    wait_for_server || { echo "Server startup timedout"; stop_server; exit 1; }
  fi
  exec 6>&- # close output connection
  exec 6<&- # close input connection

  node lib/run-integration-tests.js
  stop_server
}

run_integration_tests
