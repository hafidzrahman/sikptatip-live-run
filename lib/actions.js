'use server'

import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'node:fs'
import path from 'node:path';

export async function loginActionForm(prevState, formData) {
    const filePath = path.join(process.cwd(), 'db', 'accounts.json');
    const readedFile = fs.readFileSync(filePath);
    const accountData = JSON.parse(readedFile);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');
    const account = accountData.find(account => enteredUsername === account.username && enteredPassword === account.password);
    if (!account) return;
    cookies().set('session', 'test');
    return account;
}

export async function logoutActionForm() {
    cookies().delete('session')
    redirect('/login')
}