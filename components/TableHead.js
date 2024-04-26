import classes from './TableHead.module.css';

export default function Table() {
    return <ul className={classes['table-head']}>
    <li className={classes.no}>No</li>
    <li className={classes.foto}>Foto</li>
    <li className={classes.nama}>Nama</li>
    <li className={classes.nim}>NIM</li>
    <li className={classes['tenggat-waktu']}>Tenggat Waktu</li>
    <li className={classes.status}>Status</li>
    <li className={classes.aksi}>Aksi</li>
</ul>
}