FROM nginx:stable-alpine
FROM node:18.16.0-alpine
WORKDIR /runtogether/src/app
COPY package*.json ./

#
RUN npm install
RUN npm install axios
RUN npm install swiper

COPY . .
CMD [ "npm", "run","start" ]
