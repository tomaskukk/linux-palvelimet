FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
ENV PORT=8080

COPY . .
EXPOSE 8080

CMD ["npm", "start"]
