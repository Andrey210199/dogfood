import s from "./index.module.css"

export function Card(){
    return( 
        <div className="card">

            <div className="card__sticky top__sticky">

                <div className="card__sticky_left">
                    <span className="discont">-15</span>
                </div>
            
                <div className="card__sticky_right">

                    <button className="card__favorite">

                    </button>
                </div>

            </div>

            <a href="#" className="card__link">

                <img src="#" alt="" className="card__img"/>
                <span className="card__old-price">400</span>
                <span className="card__price">300</span>
                <span className="card__wight">4</span>
                <p className="card__name">le</p>

            </a>

            <a href="#" className="card__cart btn">
                klesgf
            </a>
        </div>
    )
}