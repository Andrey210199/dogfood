import cn from "classnames";
import { ReactComponent as IconStar } from "./star.svg";
import { useCallback, useEffect, useState } from "react";
import s from "./index.module.css";


export default function Rating({rating, setRating, isEditable=false}){

    const [ratingArr, setRatingArr] = useState(new Array(5).fill(""));

    const constractRating = useCallback((currentRaiting)=>{
        const updateRating = ratingArr.map((ratingA, index)=><IconStar key={index} className={cn(s.rating__img, 
            {[s.rating__img_active]: index < currentRaiting})}
        onMouseMove = {()=>setChangeRating(index+1)}
        onMouseLeave = {()=> setChangeRating(rating)}
        onClick = {()=> changeRating(index+1)}
        />);
        setRatingArr(updateRating);
    },[rating, isEditable]);

    function setChangeRating(rating){
        if(!isEditable) return;
        constractRating(rating);
        
    }

    function changeRating(currentRaiting){
        if(!setRating || !isEditable) return
        setRating(currentRaiting);
    }

    useEffect(()=>{
        constractRating(rating);
    },[rating, constractRating])

    return(
        <span className={cn(s.rating, {[s.isEditable]: !isEditable})}>
           {ratingArr.map((rating, index)=><span key={index}>{rating}</span>)}
        </span>
    )
}