# Этап 1: Сборка и установка зависимостей
FROM node:20-alpine AS builder

# Устанавливаем инструменты, необходимые для компиляции bcrypt (node-gyp)
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (включая те, что требуют компиляции)
RUN npm ci

# Копируем исходный код
COPY . .

# Этап 2: Финальный производственный образ
FROM node:20-alpine AS production

# Создаем пользователя node (он уже есть в официальном образе, но убедимся в правах)
# В node:alpine пользователь node уже существует с UID 1000
USER node

WORKDIR /usr/src/app

# Копируем скомпилированные node_modules из этапа builder
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules

# Копируем исходный код
COPY --chown=node:node . .

# Указываем переменную окружения
ENV NODE_ENV=production

# Открываем порт (замените 3000 на ваш, если используется другой)
EXPOSE 3000

# Команда запуска (предполагается, что в package.json есть "start": "node src/index.js" или类似)
# Если ваш файл называется server.js, замените на node server.js
CMD ["npm", "start"]