import classes from './LoginInput.module.css'

export default function LoginInput({labelName, id, type, inputName, value}) {
    return <div className={classes.input}>
        <label htmlFor={id}>{labelName}</label>
        <input type={type} id={id} name={inputName} defaultValue={value}/>
    </div>
}