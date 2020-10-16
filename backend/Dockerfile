# step 1
FROM node:alpine

VOLUME [ "/app" ]
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]
