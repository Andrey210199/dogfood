import { forwardRef } from "react";
import s from "./index.module.css";

const FormInput= forwardRef(({inputText, setInputText, ...props},ref)=>{

    function changeText(value){
        setInputText(value.target.value);
    }

    return(
        props.type_input === "textarea" ?
        <textarea className={s.textarea} ref={ref} {...props} value={inputText} onChange={changeText}/>
        : <input className={s.input} ref={ref} {...props}/>
    )
})

export default FormInput;