FROM node:20-alpine

WORKDIR /app

EXPOSE 80

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]