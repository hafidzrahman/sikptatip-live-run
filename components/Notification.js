'use client'

import Image from "next/image";

import classes from './Notification.module.css';

import { useState, useEffect } from "react";

export default function Notification() {
  const [accountData, setAccountData] = useState({});


  useEffect(() => {

    if (typeof localStorage === 'object') {
      setAccountData(JSON.parse(localStorage.getItem('accountData')));
    }

  }, [])

    return <div className={classes.notification}>
    <div className={classes.header}>
      <Image src="/bell.png" width={20} height={20} alt="Bell"/> <span className={classes['header-text']}>Notifikasi</span>
    </div>
    <div className={classes.content}>
      <ul>
      {accountData.notification && accountData.notification.map((notif,i) => <li key={i}>
          <p>{notif.description}</p>
          <p className={classes.date}>{notif.date}</p>
          </li>)}
      </ul>
    </div>
    </div>
}