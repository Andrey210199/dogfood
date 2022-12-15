import { useForm } from "react-hook-form";
import { useHref, useNavigate, useSearchParams } from "react-router-dom";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Modal from "../Modal/Modal";
import { FORMOBJECT } from "../../Constant/Constant";
import s from "./index.module.css";

export default function Registration() {

    const [url, setUrl] = useSearchParams();
    const href = useHref();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const {required: requiredRegister, email: emailRegister, password: passwordRegister}= FORMOBJECT;

    const email = register("email", {
        required: {
            value: true,
            message: requiredRegister
        },
        pattern: {
            value: emailRegister.pattern,
            message: emailRegister.message
        }
    });

    const password = register("password", {
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
    function handleFormSubmit(e) {
    }

    return (
        url.get("registration") &&
        <Modal>
            <Form title="Регистрация" handleSubmit={handleSubmit(handleFormSubmit)}>
                <FormInput {...email} type="email" placeholder="Введите email" />
                {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                <FormInput {...password} type="password" placeholder="Введите пароль" />
                {errors?.password && <p className={s.error}>{errors.password.message}</p>}

                <p className="infoText">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
                <button>Зарегистрироваться</button>
                <button type="button" onClick={() => navigate(href + "?login=true", {replace: true})}>Вход</button>
            </Form>
        </Modal>
    )
}