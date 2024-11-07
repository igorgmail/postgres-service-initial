# postgres-service-initial
initial service configuration, with docker compose

### Содержание
> Проект содержит 3 сервиса :
-	**postgres** - создает базу данных
-	**app** - приложение с ORM Sequelize которое будет взаимодействовать с БД
-	**db-setup** - удаляет БД, создает БД снова и наполняет ее seeders

### Порядок запуска

#### Если нужно "засеят базу" seeders.

1.	Создаем БД
```bash
docker compose up postgres -d --build
```

2. Наполняем ее :
```bash
docker compose up db-setup -d --build
```

3. И если необходимо запускаем контейнер с приложением
```bash
docker compose up app -d --build
```


#### Если нужно просто запустить 2 контейнера (с БД и app)

```bash
docker compose -f docker-compose.yaml up -d --build
```

