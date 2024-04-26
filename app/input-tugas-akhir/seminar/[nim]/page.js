'use client'

import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

import classes from './page.module.css';
import InputNilai from '@/components/InputNilai';
import useInput from '@/custom-hook/useInput.js';
import { expiredChecker } from '@/utils';

export default function NimSeminarTA({params}) {
    const [student, setStudent] = useState(null);
    const initialValue = useRef();

    const {inputValue : sikapPresentasiValue, setInputValue : setSikapPresentasiValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : kemampuanPresentasiValue, setInputValue : setKemampuanPresentasiValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : relevansiValue, setInputValue : setRelevansiValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : kesesuaianValue, setInputValue : setKesesuaianValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : teknikValue, setInputValue : setTeknikValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : tahapanAnalisaValue, setInputValue : setTahapanAnalisaValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : tahapanPerancanganValue, setInputValue : setTahapanPerancanganValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : produkPenelitianValue, setInputValue : setProdukPenelitianValue} = useInput("", (value) => value > -1 && value < 101);
    const {inputValue : hubunganValue, setInputValue : setHubunganValue} = useInput("", (value) => value > -1 && value < 101);
    
    const total = (+sikapPresentasiValue + +kemampuanPresentasiValue + +relevansiValue + +kesesuaianValue + +teknikValue + +tahapanAnalisaValue + +tahapanPerancanganValue + +produkPenelitianValue + +hubunganValue) / 9;
    
    useEffect(() => {
        if (typeof localStorage === "object") {
            const foundStudent = JSON.parse(localStorage.getItem('accountData')).s_ta.find(mhs => mhs.NIM === params.nim);
            initialValue.current = {};
            initialValue.current.value = (+foundStudent.nilai.sikapPresentasi + +foundStudent.nilai.kemampuanPresentasi + +foundStudent.nilai.relevansi + +foundStudent.nilai.kesesuaian + +foundStudent.nilai.teknik + +foundStudent.nilai.tahapanAnalisa + +foundStudent.nilai.tahapanPerancangan + +foundStudent.nilai.produkPenelitian + +foundStudent.nilai.hubungan) / 9;
            initialValue.current.isCreated = false;
            setStudent(foundStudent)
            setSikapPresentasiValue(foundStudent.nilai.sikapPresentasi);
            setKemampuanPresentasiValue(foundStudent.nilai.kemampuanPresentasi);
            setRelevansiValue(foundStudent.nilai.relevansi);
            setKesesuaianValue(foundStudent.nilai.kesesuaian);
            setTeknikValue(foundStudent.nilai.teknik);
            setTahapanAnalisaValue(foundStudent.nilai.tahapanAnalisa);
            setTahapanPerancanganValue(foundStudent.nilai.tahapanPerancangan);
            setProdukPenelitianValue(foundStudent.nilai.produkPenelitian);
            setHubunganValue(foundStudent.nilai.hubungan);

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
                if (sikapPresentasiValue && kemampuanPresentasiValue && relevansiValue && kesesuaianValue && teknikValue && tahapanAnalisaValue && tahapanPerancanganValue && produkPenelitianValue && hubunganValue) {
                    evaluatedStudent.status = 'rated';
                    accountData.history[0] = {description : `Anda telah menginputkan nilai Seminar TA ${student.nama} dengan nilai ${total}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else if (sikapPresentasiValue || kemampuanPresentasiValue || relevansiValue || kesesuaianValue || teknikValue || tahapanAnalisaValue || tahapanPerancanganValue || produkPenelitianValue || hubunganValue) {
                    evaluatedStudent.status = 'pending'
                    accountData.history[0] = {description : `Anda telah menginputkan nilai pada beberapa aspek penilaian Seminar TA ${student.nama}`, date : {date : `${present.getFullYear()}-${present.getMonth()}-${present.getDate()}`, time : {hour : present.getHours(), minute : present.getMinutes()}}};
                } else {
                    evaluatedStudent.status = 'not-rated';
                }

                    initialValue.current.isCreated = true;
                } else if (total === initialValue.current.value && initialValue.current.isCreated) {
                    accountData.history.shift();
                    initialValue.current.isCreated = false;
                }
                

                evaluatedStudent.nilai.sikapPresentasi = sikapPresentasiValue;
                evaluatedStudent.nilai.kemampuanPresentasi = kemampuanPresentasiValue;
                evaluatedStudent.nilai.relevansi = relevansiValue;
                evaluatedStudent.nilai.kesesuaian = kesesuaianValue;
                evaluatedStudent.nilai.teknik = teknikValue;
                evaluatedStudent.nilai.tahapanAnalisa = tahapanAnalisaValue;
                evaluatedStudent.nilai.tahapanPerancangan = tahapanPerancanganValue;
                evaluatedStudent.nilai.produkPenelitian = produkPenelitianValue;
                evaluatedStudent.nilai.hubungan = hubunganValue;
                const index = accountData.s_ta.findIndex(mhs => mhs.NIM === student.NIM);
                accountData.s_ta[index] = {...evaluatedStudent};
                localStorage.setItem('accountData', JSON.stringify(accountData));
            },1500);
        }
        return () => clearTimeout(timer)
    }, [sikapPresentasiValue, kemampuanPresentasiValue, relevansiValue, kesesuaianValue, teknikValue, tahapanAnalisaValue, tahapanPerancanganValue, produkPenelitianValue, hubunganValue]);

    if (student && expiredChecker(student.tenggatWaktu)) {
        return <h1>Expired!</h1>
    }

    return <>
    <p className={classes.title}>INPUT NILAI SEMINAR TUGAS AKHIR</p>
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
        <div>
    <InputNilai specialClass={classes['special-class']} text="Sikap (Attitude) Presentasi" id="sikapPresentasi" type="text" onChange={(e) => setSikapPresentasiValue(e.target.value)} value={sikapPresentasiValue}/>
    <InputNilai specialClass={classes['special-class']} text="Kemampuan Presentasi" id="kemampuanPresentasi" type="text" onChange={(e) => setKemampuanPresentasiValue(e.target.value)} value={kemampuanPresentasiValue}/>
    <InputNilai specialClass={classes['special-class']} text="Relevansi Referensi dengan Judul Penelitian" id="relevansi" type="text" onChange={(e) => setRelevansiValue(e.target.value)} value={relevansiValue}/>
    <InputNilai specialClass={classes['special-class']} text="Kesesuaian Metodologi Penelitian dengan Pembahasan" id="kesesuaian" type="text" onChange={(e) => setKesesuaianValue(e.target.value)} value={kesesuaianValue}/>
    <InputNilai specialClass={classes['special-class']} text="Teknik Pengumpulan data sesuai Standar Laporan TA" id="teknik" type="text" onChange={(e) => setTeknikValue(e.target.value)} value={teknikValue}/>
    </div>
    <div>
    <InputNilai specialClass={classes['special-class']} text="Tahapan Analisa sesuai Standar Laporan TA" id="tahapanAnalisa" type="text" onChange={(e) => setTahapanAnalisaValue(e.target.value)} value={tahapanAnalisaValue}/>
    <InputNilai specialClass={classes['special-class']} text="Tahapan Perancangan sesuai Standar Laporan TA" id="tahapanPerancangan" type="text" onChange={(e) => setTahapanPerancanganValue(e.target.value)} value={tahapanPerancanganValue}/>
    <InputNilai specialClass={classes['special-class']} text="Produk Penelitian sesuai Standar Laporan TA" id="produkPenelitian" type="text" onChange={(e) => setProdukPenelitianValue(e.target.value)} value={produkPenelitianValue}/>
    <InputNilai specialClass={classes['special-class']} text="Hubungan Permasalahan dengan Hasil Penelitian" id="hubungan" type="text" onChange={(e) => setHubunganValue(e.target.value)} value={hubunganValue}/>
    <InputNilai specialClass={classes['special-class']} text="Total : " id="total" type="text" value={total} disabled/>
    </div>
    </div>
    </>}
    </>
}