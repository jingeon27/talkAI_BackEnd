FROM node:16-alpine

COPY ./package.json /talkai/
COPY ./yarn.lock /talkai/
WORKDIR /talkai/
RUN yarn install

COPY . /talkai/

CMD yarn start:prod