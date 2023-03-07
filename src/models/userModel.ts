import { readFileSync, writeFileSync } from 'fs';
import { IUser } from '../interfaces/IUser';

export const readerUsersFs = async () => {
    try {
        const data = readFileSync('db_json/users.json', { encoding: 'utf-8' });
        console.log('success in reading file');
        return JSON.parse(data);
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const createUserFs = async (user: IUser) => {
    try {
        const filePath = 'db_json/users.json';
        const users = await readerUsersFs();
        users.push(user);
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully created');

    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const deleteUserFs = async (users: IUser) => {
    try {
        const filePath = 'db_json/users.json';
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully deleted');
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

export const updateUserFs = async (users: IUser) => {
    try {
        const filePath = 'db_json/users.json';
        writeFileSync(filePath, JSON.stringify(users, null, 2), { encoding: 'utf-8' });
        console.log('successfully updated');
    } catch (err) {
        console.log(`Ocorreu um erro: ${err}`);
    }
}

