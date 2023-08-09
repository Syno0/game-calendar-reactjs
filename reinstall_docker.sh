#!/bin/bash

sudo docker build -t game-calendar-reactjs .
sudo docker container stop game-calendar-reactjs
sudo docker container rm game-calendar-reactjs
sudo docker-compose up -d
sleep 1
sudo docker image prune -af