import classes from "./Table.module.css";
import TableHead from "./TableHead.js";
import TableData from "./TableData.js";

export default function Table({tableData, totalFn}) {
    return <div className={classes.table}>
    <TableHead />
    <ul className={classes['table-content']}>
    {tableData.map((data, i) => <TableData {...data} no={i+1} key={data.NIM} total={totalFn(data.nilai)}/>)}
    </ul>
</div>
}