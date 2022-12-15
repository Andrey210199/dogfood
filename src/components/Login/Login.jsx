import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import s from "./index.module.css";
import { useHref, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { FORMOBJECT } from "../../Constant/Constant";

export default function Login(){

    const [url, setUrl] = useSearchParams();
    const href = useHref();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur"});

    const {required: requiredRegister, email: emailRegister, password: passwordRegister}= FORMOBJECT;

    const email = register("email", {
        required:{
            value: true,
            message: requiredRegister
        },
        pattern: {
            value: emailRegister.pattern,
            message: emailRegister.message
        }
    });

    const password = register("password",{
        required: {
            value: true,
            message: requiredRegister
        },
        pattern: {
            value: passwordRegister.pattern,
            message: passwordRegister.message
        }
    });

    //Добавить запрос на сервер
    function handleFormSubmit(e){

    }

    return(
        url.get("login") &&
        <Modal>
            <Form title="Вход" handleSubmit={handleSubmit(handleFormSubmit)}>
                <FormInput {...email} type="email" placeholder="Введите email"/>
                {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                <FormInput {...password} type="password" placeholder="Введите пароль"/>
                {errors?.password && <p className={s.error}>{errors.password.message}</p>}

                <p className={s.link} onClick = {()=> navigate(href+"?reset_password=true", {replace: true})}>Восстановить пароль</p>
                <button>Вход</button>
                <button type="button" onClick={()=> navigate(href +"?registration=true", {replace: true})}>Регистрация</button>
            </Form>
        </Modal>
    )
}