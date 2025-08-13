import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongodbStore from 'connect-mongodb-session';
import session from 'express-session';
import cors from 'cors';
import allartWorksrouter from './router/artworkRouter';
import path from 'path';


dotenv.config({
  path: path.resolve(__dirname, '../../.env') // go up one directory
});

const store = new (MongodbStore(session))({
    uri: process.env.MONGO_URI!,
    collection: 'sessions'
});

const app = express();

app.use(express.json());

app.use(cors());


app.use(session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    store

}))

const PORT = process.env.BACKEND_PORT;



app.use(allartWorksrouter);


mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port http://localhost:" + PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
        console.log(process.env.DB_PATH);
    });
