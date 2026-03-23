docker build -t my-express-app .
docker run -d -p 3000:3000 --env-file .env my-express-app
docker-compose up --build -d

docker-compose --env-file .env.docker up --build