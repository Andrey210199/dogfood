import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import s from "./index.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { FORMOBJECT } from "../../Constant/Constant";

export default function Authorization({ openUrl, title, method, children }) {

    const [url] = useSearchParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const { required: requiredForm, email: emailForm, password: passwordFrom } = FORMOBJECT;

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

    const password = register("password", {
        required: {
            value: true,
            message: requiredForm
        },
        pattern: {
            value: openUrl !=="login" && passwordFrom.pattern,
            message: passwordFrom.message
        }
    });

    function handleFormSubmit(data) {
        method(data);
        reset();
        navigate(-1);
    }

    return (
        url.get(openUrl) &&
        <Modal>
            <div className={s.modal__content}>
            <Form title={title} handleSubmit={handleSubmit(handleFormSubmit)}>

                <FormInput {...email} type="email" placeholder="Введите email" />
                {errors?.email && <p className={s.error}>{errors.email.message}</p>}

                <FormInput {...password} type="password" placeholder="Введите пароль" />
                {errors?.password && <p className={s.error}>{errors.password.message}</p>}

                {children}
            </Form>
            </div>
        </Modal>
    )
}