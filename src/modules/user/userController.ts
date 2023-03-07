import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { IUser } from '../../interfaces/IUser.js';
import { deleteUserFs, readerUsersFs, createUserFs, updateUserFs } from '../../models/userModel.js';


enum STATUS_MESSAGE {
    USER_NOT_FOUND = 'User not found',
    USER_CREATED = 'User created',
    USER_DELETED = 'User deleted',
    USER_UPDATED = 'User updated',
};


enum MESSAGE_INVALID_REQUEST {
    INVALID_BODY = 'Invalid body'
};


export const userIndex = async (req: Request, res: Response) => {
    const users: string = await readerUsersFs();
    res.status(200).json(users);
}


const isNotBodyValid = (body: IUser): boolean => {

    if (!body.name || !body.email || !body.id || !body.user_uuid) {
        return true;
    }
    return false;
}


const createDate = (d: Date): string => {

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }

    return new Intl.DateTimeFormat("default", options).format(d).replace(',', ' -');
}


export const userCreate = async (req: Request, res: Response) => {
    const { name, email, } = req.body;
    const user_uuid: string = randomUUID();
    const created_at: string = createDate(new Date());
    const users: IUser[] = await readerUsersFs();

    const user: IUser = {
        id: users.length + 1,
        name,
        email,
        user_uuid,
        created_at,
        updated_at: ''
    };


    if (isNotBodyValid(user)) {
        res.status(500).json({ message: MESSAGE_INVALID_REQUEST.INVALID_BODY });
        return;
    }

    await createUserFs(user)
    res.status(200).json({ message: STATUS_MESSAGE.USER_CREATED, data: user });
    return;
}


export const userShow = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const users: IUser[] = await readerUsersFs();

    const user = users.find(({ user_uuid, id }) => [user_uuid, id.toString()].includes(user_id));

    if (!user) {
        res.status(200).json({ message: STATUS_MESSAGE.USER_NOT_FOUND });
        return;
    }

    res.status(200).json({ data: user });
}


export const userDelete = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const users: IUser[] = await readerUsersFs();

    const userIndex = users.findIndex(({ user_uuid, id }) => [user_uuid, id.toString()].includes(user_id));

    if (userIndex === -1) {
        res.status(404).json({ message: STATUS_MESSAGE.USER_NOT_FOUND });
        return;
    }

    users.splice(userIndex, 1);
    await deleteUserFs(users as any)
    res.status(200).json({ message: STATUS_MESSAGE.USER_DELETED });
}


export const userUpdate = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { name, email } = req.body;
    const updated_at: string = createDate(new Date());
    const users: IUser[] = await readerUsersFs();
    const userIndex = users.findIndex(({ user_uuid, id }) => [user_uuid, id.toString()].includes(user_id));

    const user: IUser = {
        ...users[userIndex],
        name,
        email,
    };


    if (userIndex === -1) {
        res.status(404).json({ message: STATUS_MESSAGE.USER_NOT_FOUND });
        return;
    }

    if (isNotBodyValid(user)) {
        res.status(200).json({ message: MESSAGE_INVALID_REQUEST.INVALID_BODY });
        return;
    }

    users[userIndex] = { ...users[userIndex], name, email, updated_at };

    await updateUserFs(users as any)

    res.status(200).send({ message: STATUS_MESSAGE.USER_UPDATED, data: users[userIndex] });

}
