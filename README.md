# Как запустить сервис в docker?

`docker-compose --env-file .env.docker up --build`

**На каких портах будет работать сервис?**

:5432 - для базы данных

:8000 - для самого приложения

#### Ссылка на документацию (работает после запуска контейнера!)
http://localhost:8000/api-docs/#/Auth/post_api_logout


### Хламовник (сюда не смотреть)
`docker build -t my-express-app .`

`docker run -d -p 3000:3000 --env-file .env my-express-app`

`docker-compose up --build -d`