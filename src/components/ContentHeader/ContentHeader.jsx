import { useNavigate } from "react-router-dom";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";

//import s from "./index.module.css";

export default function ContentHeader({title, children}){

    const navigate = useNavigate();

    const handleClickBack = ()=> navigate(-1);

    return(
        <>
        <ButtonLink onClick={handleClickBack}>Назад</ButtonLink>
        <h1>{title}</h1>
        {children}
        </>
    )
}