# step 1
FROM node:alpine

VOLUME [ "/backend_app" ]
WORKDIR /backend_app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .

CMD /wait && npm run start
