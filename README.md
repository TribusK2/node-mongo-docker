# 1. Start project

## 1.1. Setup environment
Download Docker from https://www.docker.com/

## 1.2. Build project
In the main direction run
```
sh build.sh
docker-compose up -d
```

## 1.3. Test the project
Go to url `http://localhost:8090/api/blog` in the browser.

# 2. Shared model
## 2.1. Common model
Common shared interfaces are in folder `./common/model/`. Run `sh update-all-models.sh` in `./common/` folder to updeate all apps models (backend, frontend, ...). This command will take all files from common folder and override their instances or create new ones (if don't exist) in all destination folders.<br>

It will not remove any files from destination folders, so run command with flag `--force` or `-f` (e.g. `sh update-all-models.sh --force`) if You want to make exact copys of the model from the common folder.

## 2.2. App's instance of model
In app model folder (e.g. `./backend/model/` or `./frontend/model/`) there is an app's instance of shared interfaces. Run command `sh update-common-model.sh` in app model folder to update common shared interfaces. This command will take all files from app model folder and override their instances or create new ones (if don't exist) in common folder.<br>

Deleting files in app model folder will not take any effect on common folder, so You have to delete it manually if You want it.

# 3. Logs
All logs from backend are logged in their console. Use command `docker logs -f my_backend_service` in terminal to view them.<br>

Error logs of the running server are stored in the external file `./logs/backend/errors.log` in separate Docker volume and will be accessible even if all containers down. File will create automatically when backend container start.

# 4. Database
App use Mongo database which is stored in folder `./dbs/mongo` as Docker volume. This allow to keep database after all docker containers down. App will automatically connect Docker's keeped database base on configuration in `./docker-compose.yaml` file.<br>

Stop All Docker containers and remove folder `./dbs/mongo` to clear database, e.g. by PowerShell with command `Remove-Item ./mongo -Recurse -Force` inside `./dbs/` directory (You will need admin permissions). New clear instance of the database will create automatically after call command `docker-compose up -d`.<br>

All JS scripts required on startup the database (e.g. create a user) are in file `./dbs/mongo-entrypoint/entrypoint.js`.

# 5. Debugger
Project is configured to connect VSCode debugger with the Docker containers in the development mode.<br>

It is required to config launch.json as follows:
```
"configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Docker: backend",
            "port": 9090,
            "address": "localhost",
            "localRoot": "${workspaceFolder}/backend",
            "remoteRoot": "/backend_app",
        }
    ]
```