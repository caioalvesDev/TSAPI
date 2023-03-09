import { readFileSync, writeFileSync } from 'fs';
import { IUser } from '../interfaces/IUser';

const filePath = './database_json/users.json'

export const readerUsersFs = async (): Promise<object | any > => {
    try {
        const data = readFileSync(filePath, { encoding: 'utf-8' });
        console.log('success in reading file');
        return JSON.parse(data);
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const createUserFs = async (user: IUser): Promise<void> => {
    try {
        const users = await readerUsersFs();
        users.push(user);
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully created');

    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const deleteUserFs = async (users: IUser): Promise<void> => {
    try {
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully deleted');
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const updateUserFs = async (users: IUser[]): Promise<void> => {
    try {
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully updated');
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

