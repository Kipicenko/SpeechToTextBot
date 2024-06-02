FROM node:20-alpine

WORKDIR /app

EXPOSE 80

COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable && yarn install

COPY . .

CMD ["yarn", "start"]