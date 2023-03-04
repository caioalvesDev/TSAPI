import express, {Express, Request, Response} from 'express';

const server:Express = express();
const PORT = 3333;

server.get('/', (req: Request, res:Response) => {
    res.send('Hello World');
})

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);

})


