import Image from "next/image";
import Link from "next/link";
import classes from './Card.module.css';
import StudentStatusCount from "./StudentStatusCount.js";

export default function Card({href, src, title, student}) {
    return <div className={classes.link}><Link href={href}>
        <Image src={src} width={443} height={362} alt={title}/>
        <div className={classes.wrapper}></div>
        <div className={classes.text}>
            <p>{title}</p>
            <StudentStatusCount {...student} />
        </div>
        </Link>
        </div>
}