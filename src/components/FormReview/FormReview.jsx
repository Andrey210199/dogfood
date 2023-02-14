import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { INITIALRATING } from "../../Constant/Constant";
import { fetchRewiew } from "../../Storage/Slices/SingleProductSlice";
import Button from "../Buttons/Button/Button";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import Rating from "../Rating/Rating";
import s from "./index.module.css";

export default function FormReview({ title = "Отзыв о товаре", productId }) {

    const [rating, setRating] = useState(INITIALRATING);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });
    const dispatch = useDispatch();

    const comment = register("text", {
        required: {
            value: true,
            message: "Это поле обязательно для заполения."
        }
    })

    function handleFormSubmit(text) {
        dispatch(fetchRewiew({ productId, body: { ...text, rating } }))
            .then(() => {
                reset();
                setRating(INITIALRATING);
            });
    }




    return (
        <Form handleSubmit={handleSubmit(handleFormSubmit)}>
            <h3>{title}</h3>

            <div className={s.content}>
                <span className={s.content__text}>Ваша оценка: </span>
                <Rating rating={rating} setRating={setRating} isEditable />
            </div>


            <span className={s.content__text}>Комментарий: </span>
            <FormInput {...comment} type_input="textarea" placeholder="Введите текст отзыва." />
            {errors?.comment && <p className={s.error}>{errors.comment.message}</p>}
            <Button>Отправить</Button>
        </Form>
    )
}