FROM node:latest

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD npm run dev
