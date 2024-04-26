'use client'

import Link from 'next/link';
import classes from './TableData.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { deadline, expiredChecker } from '@/utils';

export default function Table({no, photo, nama, NIM, tenggatWaktu, status, total}) {
    const path = usePathname();
    const {stringDate, day} = deadline(tenggatWaktu);

    let gagalStyle = ""

    const isExpired = expiredChecker(tenggatWaktu);

    if (status === 'rated' && total < 51 && isExpired) {
        gagalStyle = classes.gagal;
    }

    let statusStyle = "";
    if (status === 'rated') {
        statusStyle = classes.rated;
    } else if (status === 'pending') {
        statusStyle = classes.pending;
    } else {
        statusStyle = classes['not-rated'];
    }

    return <li>
        <ul className={classes['table-wrapper']}>
            <li className={classes.no}>{no}</li>
            <li className={classes.foto}><Image src={`/${photo}`} width={50} height={50} alt='Student Picture'/></li>
            <li className={classes.nama}>{nama}</li>
            <li className={classes.nim}>{NIM}</li>
            <li className={classes['tenggat-waktu']}>
                <p>{stringDate}</p>
                <p>{`(${day} day${day > 1 ? "s" : ""} remaining)`}</p>
                </li>
            <li className={`${classes.status} ${gagalStyle}`}>
                <p className={statusStyle}>{isExpired ? (total > 50 ? "LULUS" : "TIDAK LULUS") : status}</p>
                </li>
            <li className={classes.aksi}>
                {isExpired ? <button>NILAI</button> : <Link href={`${path}/${NIM}`}>NILAI</Link>}
                {isExpired ? <button>DETAILS</button> : <Link href={`${path}/${NIM}`}>DETAILS</Link>}
            </li>
        </ul>
        </li>
}