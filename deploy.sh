#!/bin/bash 

yarn build && scp -r ./build/* ubuntu@IP-ADDRESS:/home/ubuntu/www/my-app
