#!/bin/bash

# Fail the script if any command fails
set -e

echo "Validating Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Exiting."
    exit 1
fi

echo "Validating PM2 installation..."
if ! command -v /root/.nvm/versions/node/v20.15.0/bin/pm2 &> /dev/null
then
    echo "PM2 is not installed. Exiting."
    exit 1
fi

echo "All services are validated successfully."
