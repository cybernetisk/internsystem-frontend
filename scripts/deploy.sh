#!/bin/bash

# generating new key:
# $ ssh-keygen -t rsa -b 4096 -C "internsystem-frontend@travis" -f travis-key -N ''
# $ travis encrypt-file travis-key
# references: http://docs.travis-ci.com/user/encrypting-files/

# set working directory to the directory of this script
cd "$(dirname "$0")"

# exit on errors
set -e

if [ ! -z "$TRAVIS" ]; then
  echo "Decrypting ssh-key and adding"
  openssl aes-256-cbc -K $encrypted_806d415ae242_key -iv $encrypted_806d415ae242_iv -in travis-key.enc -out travis-key -d
  chmod 600 travis-key
  eval "$(ssh-agent)"
  ssh-add travis-key
fi

echo "Running remote SSH-script"
ssh -o StrictHostKeyChecking=no root@in.cyb.no /bin/bash << EOF
  set -e
  cd ~/drift/internsystem-frontend
  ./update.sh
EOF

echo "Deploy finished"
