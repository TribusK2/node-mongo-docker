cd common
sh update-all-models.sh

cd ../backend
sh build.sh

cd ../mongo
sh build.sh