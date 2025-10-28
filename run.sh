#!/bin/bash

#should give how many to generate
if [ -z "$1" ]; then
  echo "Usage: ./run.sh <number>"
  exit 1
fi

node generate_users.mjs "$1"
