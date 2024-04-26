import Image from 'next/image';

import classes from './StudentStatusCount.module.css';


export default function StudentStatusCount({total, rated, pending, notRated}) {
    return <ul className={classes.wrapper}>
        <li>
            <Image src="/graduation.png" width={29} height={33} alt='Total'/>
            <span className={classes.total}>{total}</span>
            </li>
        <li>
            <Image src="/check.png" width={30} height={33} alt='Rated'/>
            <span className={classes.rated}>{rated}</span>
            </li>
        <li>
            <Image src="/wall-clock.png" width={33} height={33} alt='Pending'/>
            <span className={classes.pending}>{pending}</span>
            </li>
        <li>
            <Image src="/verified-account.png" width={55} height={51} alt='Not-Rated'/>
            <span className={classes['not-rated']}>{notRated}</span>
            </li>
    </ul>
}