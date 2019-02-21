FROM mysql:latest
LABEL MAINTAINER="Weiqing Huang <wqhuang.ustc@gmail.com>"
ENV MYSQL_ROOT_PASSWORD=eficode2019
COPY setup.sh /mysql/setup.sh
COPY sql/*.sql /mysql/
#设置容器启动时执行的命令
CMD ["sh", "/mysql/setup.sh"]
