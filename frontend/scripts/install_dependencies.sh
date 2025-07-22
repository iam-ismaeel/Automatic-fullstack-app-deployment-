#!/bin/bash

# Fail the script if any command fails
# set -e

# echo "Updating package lists..."
# sudo yum update -y

echo "Installing Node.js..."
# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 20.15.0

echo "Installing PM2..."
# Install PM2 to manage the Next.js application process
npx yarn global add pm2

echo "Server dependencies installed successfully."
