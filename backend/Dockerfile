# step 1
FROM node:alpine

VOLUME [ "/backend_app" ]
WORKDIR /backend_app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]
