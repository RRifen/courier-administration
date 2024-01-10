FROM node:latest
WORKDIR /app
COPY public/ ./public
COPY src/ ./src
COPY package.json .
COPY tsconfig.json .

RUN npm install

CMD ["npm", "start"]