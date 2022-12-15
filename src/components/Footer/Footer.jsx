import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTELINKFAQ } from "../../Constant/Constant";

import "./index.css";

export default function Footer({children}){
    return( 
        <footer className={cn("footer","content")}>

			<div className="footer__container">

                <div className="footer__logo">
                    {React.Children.map(children, child => {
                        if(child?.type.name === "Logo"){
                            return child;
                        }
                    })

                    }
                    <span>© «Интернет-магазин DogFood»</span>
                </div>

                <div className="footer__links">

                    <a href="#" className="footer__link">Каталог</a>
                    <a href="#" className="footer__link">Акции</a>
                    <a href="#" className="footer__link">Новост и Отзывы</a>
                    <a href="#" className="footer__link">Оплата и доставка</a>
                    <Link to={ROUTELINKFAQ} className="footer__link">Часто спрашивают</Link>
                    <a href="#" className="footer__link">Обратная связь</a>
                    <a href="#" className="footer__link">Контакты</a>

                </div>

                <div className="contacts">
                    <a href="tel:8" className="footer__link">8 000 00 00</a>

                    <div className="social">
                        <a href="#" className="footer__link">Telegram</a>
                        <a href="#" className="footer__link">WhatsApp</a>
                        <a href="#" className="footer__link">VK</a>
                    </div>
                </div>

            </div>

		</footer>
    )
}