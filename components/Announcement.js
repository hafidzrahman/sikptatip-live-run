'use client'

import { useState, useEffect } from 'react';

import classes from './Announcement.module.css';
import Image from 'next/image';
import AnnouncementItem from '@/components/AnnouncementItem.js';



export default function Announcement() {
  const [announcementData, setAnnouncementData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function() {
      const dataJSON = await fetch('/api');
      const data = await dataJSON.json();
      setAnnouncementData(data);
      setIsLoading(false);
    })();
  },[])

    return <div className={classes.announcement}>
    <div className={classes.header}>
      <Image src="/megaphone.png" width={30} height={30} alt="Megaphone"/> <span className={classes['header-text']}>Pengumuman</span>
    </div>
    <div className={classes.content}>
      {isLoading && <p style={{textAlign: 'center'}}>Loading...</p>}
      {!isLoading && announcementData.length === 0 && <p style={{textAlign: 'center'}}>No Announcement Yet.</p>}
      {!isLoading && announcementData.length > 0 && <ul>
        {announcementData.map((announcement, i) => <AnnouncementItem {...announcement} key={i+302432532}/>)}
        </ul>}
    </div>
    </div>
}