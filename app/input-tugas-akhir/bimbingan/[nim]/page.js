'use client'

import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

import classes from './page.module.css';
import InputNilai from '@/components/InputNilai';
import useInput from '@/custom-hook/useInput.js';
import { expiredChecker } from '@/utils';

export default function NimBimbinganTA({params}) {
    const [student, setStudent] = useState(null);
    const initialValue = useRef();

    const {inputValue : motivasiDanSemangatValue, setInputValue : setMotivasiDanSemangatValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : tanggungJawabTAValue, setInputValue : setTanggungJawabTAValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : keuletanDalamPenelitianValue, setInputValue : setKeuletanDalamPenelitianValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : ketepatanWaktuValue, setInputValue : setKetepatanWaktuValue} = useInput("", (value) => value > -1 && value < 101);
    
    const total = (+motivasiDanSemangatValue + +tanggungJawabTAValue + +keuletanDalamPenelitianValue + +ketepatanWaktuValue) / 4;
    
    useEffect(() => {
        if (typeof localStorage === "object") {
            const foundStudent = JSON.parse(localStorage.getItem('accountData')).b_ta.find(mhs => mhs.NIM === params.nim);
            initialValue.current = {};
            initialValue.current.value = (+foundStudent.nilai.motivasiDanSemangat + +foundStudent.nilai['tanggung-jawabTA'] + +foundStudent.nilai.keuletanDalamPenelitian + +foundStudent.nilai.ketepatanWaktu) / 4;
            initialValue.current.isCreated = false;
            setStudent(foundStudent)
            setMotivasiDanSemangatValue(foundStudent.nilai.motivasiDanSemangat);
            setTanggungJawabTAValue(foundStudent.nilai['tanggung-jawabTA']);
            setKeuletanDalamPenelitianValue(foundStudent.nilai.keuletanDalamPenelitian);
            setKetepatanWaktuValue(foundStudent.nilai.ketepatanWaktu);
        }
        
    },[])

    useEffect(() => {
        let timer;
        if (typeof localStorage === "object" && student) {
            timer = setTimeout(function() {
                const accountData = JSON.parse(localStorage.getItem('accountData'));
                const evaluatedStudent = {...student};

                if (total !== initialValue.current.value && !initialValue.current.isCreated) {
                    accountData.history.unshift({});
                    const present = new Date()
                if (motivasiDanSemangatValue  && tanggungJawabTAValue && keuletanDalamPenelitianValue && tanggungJawabTAValue) {
                    evaluatedStudent.status = 'rated';
                    accountData.history[0] = {description : `Anda telah menginputkan nilai Bimbingan TA ${student.nama} dengan nilai ${total}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else if (motivasiDanSemangatValue || tanggungJawabTAValue || keuletanDalamPenelitianValue || tanggungJawabTAValue) {
                    evaluatedStudent.status = 'pending'
                    accountData.history[0] = {description : `Anda telah menginputkan nilai pada beberapa aspek penilaian Bimbingan TA ${student.nama}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else {
                    evaluatedStudent.status = 'not-rated';
                }
                    initialValue.current.isCreated = true;
                } else if (total === initialValue.current.value && initialValue.current.isCreated) {
                    accountData.history.shift();
                    initialValue.current.isCreated = false;
                }
                

                evaluatedStudent.nilai.motivasiDanSemangat = motivasiDanSemangatValue;
                evaluatedStudent.nilai['tanggung-jawabTA'] = tanggungJawabTAValue;
                evaluatedStudent.nilai.keuletanDalamPenelitian = keuletanDalamPenelitianValue;
                evaluatedStudent.nilai.ketepatanWaktu = ketepatanWaktuValue;
                const index = accountData.b_ta.findIndex(mhs => mhs.NIM === student.NIM);
                accountData.b_ta[index] = {...evaluatedStudent};
                localStorage.setItem('accountData', JSON.stringify(accountData));
            },1500);
        }
        return () => clearTimeout(timer)
    }, [motivasiDanSemangatValue, , tanggungJawabTAValue, keuletanDalamPenelitianValue, tanggungJawabTAValue]);

    if (student && expiredChecker(student.tenggatWaktu)) {
        return <h1>Expired!</h1>
    }

    return <>
    <p className={classes.title}>INPUT NILAI BIMBINGAN TUGAS AKHIR</p>
    {student && <><div className={classes.profile}>
        <Image src={`/${student.photo}`} width={100} height={100} alt="Student Picture" />
        <div className={classes.text}>
            <p>{student.nama}</p>
            <p>{student.NIM}</p>
        </div>
    </div>
    <div className={classes['judul-ta']}><p>JUDUL TA : </p><p>{student.judul}</p></div>
    <p className={classes.penilaian}>Penilaian : </p>
    <div className={classes['input-wrapper']}>
    <InputNilai text="Motivasi dan Semangat : " id="motivasiDanSemangat" type="text" onChange={(e) => setMotivasiDanSemangatValue(e.target.value)} value={motivasiDanSemangatValue}/>
    <InputNilai text="keuletan Dalam Penelitian : " id="keuletanDalamPenelitian" type="text" onChange={(e) => setKeuletanDalamPenelitianValue(e.target.value)} value={keuletanDalamPenelitianValue}/>
    <InputNilai text="Ketepatan waktu penelitian sesuai jadwal : " id="ketepatanWaktu" type="text" onChange={(e) => setKetepatanWaktuValue(e.target.value)} value={ketepatanWaktuValue}/>
    <InputNilai text="Tanggung Jawab : " id="tanggungjawabTA" type="text" onChange={(e) => setTanggungJawabTAValue(e.target.value)} value={tanggungJawabTAValue}/>
    <InputNilai text="Total : " id="total" type="text" value={total} disabled/>
    </div>
    </>}
    </>
}