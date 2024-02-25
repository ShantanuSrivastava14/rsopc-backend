import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { userRoutes } from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
app.use(cookieParser());

