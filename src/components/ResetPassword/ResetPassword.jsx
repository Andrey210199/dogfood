import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Modal from "../Modal/Modal";
import { FORMOBJECT } from "../../Constant/Constant";
import s from "./index.module.css";
import ButtonForm from "../Buttons/ButtonForm/ButtonForm";

export default function ResetPassword() {

    const { required: requiredForm, email: emailForm } = FORMOBJECT;
    const [url] = useSearchParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const email = register("email", {
        required: {
            value: true,
            message: requiredForm
        },
        pattern: {
            value: emailForm.pattern,
            message: emailForm.message
        }
    });

    //Добавить запрос на сервер
    function handleFormSubmit(e) {
        reset();
        navigate(-1);
    }

    return (
        url.get("reset_password") &&
        <Modal>
            <Form title="Востановления пароля" handleSubmit={handleSubmit(handleFormSubmit)}>
                <p className={s.infoText}>Для получения временного пароля необходимо ввести email, указанный при регистрации.</p>

                <FormInput {...email} type="email" placeholder="Введите email" />
                {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                <ButtonForm>Отравить</ButtonForm>

            </Form>
        </Modal>
    )
}