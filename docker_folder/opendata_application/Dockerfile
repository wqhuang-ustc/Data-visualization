FROM kylinhuang/eficode_base:latest
LABEL MAINTAINER="Weiqing Huang <wqhuang.ustc@gmail.com>"
RUN git clone https://github.com/Jessie1201/D3-react-vis.git;
WORKDIR /D3-react-vis
RUN yarn; yarn build
CMD yarn start
