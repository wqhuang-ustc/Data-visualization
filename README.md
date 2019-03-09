# Eficode2019_task

## Introduction
This is a repo for Solution of [Eficode2019_task](https://github.com/eficode/opendata-task-2019). <br/>
To visit website for the data visualization solution, visit [http://13.48.25.116:8081/](http://13.48.25.116:8081/). <br/>

## Prerequisites
To run this solution in your machine, you need to install [docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/). <br/>
After the instalization, first go to `Eficode2019/docker_folder/opendata_application/` directory to build the application image with 
`docker build --no-cache -t kylinhuang/opendata:latest .`,
then go to `Eficode2019/docker_folder/docker_compose/` directory and run `docker-compose up -d` to launch this application. Then you can visit [http://localhost:8081](http://localhost:8081) to explore more.

## Design of this opendata visualization solution

![opendata BlockDiagram](https://github.com/wqhuang-ustc/Eficode2019_task/blob/master/opendata.png)

### Frontend 
1. Frontend site will handle the display of data from 4 sensors in 4 separated line charts considering the fact that values of different sensors vary pretty much.
2. /api/updateData is designed to retrieve all processed data from the backend.
3. Two views are provided to view all historical data or recent 24 hours by two buttons. If the data is less than 24 hours, these two button will be hiden.

### Backend
1. Backend request `http://opendata.hopefully.works/api/events` to get new data every hour and store new data into a Mongodb database.
2. Upon request on `/api/updateData`from the frontend, the backend will process and return all data from a cached file(opendata.json) instead of retrieving all data from Mongodb. This is to reduce the potential pressure on Mongodb database if visitors of this application site increase to a certain number.
3. The cache file(opendata.json) is updated every hour by retrieving all the historical data stored in Mongodb.

## Deployment and simple DevOps
### Docker
The opendata solution codes is packaged in a docker image (`Eficode2019_task/docker_folder/opendata_application/Dockerfile`) so that it can be easily deployed into the aws ec2 with docker-compose. This application image is built upon a customized based image which contains the necessary environment including nodejs, git, yarn etc.

### Jenkins job
A jenkins job will be triggered by the webhook from github if a commit is pushed to this git repo in master branch. This jenkins job will build a new docker image with the latest code and redeploy the application in aws ec2 server. With this jenkins job, the process of development is more efficient.

