'use client'

import { usePathname } from "next/navigation";
import {useState, useEffect} from 'react';

import classes from '@/components/Layout.module.css';
import Menu from '@/components/Menu.js';
import Image from "next/image";
import Link from "next/link";


export default function Layout({children}) {
    const [accountData, setAccountData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const path = usePathname();

    useEffect(() => {

        if (typeof localStorage === 'object' && localStorage.getItem('accountData') && accountData === undefined) {
          setAccountData(JSON.parse(localStorage.getItem('accountData')));
        }
    
      }, [accountData])



      
    if (path.startsWith('/login')) {
        return children;
    } else if (path.startsWith('/') && accountData === null) {
        setAccountData(undefined);
    }

    return <div className="container">
    <div className={classes.navigation}>
        <div className={classes.account}>
            <Image src={accountData ? `/${accountData.photo}` : "/home.png"} width={40} height={40} alt="User Picture"/>
            <div className={classes.text}>
                <p>{accountData && accountData.username}</p>
                <p className={classes.line}></p>
                <p>{accountData && accountData.NIP}</p>
            </div>
        </div>
        <div className={classes.line}></div>
        <Menu icon="/home.png" link="/" active={path === "/" ? true : false}>Home</Menu>
        <Menu icon="/dashboard.png" link="/dashboard" active={path.startsWith('/dashboard') ? true : false}>Dashboard</Menu>
        <Menu icon="/checklist.png" onClick={() => {setIsExpanded(prevState => !prevState)}} active={path.startsWith('/input') ? true : false} v={<span className={classes.v}>{isExpanded ? "ʌ" : "v"}</span>}>Input Nilai</Menu>
        {isExpanded && <div className={classes.option}>
        <Menu icon="/checklist.png" link="/input-kerja-praktek" active={path.startsWith('/input-kerja-praktek') ? true : false}>Kerja Praktek</Menu>
        <Menu icon="/checklist.png" link="/input-tugas-akhir" active={path.startsWith('/input-tugas-akhir') ? true : false}>Tugas Akhir</Menu>
        </div> }
        <div className={classes['log-out']}><Link className={classes['log-out-link']} href="/log-out">LOG OUT</Link></div>
    </div>
    <div className="content">
        {children}
        </div>
    </div>
}