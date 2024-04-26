'use client'

import Image from "next/image";

import classes from './History.module.css';

import { dateWithClock } from "@/utils";

import { useState, useEffect } from "react";

export default function History() {
  const [accountData, setAccountData] = useState({});


  useEffect(() => {

    if (typeof localStorage === 'object') {
      setAccountData(JSON.parse(localStorage.getItem('accountData')));
    }

  }, [])

    return <div className={classes.history}>
    <div className={classes.header}>
      <Image src="/history.png" width={20} height={20} alt="Clock"/> <span className={classes['header-text']}>Riwayat</span>
    </div>
    <div className={classes.content}>
      <ul>
        {accountData.history && accountData.history.map((h,i) => <li key={i}>
          <p>{h.description}</p>
          <p className={classes.date}>{dateWithClock(h.date)}</p>
          </li>)}
      </ul>
    </div>
    </div>
}