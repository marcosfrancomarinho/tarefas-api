//@ts-check
import express from 'express';
import cors from 'cors';
import { Routers } from './presentation/routers/Routers.mjs';
import { HandlerError } from './presentation/middlewares/HandlerError.mjs';

const app = express();
const port = Number(process.env.PORT ?? '3000');

app.use(express.json());
app.use(cors());
Routers.start(app);
app.use(HandlerError.catch);


app.listen(port, () => console.log(`server online on port ${port}`));
