# 1. Start project

## 1.1. Setup environment
Download Docker from https://www.docker.com/

## 1.2. Build project
In the main direction run
```
sh build.sh
docker-compose up -d
```

## 1.3. Test project
Go to url `http://localhost:8090/` in the browser.

# 2. Shared model
## 2.1. Common model
Common shared interfaces are in folder `./common/model/`. Run `sh update-all-models.sh` in `./common/` folder to updeate all apps models (backend, frontend, ...). This command will take all files from common folder and override their instances or create new ones (if don't exist) in all destination folders. It will not remove any files from destination folders, so run command with flag `--force` or `-f` (e.g. `sh update-all-models.sh --force`) if You want to make exact copy of the model from the common folder.

## 2.2. App instance of model
In app model folder (e.g. `./backend/model/` or `./frontend/model/`) there is an app's instance of shared interfaces. Run command `sh update-common-model.sh` in app model folder to update common shared interfaces. This command will take all files from app model folder and override their instances or create new ones (if don't exist) in common folder. Deleting files in app model folder will not take any effect on common folder, so You have to delete it manually if You want it.

# 3. Logs
All logs from backend are logged in their console. Error logs are stored in the external file `./logs/backend/errors.log` in separate Docker volume and will be accessible if all containers down.