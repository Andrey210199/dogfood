import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import s from "./index.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { FORMOBJECT } from "../../Constant/Constant";

export default function Authorization({ openUrl, children }) {

    const [url, setUrl] = useSearchParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const { required: requiredRegister, email: emailRegister, password: passwordRegister } = FORMOBJECT;

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
        navigate(-1);
    }

    return (
        url.get(openUrl) &&
        <Modal>
            <Form title="Вход" handleSubmit={handleSubmit(handleFormSubmit)}>

                <FormInput {...email} type="email" placeholder="Введите email" />
                {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                <FormInput {...password} type="password" placeholder="Введите пароль" />
                {errors?.password && <p className={s.error}>{errors.password.message}</p>}

                {children}
            </Form>
        </Modal>
    )
}