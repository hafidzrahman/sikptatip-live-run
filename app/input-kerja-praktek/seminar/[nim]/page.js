'use client'

import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

import classes from './page.module.css';
import InputNilai from '@/components/InputNilai';
import useInput from '@/custom-hook/useInput.js';
import { expiredChecker } from '@/utils';

export default function NimSeminarKP({params}) {
    const [student, setStudent] = useState(null);
    const initialValue = useRef();

    const {inputValue : sikapValue, setInputValue : setSikapValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : penguasaanMateriValue, setInputValue : setPenguasaanMateriValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : isiLaporanValue, setInputValue : setIsiLaporanValue} = useInput("", (value) => value > -1 && value < 101);
    
    const total = ((+sikapValue)*(20/100) + (+penguasaanMateriValue + +isiLaporanValue)*(40/100));
    
    useEffect(() => {
        if (typeof localStorage === "object") {
            const foundStudent = JSON.parse(localStorage.getItem('accountData')).s_kp.find(mhs => mhs.NIM === params.nim);
            initialValue.current = {};
            initialValue.current.value = (+foundStudent.nilai.sikap)*(20/100) + (+foundStudent.nilai.penguasaanMateri + +foundStudent.nilai.isiLaporan)*(40/100);
            initialValue.current.isCreated = false;
            setStudent(foundStudent)
            setSikapValue(foundStudent.nilai.sikap);
            setPenguasaanMateriValue(foundStudent.nilai.penguasaanMateri);
            setIsiLaporanValue(foundStudent.nilai.isiLaporan);
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
                if (sikapValue && penguasaanMateriValue && isiLaporanValue) {
                    evaluatedStudent.status = 'rated';
                    accountData.history[0] = {description : `Anda telah menginputkan nilai Seminar KP ${student.nama} dengan nilai ${total}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else if (sikapValue || penguasaanMateriValue || isiLaporanValue) {
                    evaluatedStudent.status = 'pending'
                    accountData.history[0] = {description : `Anda telah menginputkan nilai pada beberapa aspek penilaian Seminar KP ${student.nama}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else {
                    evaluatedStudent.status = 'not-rated';
                }

                    initialValue.current.isCreated = true;
                } else if (total === initialValue.current.value && initialValue.current.isCreated) {
                    accountData.history.shift();
                    initialValue.current.isCreated = false;
                }
                

                evaluatedStudent.nilai.sikap = sikapValue;
                evaluatedStudent.nilai.penguasaanMateri = penguasaanMateriValue;
                evaluatedStudent.nilai.isiLaporan = isiLaporanValue;
                const index = accountData.s_kp.findIndex(mhs => mhs.NIM === student.NIM);
                accountData.s_kp[index] = {...evaluatedStudent};
                localStorage.setItem('accountData', JSON.stringify(accountData));
            },1500);
        }
        return () => clearTimeout(timer)
    }, [sikapValue, penguasaanMateriValue, isiLaporanValue]);

    if (student && expiredChecker(student.tenggatWaktu)) {
        return <h1>Expired!</h1>
    }

    return <>
    <p className={classes.title}>INPUT NILAI SEMINAR KERJA PRAKTEK</p>
    {student && <><div className={classes.profile}>
        <Image src={`/${student.photo}`} width={100} height={100} alt="Student Picture" />
        <div className={classes.text}>
            <p>{student.nama}</p>
            <p>{student.NIM}</p>
        </div>
    </div>
    <div className={classes['judul-kp']}><p>JUDUL KP : </p><p>{student.judul}</p></div>
    <p className={classes.penilaian}>Penilaian : </p>
    <div className={classes['input-wrapper']}>
    <InputNilai text="Sikap (20% :" id="sikap" type="text" onChange={(e) => setSikapValue(e.target.value)} value={sikapValue}/>
    <InputNilai text={
    <ul style={{listStyle : 'none'}}>
        <li>{`Penguasaan Materi (40% :`}</li>
        <li>-Bahan presentasi</li>
        <li>-Ketepatan waktu</li>
        <li>-Pemahaman terhadap materi</li>
        <li>-Pemahaman terhadap materi pendukung</li>
        </ul>} id="penguasaanMateri" type="text" onChange={(e) => setPenguasaanMateriValue(e.target.value)} value={penguasaanMateriValue}/>
    <InputNilai text={
        <ul style={{listStyle : 'none'}}>
            <li>{`Isi Laporan (40%) : `}</li>
            <li>-Format dan kualitas laporan</li>
        </ul>
    } id="isiLaporan" type="text" onChange={(e) => setIsiLaporanValue(e.target.value)} value={isiLaporanValue}/>
    <InputNilai text="Total : " id="total" type="text" value={total} disabled/>
    </div>
    </>}
    </>
}