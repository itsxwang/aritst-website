import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import allartWorksrouter from './router/artworkRouter';
import emailRouter from './router/emailRouter';
import verifyRouter from './router/verifyRouter';
import path from 'path';


dotenv.config({
  path: path.resolve(__dirname, '../../.env') // go up one directory
});



const app = express();

app.use(express.json());

app.use(cors());




const PORT = process.env.BACKEND_PORT;



app.use(allartWorksrouter);
app.use(emailRouter);
app.use(verifyRouter)


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
