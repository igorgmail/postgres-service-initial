# start postgres
docker compose -f docker-compose.yaml -d start postgres

# start приложения app
docker compose -f docker-compose.yaml -d start app

# Запуск сервиса удаления БД и создании новой и засеиваем seeders
docker compose --profile setup up db-setup -d