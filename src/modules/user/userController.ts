import { Request, Response } from 'express';
import { randomUUID } from 'crypto'


export interface IUser {
    id: string | number,
    name: string
    email: string
    user_uuid: string
}

enum STATUS_MESSAGE {
    USER_NOT_FOUND = 'User not found',
    USER_CREATED = 'User created',
    USER_DELETED = 'User deleted',
}

enum MESSAGE_INVALID_REQUEST {
    INVALID_BODY = 'Invalid body'
}

const users: IUser[] = [];

export const userIndex = async (req: Request, res: Response) => {
    res.status(200).json({data: users})
}


const isNotBodyValid = (body: IUser): boolean => {

    if (!body.name || !body.email || !body.id || !body.user_uuid){
        return true
    }
    return false;
}



export const userCreate = async (req: Request, res: Response) => {
    const { name, email, } = req.body;

    const user_uuid = randomUUID();

    const user: IUser = {
        id: users.length + 1,
        name,
        email,
        user_uuid
    }

    if (isNotBodyValid(user)) {
        res.status(200).json({message: MESSAGE_INVALID_REQUEST.INVALID_BODY})
        return
    }

    users.push( user )
    res.status(200).json({message: STATUS_MESSAGE.USER_CREATED, data: user})
    return
}


export const userShow = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = users.find(({ user_uuid }) => user_uuid === user_id)

    if (!user) {
        res.status(200).json({message: STATUS_MESSAGE.USER_NOT_FOUND})
        return
    }

    res.status(200).json({data: user})
}


export const userDelete = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const userIndex = users.findIndex(({ user_uuid }) => user_uuid === user_id);

    if (userIndex === -1 ) {
        res.status(404).json({message: STATUS_MESSAGE.USER_NOT_FOUND})
        return
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: STATUS_MESSAGE.USER_DELETED })

}
