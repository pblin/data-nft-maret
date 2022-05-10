FROM node:10.15.3-alpine

WORKDIR /app

COPY . /app

RUN echo ${NODE_ENV}
WORKDIR /app/client 
RUN yarn 
RUN yarn build
WORKDIR /app/server 
RUN yarn add node-ts
RUN yarn 

ENTRYPOINT  ["yarn"]
CMD ["run", "start:server"]
