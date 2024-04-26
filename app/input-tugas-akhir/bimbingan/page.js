'use client'

import {useState, useEffect} from 'react';

import classes from './page.module.css';
import StudentStatusCount from '@/components/StudentStatusCount.js';
import Image from 'next/image';
import Table from '@/components/Table.js';
import Search from '@/components/Search.js';

export default function BimbinganTA() {
    const [b_ta, set_b_ta] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    function totalFn(nilai) {
        const {motivasiDanSemangat, keuletanDalamPenelitian, ketepatanWaktu} = nilai;
        const result = (+motivasiDanSemangat + +keuletanDalamPenelitian + +ketepatanWaktu + +nilai['tanggung-jawabTA']) / 4;
        return result;
    }

    const students = {
        total : undefined,
        rated : undefined,
        pending : undefined,
        notRated : undefined
    };

    if (b_ta) {
        students.total = b_ta.length;
        students.rated = b_ta.filter(mhs => mhs.status === "rated").length;
        students.pending = b_ta.filter(mhs => mhs.status === "pending").length;
        students.notRated = b_ta.filter(mhs => mhs.status === "not-rated").length;
    }


    useEffect(() => {
        if (typeof localStorage === 'object') {
            set_b_ta(JSON.parse(localStorage.getItem('accountData')).b_ta);
        }
    },[])

    return <>
        <div className={classes.wrapper}>
            <div>
        <div className={classes.position}>
            <span>Input Nilai</span>
            <span className={classes.arrow}>{`>`}</span>
            <span>TA</span>
            <span className={classes['arrow-second']}>{`>`}</span>
            <span className={classes['current-position']}>Bimbingan TA</span>
            </div>
            <h1 className={classes.title}>Input Nilai Bimbingan TA</h1>
            <StudentStatusCount  {...students}/>
            </div>
            <button>
                <Image src="/exclamation.png" width={41} height={41} alt="Exclamation Icon"/>
                <span>Laporkan Kesalahan</span>
                </button>
            </div>
            <Search onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
            <Table tableData={b_ta ? b_ta.filter(mhs => mhs.nama.toLowerCase().includes(searchInput.toLowerCase()) || mhs.NIM.includes(searchInput)) : []} totalFn={totalFn}/>
    </>
}