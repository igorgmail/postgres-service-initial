# пересобираем и запускаем все контейнеры (postgres и app)
docker compose -f docker-compose.yaml up -d --build

# пересобираем и запускаем postgres
docker compose up postgres -d --build

# пересобираем и запускаем app
docker compose up app -d --build

# пересобираем и запускаем сервис db-setup (drop and seed db)
docker compose -f docker-compose.yaml up db-setup -d --build
