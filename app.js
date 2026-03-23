import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from "./db.js";
import models from './models/index.js';
import router from "./router/mainrouter.js"
import swaggerUi from 'swagger-ui-express';
import error_middleware from './middlewares/error-middleware.js';
import cookieParser from "cookie-parser";
import yaml from 'js-yaml';
import fs from 'fs';

let PORT = process.env.PORT || 8000;

const app = express();

const swaggerDocument = yaml.load(fs.readFileSync('./swagger/swagger.yaml', 'utf8'));

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error_middleware);

async function Start_App(){

    try{
        await sequelize.authenticate();
        await sequelize.sync(); // почитать чё делает, для прода опасно
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        console.log(`Swagger доступен по адресу: http://localhost:${PORT}/api-docs`);
    } catch(error){
        console.error("Error to start app connect: " + error);
        // console.error(error.stack);
        // process.exit(1);
    }
}

// Start_App()
Start_App().then(() => console.log("Приложение запущено успешно!"));
