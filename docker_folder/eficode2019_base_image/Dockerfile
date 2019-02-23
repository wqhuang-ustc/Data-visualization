FROM ubuntu:16.04
LABEL MAINTAINER="Weiqing Huang <wqhuang.ustc@gmail.com>"
RUN apt-get update && apt-get install -y sudo
RUN sudo apt-get update && sudo apt-get -y install curl vim
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && sudo apt-get install -y --force-yes apt-transport-https python-software-properties
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt-get install -y python-software-properties build-essential
RUN sudo apt-get update && sudo apt-get install -y yarn && sudo apt install nodejs
#install pm2
RUN npm install pm2 -g
#install nginx
RUN sudo apt-get install -y nginx
#install git
RUN sudo apt-get install -y git
