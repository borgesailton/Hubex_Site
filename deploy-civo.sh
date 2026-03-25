#!/bin/bash
# Run this script on your new Civo VM to prepare it for deployment

echo "Updating system..."
sudo apt-update && sudo apt upgrade -y

echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

echo "Installing Docker Compose..."
sudo apt-get install docker-compose-plugin -y

echo "Creating application directory..."
sudo mkdir -p /opt/hubex/data/uploads
sudo chown -R $USER:$USER /opt/hubex

echo "Copying docker-compose and nginx.conf..."
# Note: You should manually upload your .env, docker-compose.yml and nginx.conf to /opt/hubex

echo "Setup complete! Now configure GitHub Actions secrets:"
echo "SERVER_IP = $(curl -s ifconfig.me)"
echo "SERVER_USER = root (or your username)"
echo "SERVER_SSH_KEY = (your private ssh key)"
