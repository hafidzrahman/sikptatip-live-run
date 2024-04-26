'use client'

import classes from './page.module.css';
import LoginInput from '@/components/LoginInput';
import {loginActionForm} from '@/lib/actions.js'
import {useFormState} from 'react-dom';
import { useEffect} from 'react';
import { redirect } from 'next/navigation';

export default function Login() {
    const [state, dispatch] = useFormState(loginActionForm, null);

    if (state && typeof localStorage === 'object') {
        localStorage.setItem('accountData', JSON.stringify(state));
    }

    useEffect(() => {
        if (state) {
            redirect('/')
        }
    },[state])

    let loadedUsername = "";
    let loadedPassword = "";

    if (typeof localStorage === 'object' && localStorage.getItem('userInfo')) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    loadedUsername = userInfo.username;
    loadedPassword = userInfo.password;
    }
    function handleOnSubmit(event) {
        const fd = new FormData(event.target);
        const {username, password, rememberMe} = Object.fromEntries(fd.entries());
        if (rememberMe) {
            localStorage.setItem('userInfo', JSON.stringify({username, password}))
        } else {
            localStorage.removeItem('userInfo')
        }
    }

    return <main className={classes.main}>
    <section className={classes['login-form']}>
        <form action={dispatch} onSubmit={handleOnSubmit}>
        <div className={classes['input-group']}>
            <LoginInput labelName="Username: " inputName="username" id="username" type="text" value={loadedUsername}/>
            <LoginInput labelName="Password: " inputName="password" id="password" type="password" value={loadedPassword}/>
        </div>
        <div>
        <div className={classes['button-group']}>
            <button type='submit'>LOGIN</button>
            <button>FORGOT PASSWORD</button>
            <div className={classes.checkbox}>
            <input type='checkbox' id="rememberMe" name="rememberMe" value="true" defaultChecked={true}/>
            <label htmlFor='rememberMe'>Remember Me</label>
            </div>
            </div>  
        </div>
        </form>
    </section>
    </main>
}