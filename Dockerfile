FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.10.0

COPY . .

CMD ["node", "./src/index.js"]