'use client'

import Card from "@/components/Card.js";
import classes from "./page.module.css";
import {useState, useEffect} from 'react';

export default function TugasAkhir() {
    const [accountData, setAccountData] = useState(null);

    const student_b_ta = {
        total : 0,
        rated : 0,
        pending : 0,
        notRated : 0
    }

    const student_s_ta = {
        total : 0,
        rated : 0,
        pending : 0,
        notRated : 0
    }

    if (accountData) {
        const {b_ta, s_ta} = accountData;
        student_b_ta.total = b_ta.length;
        student_b_ta.rated = b_ta.filter(mhs => mhs.status === "rated").length;
        student_b_ta.pending = b_ta.filter(mhs => mhs.status === "pending").length;
        student_b_ta.notRated = b_ta.filter(mhs => mhs.status === "not-rated").length;

        student_s_ta.total = s_ta.length;
        student_s_ta.rated = s_ta.filter(mhs => mhs.status === "rated").length;
        student_s_ta.pending = s_ta.filter(mhs => mhs.status === "pending").length;
        student_s_ta.notRated = s_ta.filter(mhs => mhs.status === "not-rated").length;
    }

    useEffect(() => {
        if (typeof localStorage === "object") {
            setAccountData(JSON.parse(localStorage.getItem('accountData')))
        }
    },[])
    

    return <div>
    <h1>Input Nilai Kerja Praktek</h1>
    <div className={classes.container}>
        <Card href="/input-tugas-akhir/bimbingan" src="/b_ta.jpg" title="Nilai Bimbingan Tugas Akhir" student={accountData ? student_b_ta : {}}/>
        <Card href="/input-tugas-akhir/seminar" src="/s_ta.jpg" title="Nilai Seminar Tugas Akhir" student={accountData ? student_s_ta : {}}/>
    </div>
    </div>
}