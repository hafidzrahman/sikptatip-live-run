'use client'

import Card from "@/components/Card.js";
import classes from "./page.module.css";
import {useState, useEffect} from 'react';

export default function KerjaPraktek() {
    const [accountData, setAccountData] = useState(null);

    const student_b_kp = {
        total : 0,
        rated : 0,
        pending : 0,
        notRated : 0
    }

    const student_s_kp = {
        total : 0,
        rated : 0,
        pending : 0,
        notRated : 0
    }

    if (accountData) {
        const {b_kp, s_kp} = accountData;
        student_b_kp.total = b_kp.length;
        student_b_kp.rated = b_kp.filter(mhs => mhs.status === "rated").length;
        student_b_kp.pending = b_kp.filter(mhs => mhs.status === "pending").length;
        student_b_kp.notRated = b_kp.filter(mhs => mhs.status === "not-rated").length;

        student_s_kp.total = s_kp.length;
        student_s_kp.rated = s_kp.filter(mhs => mhs.status === "rated").length;
        student_s_kp.pending = s_kp.filter(mhs => mhs.status === "pending").length;
        student_s_kp.notRated = s_kp.filter(mhs => mhs.status === "not-rated").length;
    }

    useEffect(() => {
        if (typeof localStorage === "object") {
            setAccountData(JSON.parse(localStorage.getItem('accountData')))
        }
    },[])
    

    return <div>
    <h1>Input Nilai Kerja Praktek</h1>
    <div className={classes.container}>
        <Card href="/input-kerja-praktek/bimbingan" src="/b_kp.jpg" title="Nilai Bimbingan Kerja Praktek" student={accountData ? student_b_kp : {}}/>
        <Card href="/input-kerja-praktek/seminar" src="/s_kp.jpg" title="Nilai Seminar Kerja Praktek" student={accountData ? student_s_kp : {}}/>
    </div>
    </div>
}