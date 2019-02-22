FROM kylinhuang/eficode_base:latest
LABEL MAINTAINER="Weiqing Huang <wqhuang.ustc@gmail.com>"
RUN git clone https://github.com/wqhuang-ustc/Eficode2019_task.git;
WORKDIR /Eficode2019_task/opendata-application
RUN yarn; yarn build
CMD yarn start
