import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Modal from "../Modal/Modal";
import s from "./index.module.css";

export default function ResetPassword(){

    const [url, setUrl] = useSearchParams();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur"});

    const email = register("email", {
        required:{
            value: true,
            message: ""
        },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/i,
            message: ""
        }
    });

     //Добавить запрос на сервер
     function handleFormSubmit(e){

     }

    return(
        url.get("reset_password") &&
        <Modal>
            <Form>
            <p className={s.infoText}>Для получения временного пароля необходимо ввести email, указанный при регистрации.</p>

            <FormInput {...email} type="email" placeholder="Введите email"/>
            {errors?.email && <p className={s.error}>{errors.email.message}</p>}

            <button>Отравить</button>

            </Form>
        </Modal>
    )
}