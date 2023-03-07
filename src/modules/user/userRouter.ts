import { Router } from 'express';
import {
    userCreate,
    userIndex,
    userShow,
    userDelete,
    userUpdate
} from './userController.js';

export const userRouter = Router();

userRouter.get('/', userIndex);

userRouter.post('/', userCreate);

userRouter.get('/:user_id', userShow);

userRouter.delete('/:user_id', userDelete);

userRouter.put('/:user_id', userUpdate);
