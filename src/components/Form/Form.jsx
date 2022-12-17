import s from "./index.module.css";

export default function Form({title, handleSubmit, children}){

    return(
        <>
        {title && <h1 className={s.title}>{title}</h1>}
        <form className={s.form} onSubmit={handleSubmit}>
            {children}
        </form>
        </>
    )
}