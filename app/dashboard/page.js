'use client'

import classes from './page.module.css';
import Box from '@/components/Box.js';
import {useState, useEffect} from 'react';

export default function Dashboard() {
    const [accountData, setAccountData] = useState(null);

    useEffect(() => {
        if (typeof localStorage === "object" && accountData === null) {
            setAccountData(JSON.parse(localStorage.getItem('accountData')));
        }
    }, [accountData])


    return <div>
        <h1>DASHBOARD</h1>
        <div className={classes.container}>
            <Box text="TA Mahasiswa yang diuji sebanyak" number={accountData && accountData.s_ta.length} />
            <Box text="Kerja Praktek Mahasiswa yang diuji sebanyak" number={accountData && accountData.s_kp.length} />
            <Box text="TA Mahasiswa yang dibimbing sebanyak" number={accountData && accountData.b_ta.length} />
            <Box text="Kerja Praktek Mahasiswa yang dibimbing sebanyak" number={accountData && accountData.b_kp.length} />
        </div>
        </div>
}