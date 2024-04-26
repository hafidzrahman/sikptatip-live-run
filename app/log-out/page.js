'use client'

import classes from './page.module.css'
import {logoutActionForm} from '@/lib/actions.js';

export default function LogOut() {

    async function handleOnSubmit() {
        let result = await fetch('/api', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(localStorage.getItem('accountData'))});
        result = await result.json();
        console.log(result.message);
        localStorage.removeItem('accountData');
        
    }

    return <div className={classes['log-out-container']}>
        <div className={classes['log-out-box']}>
            <form action={logoutActionForm} onSubmit={handleOnSubmit}>
            <p>ANDA YAKIN LOG OUT?</p>
            <button type='submit'>LOG OUT!</button>
            </form>
        </div>
    </div>
}