import Image from 'next/image';

import classes from './Box.module.css';


export default function Box({text, number}) {
    return <div className={classes.box}>
        <div className={classes.text}>
        <Image src="/user.png" width={40} height={40} alt="student"/> <span>{text}</span>
        </div>
        <h1>{number}</h1>
    </div>
}