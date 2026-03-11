import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from "./db.js";
import User from "./models/user-model.js";
import pg from 'pg';

let PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

// console.log(process.env)

async function Start_App(){
    // let Client = new pg.Client({
    //     user: process.env.PG_USER,
    //     password: process.env.PG_PASSWORD,
    //     host: process.env.PG_HOST,
    //     port: process.env.PG_PORT,
    //     database: process.env.PG_DATABASE,
    // })

    try{
        // await Client.connect();
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(error){
        console.log("Error to start app connect: " + error)
    }
}

Start_App().then(() => console.log("Приложение запущено успешно!"));
