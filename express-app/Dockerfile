FROM node:latest
WORKDIR /app
COPY src/ ./src
COPY package.json .

RUN npm install

CMD ["npm", "start"]