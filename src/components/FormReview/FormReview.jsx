import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { INITIALRATING } from "../../Constant/Constant";
import { fetchRewiew } from "../../Storage/Slices/SingleProductSlice";
import { getCookie } from "../../Utilites/Cookie";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Rating from "../Rating/Rating";
import s from "./index.module.css";

export default function FormReview({ title = "Отзыв о товаре", productId }) {

    const [rating, setRating] = useState(INITIALRATING);
    const [Autch, setAutch] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
    const dispatch = useDispatch();

    const comment = register("text", {
        required: {
            value: true,
            message: "Это поле обязательно для заполения."
        }
    })

    function handleFormSubmit(text) {
        if(getCookie("token")){
            dispatch(fetchRewiew({ productId, body: { ...text, rating } }))
                .then(() => {
                    reset();
                    setRating(INITIALRATING);
                });
        }
        else{
            setAutch("Комментарии могут оставлять только авторизованые пользователи.")
        }
    }




    return (
        <Form handleSubmit={handleSubmit(handleFormSubmit)}>
            <h3>{title}</h3>
            <Rating rating={rating} setRating={setRating} isEditable />
            <FormInput {...comment} type_input="textarea" placeholder="Введите текст отзыва." />
            {errors?.comment && <p className={s.error}>{errors.comment.message}</p>}
            <button>Отправить</button>
            {Autch && <p>{Autch}</p>}
        </Form>
    )
}