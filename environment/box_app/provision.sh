#!/bin/bash

# install nginx
sudo apt-get update
sudo apt-get install nginx -y

# install nodejs
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

sudo npm install -g pm2

sudo rm /etc/nginx/sites-available/default
sudo cp /home/ubuntu/app/environment/box_app/templates/default /etc/nginx/sites-available/default
sudo service nginx reload

