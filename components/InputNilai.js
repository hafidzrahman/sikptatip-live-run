import classes from './InputNilai.module.css';

export default function InputNilai({text, id, specialClass, ...props}) {

    let classStyle = "";

    if (id === "total") {
        classStyle = classes.total;
    }

    return <div className={specialClass ? specialClass : classes.wrapper}>
        <label htmlFor={id}>{text}</label>
        <input className={classStyle} id={id} {...props}/>
    </div>
}