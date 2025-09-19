FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

CMD ["npm", "run", "dev"]
