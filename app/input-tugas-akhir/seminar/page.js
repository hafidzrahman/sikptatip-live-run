'use client'

import {useState, useEffect} from 'react';

import classes from './page.module.css';
import StudentStatusCount from '@/components/StudentStatusCount.js';
import Image from 'next/image';
import Table from '@/components/Table.js';
import Search from '@/components/Search.js';

export default function SeminarTA() {
    const [s_ta, set_s_ta] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    function totalFn(nilai) {
        const {sikapPresentasi, kemampuanPresentasi, relevansi, kesesuaian, teknik, tahapanAnalisa, tahapanPerancangan, produkPenelitian, hubungan} = nilai;
        const result = (+sikapPresentasi + +kemampuanPresentasi + +relevansi + +kesesuaian + +teknik + +tahapanAnalisa + +tahapanPerancangan + +produkPenelitian + +hubungan) / 9;
        return result;
    }

    const students = {
        total : undefined,
        rated : undefined,
        pending : undefined,
        notRated : undefined
    };

    if (s_ta) {
        students.total = s_ta.length;
        students.rated = s_ta.filter(mhs => mhs.status === "rated").length;
        students.pending = s_ta.filter(mhs => mhs.status === "pending").length;
        students.notRated = s_ta.filter(mhs => mhs.status === "not-rated").length;
    }


    useEffect(() => {
        if (typeof localStorage === 'object') {
            set_s_ta(JSON.parse(localStorage.getItem('accountData')).s_ta);
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
            <span className={classes['current-position']}>Seminar TA</span>
            </div>
            <h1 className={classes.title}>Input Nilai Seminar TA</h1>
            <StudentStatusCount  {...students}/>
            </div>
            <button>
                <Image src="/exclamation.png" width={41} height={41} alt="Exclamation Icon"/>
                <span>Laporkan Kesalahan</span>
                </button>
            </div>
            <Search onChange={(event) => setSearchInput(event.target.value)} value={searchInput}/>
            <Table tableData={s_ta ? s_ta.filter(mhs => mhs.nama.toLowerCase().includes(searchInput.toLowerCase()) || mhs.NIM.includes(searchInput)) : []} totalFn={totalFn}/>
    </>
}