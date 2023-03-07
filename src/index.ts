import express, { Express, Request, Response } from 'express';
import { userRouter } from './modules/user/userRouter.js';

const server: Express = express();
const PORT = 3333;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/user', userRouter);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

