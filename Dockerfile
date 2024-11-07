# Используем официальный образ Node.js
FROM node:20.18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install && apk update && apk upgrade

RUN npm install -g nodemon
# Копируем все файлы в контейнер
COPY . .

# Указываем порт, который будет использован
EXPOSE 3000

# Команда для запуска сервера
CMD [ "node", "src/app.js" ]
