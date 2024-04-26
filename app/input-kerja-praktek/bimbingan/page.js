'use client'

import {useState, useEffect} from 'react';

import classes from './page.module.css';
import StudentStatusCount from '@/components/StudentStatusCount.js';
import Image from 'next/image';
import Table from '@/components/Table.js';
import Search from '@/components/Search.js';

export default function BimbinganKP() {
    const [b_kp, set_b_kp] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const students = {
        total : undefined,
        rated : undefined,
        pending : undefined,
        notRated : undefined
    };

    function totalFn(nilai) {
        const {usaha, kreativitas, komunikasi} = nilai;
        const result = ((+usaha + +kreativitas + +nilai['tanggung-jawab'] + +komunikasi) / 4);
        return result;
    }

    if (b_kp) {
        students.total = b_kp.length;
        students.rated = b_kp.filter(mhs => mhs.status === "rated").length;
        students.pending = b_kp.filter(mhs => mhs.status === "pending").length;
        students.notRated = b_kp.filter(mhs => mhs.status === "not-rated").length;
    }


    useEffect(() => {
        if (typeof localStorage === 'object') {
            set_b_kp(JSON.parse(localStorage.getItem('accountData')).b_kp);
        }
    },[])

    return <>
        <div className={classes.wrapper}>
            <div>
        <div className={classes.position}>
            <span>Input Nilai</span>
            <span className={classes.arrow}>{`>`}</span>
            <span>KP</span>
            <span className={classes['arrow-second']}>{`>`}</span>
            <span className={classes['current-position']}>Bimbingan KP</span>
            </div>
            <h1 className={classes.title}>Input Nilai Bimbingan KP</h1>
            <StudentStatusCount  {...students}/>
            </div>
            <button>
                <Image src="/exclamation.png" width={41} height={41} alt="Exclamation Icon"/>
                <span>Laporkan Kesalahan</span>
                </button>
            </div>
            <Search onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
            <Table tableData={b_kp ? b_kp.filter(mhs => mhs.nama.toLowerCase().includes(searchInput.toLowerCase()) || mhs.NIM.includes(searchInput)) : []} totalFn={totalFn}/>
    </>
}