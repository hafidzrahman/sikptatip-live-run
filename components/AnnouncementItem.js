import classes from './AnnouncementItem.module.css'
import { dateWithClock } from '@/utils.js'

export default function AnnouncementItem({title, description, author, date, penting}) {
    return <li>
        <div className={classes.tag}>
            <span className={classes.date}>{author} | {dateWithClock(date)}</span><span className={classes.penting}>{penting ? "PENTING" : ""}</span>
        </div>
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </li>
}