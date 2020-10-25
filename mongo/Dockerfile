# step 1
FROM alpine

# step 2: install a software
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0

# step 2.1: configure that software
RUN mkdir -p /data/db
WORKDIR /data

# step 2.2 Setup mongo autentification
RUN mongod --fork --logpath /var/log/mongod.log && mongo admin --eval 'db.createUser({user: "my_Admin", pwd: "123zxc", roles: [{role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]});'

# step 3: set default commands
CMD ["mongod", "--auth"]