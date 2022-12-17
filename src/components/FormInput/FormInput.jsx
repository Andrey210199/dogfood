import { forwardRef } from "react";
import s from "./index.module.css";

const FormInput= forwardRef(({...props},ref)=>{


    return(
        props.type_input === "textarea" ?
        <textarea className={s.textarea} ref={ref} {...props}/>
        : <input className={s.input} ref={ref} {...props}/>
    )
})

export default FormInput;