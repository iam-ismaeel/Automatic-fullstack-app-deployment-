#!/bin/bash

# Fail the script if any command fails
set -e

echo "Building the Next.js application..."
cd /var/www/AZANY-FE-2024

echo "Cleaning up untracked files..."
git clean -fd

echo "Stashing local changes..."
git stash --include-untracked

echo "Pulling latest changes from deploy branch..."
git pull origin deploy --rebase

echo "Installing Next.js dependencies..."
npx yarn install

echo "Copying env from S3..."
aws s3 cp s3://azany-env/prod/fe.env ./.env

echo "Checking pm2 status..."
/root/.nvm/versions/node/v20.15.0/bin/pm2 list

echo "Building the application..."
npx yarn build

echo "Attempting to restart the pm2 process with ID 0..."
/root/.nvm/versions/node/v20.15.0/bin/pm2 restart 0 || \
/root/.nvm/versions/node/v20.15.0/bin/pm2 start "npx yarn start" --name frontend -- start

echo "Next.js application started successfully."
