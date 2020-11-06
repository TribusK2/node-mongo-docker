# Start project

## 1. Setup environment
Download Docker from https://www.docker.com/

## 2. Build project
In the main direction run
```
sh build.sh
docker-compose up -d
```

## 3. Test project
Go to url `http://localhost:8090/` in the browser.

# Shared files
Shared files are in `./common/`.
In the main direction run command `sh update-model.sh` to update model interfaces in on all required apps (fronted, backend, ...).
Shared model interfaces for backend and frontend are in folder `./common/model/`.

# Logs
All logs from backend are logged in their console. Error logs are stored in the external file `./logs/backend/errors.log` in separate Docker volume and will be accessible if all containers down.