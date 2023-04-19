# SmikApp

Container Up
`docker-compose up -d`

Container Down
`docker-compose down`

Export Database
`docker run --rm -v smikapp:/data -v $(pwd):/backup busybox tar cvf /backup/database.tar /data`

Import Database
`docker run --rm -v myproject_db_data:/data -v $(pwd):/backup busybox tar xvf /backup/database.tar`