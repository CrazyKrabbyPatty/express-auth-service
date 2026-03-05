import 'dotenv/config';
import express from 'express';
import pg from 'pg';

let PORT = 5000;

const app = express();

app.use(express.json());

// console.log(process.env)

async function Start_App(){
    let Client = new pg.Client({
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
    })

    try{
        await Client.connect();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(error){
        console.log("Error to bd connect " + error)
    }
}

Start_App();
