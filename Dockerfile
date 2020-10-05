FROM node:lts
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3004
CMD npm start
