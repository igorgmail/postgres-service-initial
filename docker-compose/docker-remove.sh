# Удаление всех контейнеров(всех сервисов postgres и app) 
docker compose -f docker-compose.yaml down -v

# Удаление db-setup
docker compose down db-setup -v

# Удаление postgres
docker compose down postgres -v

# Удаление app
docker compose down app -v