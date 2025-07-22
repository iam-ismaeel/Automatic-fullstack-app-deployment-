#!/bin/bash

# Fail the script if any command fails
set -e

echo "Building the Next.js application..."
cd /var/www/AZANY-FE-2024

echo "Cleaning up untracked files..."
git clean -fd

echo "Stashing local changes..."
git stash --include-untracked

git pull origin staging

echo "Installing Next.js dependencies..."
#cd /var/www/AZANY-FE-2024
npx yarn install

# copy env from s3
aws s3 cp s3://azany-env/staging/fe.env ./.env

#echo "Stop PM2 processes before build..."
#/root/.nvm/versions/node/v20.15.0/bin/pm2 stop all || true

# Build new changes
npx yarn build

# Attempt to restart the pm2 process with id 0, if it fails, start the process
/root/.nvm/versions/node/v20.15.0/bin/pm2 restart 0 || /root/.nvm/versions/node/v20.15.0/bin/pm2 start "npx yarn start" --name frontend -- start

echo "Next.js application started successfully."
