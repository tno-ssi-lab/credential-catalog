FROM node:lts

RUN apt-get update && apt-get install -y \
    python \
    build-essential

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --dev

COPY . .

EXPOSE 8080

CMD yarn serve
