import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../Utilites/Api";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Rating from "../Rating/Rating";
import s from "./index.module.css";

export default function FormReview({ title = "Отзыв о товаре", productId, setProduct }) {

    const [rating, setRating] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const comment = register("text", {
        required: {
            value: true,
            message: "Это поле обязательно для заполения."
        }
    })

    function handleFormSubmit(text) {
        api.setReview({ ...text, rating }, productId)
            .then((comment) => {
                setProduct(comment);
            });
    }




    return (
        <Form handleSubmit={handleSubmit(handleFormSubmit)}>
            <h3>{title}</h3>
            <Rating rating={rating} setRating={setRating} isEditable />
            <FormInput {...comment} type_input="textarea" placeholder="Введите текст отзыва." />
            {errors?.comment && <p className={s.error}>{errors.comment.message}</p>}
            <button>Отправить</button>
        </Form>
    )
}