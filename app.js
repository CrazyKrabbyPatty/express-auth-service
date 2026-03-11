import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from "./db.js";
import models from './models/index.js';
import router from "./router/mainrouter.js"

let PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

async function Start_App(){

    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(error){
        console.log("Error to start app connect: " + error)
    }
}

Start_App().then(() => console.log("Приложение запущено успешно!"));
