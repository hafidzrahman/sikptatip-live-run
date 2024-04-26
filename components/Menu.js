import Link from "next/link";
import classes from './Menu.module.css';
import Image from "next/image";

export default function Menu({children, icon, link, active, ...props}) {
    if (!link) {
        return <button onClick={props.onClick} className={`${classes['menu-wrapper']} ${active ? classes.active : ""}`}>
        <Image src={icon} width={30} height={30} alt={children}/><span>{children}</span>{props.v}
        </button>
    }

    return <Link href={link} className={`${classes['menu-wrapper']} ${active ? classes.active : ""}`}>
        <Image src={icon} width={30} height={30} alt={children}/><span>{children}</span>
        </Link>
}