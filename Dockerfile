FROM node:16

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /app/
RUN yarn install

COPY . /myfolder/

CMD yarn start:dev