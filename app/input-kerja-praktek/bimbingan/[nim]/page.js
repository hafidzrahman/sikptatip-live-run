'use client'

import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

import classes from './page.module.css';
import InputNilai from '@/components/InputNilai';
import useInput from '@/custom-hook/useInput.js';
import { expiredChecker } from '@/utils';

export default function NimBimbinganKP({params}) {
    const [student, setStudent] = useState(null);
    const initialValue = useRef();

    const {inputValue : usahaValue, setInputValue : setUsahaValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : kreativitasValue, setInputValue : setKreativitasValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : tanggungJawabValue, setInputValue : setTanggungJawabValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : komunikasiValue, setInputValue : setKomunikasiValue} = useInput("", (value) => value > -1 && value < 101);
    
    const total = (+usahaValue + +kreativitasValue + +tanggungJawabValue + +komunikasiValue) / 4;
    
    useEffect(() => {
        if (typeof localStorage === "object") {
            const foundStudent = JSON.parse(localStorage.getItem('accountData')).b_kp.find(mhs => mhs.NIM === params.nim);
            initialValue.current = {};
            initialValue.current.value = (+foundStudent.nilai.usaha + +foundStudent.nilai.kreativitas + +foundStudent.nilai['tanggung-jawab'] + +foundStudent.nilai.komunikasi) / 4;
            initialValue.current.isCreated = false;
            setStudent(foundStudent)
            setUsahaValue(foundStudent.nilai.usaha);
            setKreativitasValue(foundStudent.nilai.kreativitas);
            setTanggungJawabValue(foundStudent.nilai['tanggung-jawab']);
            setKomunikasiValue(foundStudent.nilai.komunikasi);
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
                if (usahaValue && kreativitasValue && tanggungJawabValue && komunikasiValue) {
                    evaluatedStudent.status = 'rated';
                    accountData.history[0] = {description : `Anda telah menginputkan nilai Bimbingan KP ${student.nama} dengan nilai ${total}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else if (usahaValue || kreativitasValue || tanggungJawabValue || komunikasiValue) {
                    evaluatedStudent.status = 'pending'
                    accountData.history[0] = {description : `Anda telah menginputkan nilai pada beberapa aspek penilaian Bimbingan KP ${student.nama}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else {
                    evaluatedStudent.status = 'not-rated';
                }
                    initialValue.current.isCreated = true;
                } else if (total === initialValue.current.value && initialValue.current.isCreated) {
                    console.log("test1")
                    accountData.history.shift();
                    initialValue.current.isCreated = false;
                }

                evaluatedStudent.nilai.usaha = usahaValue;
                evaluatedStudent.nilai.kreativitas = kreativitasValue;
                evaluatedStudent.nilai['tanggung-jawab'] = tanggungJawabValue;
                evaluatedStudent.nilai.komunikasi = komunikasiValue;
                const index = accountData.b_kp.findIndex(mhs => mhs.NIM === student.NIM);
                accountData.b_kp[index] = {...evaluatedStudent};
                localStorage.setItem('accountData', JSON.stringify(accountData));
            },1500);
        }
        return () => clearTimeout(timer)
    }, [usahaValue, kreativitasValue, tanggungJawabValue, komunikasiValue, student, total]);

    if (student && expiredChecker(student.tenggatWaktu)) {
        return <h1>Expired!</h1>
    }

    return <>
    <p className={classes.title}>INPUT NILAI BIMBINGAN KERJA PRAKTEK</p>
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
    <InputNilai text="Usaha : " id="usaha" type="text" onChange={(e) => setUsahaValue(e.target.value)} value={usahaValue}/>
    <InputNilai text="Kreativitas : " id="kreativitas" type="text" onChange={(e) => setKreativitasValue(e.target.value)} value={kreativitasValue}/>
    <InputNilai text="Tanggung Jawab : " id="tanggungjawab" type="text" onChange={(e) => setTanggungJawabValue(e.target.value)} value={tanggungJawabValue}/>
    <InputNilai text="Komunikasi dengan dosen pembimbing : " id="komunikasi" type="text" onChange={(e) => setKomunikasiValue(e.target.value)} value={komunikasiValue}/>
    <InputNilai text="Total : " id="total" type="text" value={total} disabled/>
    </div>
    </>}
    </>
}