import Image from 'next/image';
import classes from './Search.module.css'

export default function Search(props) {
    return <div className={classes['wrapper-second']}>
    <div className={classes.search}>
        <Image src="/search.png" width={30} height={29} alt="Search Icon"/>
        <input type='text' placeholder='Live Search' {...props}/>
    </div>
    <button className={classes.sort}>
        <Image src="/filter.png" width={37} height={36} alt="Sort Icon"/>
        <span>Sort</span>
    </button>
</div>
}