#!/bin/bash

docker run -d --network host my-app:1.0

docker-compose -f docker-compose.yaml up