version: '2'

services:
  master:
    image: jenkins:latest
    environment:
      JAVA_OPTS: "-Djava.awt.headless=true"
    container_name: jenkins_eficode
    restart: always
    ports:
      - "50000:50000"
      - "8080:8080"
      - "25:25"
      - "587:587"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  jenkins_home: