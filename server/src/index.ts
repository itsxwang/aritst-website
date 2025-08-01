import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.get('/', (_req, res) => {
    res.send('Artist Website Backend is Running!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

