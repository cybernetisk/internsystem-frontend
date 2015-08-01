#!/bin/bash

set -e

if [[ "$USER" != "django" ]]; then
  echo "Du må være logget inn som brukeren 'django' for å kjøre dette!"
  exit 1
fi

git pull origin master

cd "$(dirname "$0")"/..

npm install
gulp build
