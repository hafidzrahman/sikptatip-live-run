'use client'

import {useState, useEffect} from 'react';

import classes from './page.module.css';
import StudentStatusCount from '@/components/StudentStatusCount.js';
import Image from 'next/image';
import Table from '@/components/Table.js';
import Search from '@/components/Search.js';

export default function SeminarKP() {
    const [s_kp, set_s_kp] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    function totalFn(nilai) {
        const {sikap, penguasaanMateri, isiLaporan} = nilai;
        const result = (+sikap)*(20/100) + (+penguasaanMateri + +isiLaporan)*(40/100);
        return result;
    }

    const students = {
        total : undefined,
        rated : undefined,
        pending : undefined,
        notRated : undefined
    };

    if (s_kp) {
        students.total = s_kp.length;
        students.rated = s_kp.filter(mhs => mhs.status === "rated").length;
        students.pending = s_kp.filter(mhs => mhs.status === "pending").length;
        students.notRated = s_kp.filter(mhs => mhs.status === "not-rated").length;
    }


    useEffect(() => {
        if (typeof localStorage === 'object') {
            set_s_kp(JSON.parse(localStorage.getItem('accountData')).s_kp);
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
            <span className={classes['current-position']}>Seminar KP</span>
            </div>
            <h1 className={classes.title}>Input Nilai Seminar KP</h1>
            <StudentStatusCount  {...students}/>
            </div>
            <button>
                <Image src="/exclamation.png" width={41} height={41} alt="Exclamation Icon"/>
                <span>Laporkan Kesalahan</span>
                </button>
            </div>
            <Search onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
            <Table tableData={s_kp ? s_kp.filter(mhs => mhs.nama.toLowerCase().includes(searchInput.toLowerCase()) || mhs.NIM.includes(searchInput)) : []} totalFn={totalFn}/>
    </>
}