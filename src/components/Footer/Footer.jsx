import cn from "classnames";

import "./index.css";

export function Footer({children}){
    return( 
        <footer className={cn("footer","content")}>

			<div className="footer__container">

                <div className="footer__logo">
                    {children}
                    <span>© «Интернет-магазин DogFood»</span>
                </div>

                <div className="footer__links">

                    <a href="#" className="footer__link">Каталог</a>
                    <a href="#" className="footer__link">Акции</a>
                    <a href="#" className="footer__link">Новост и Отзывы</a>
                    <a href="#" className="footer__link">Оплата и доставка</a>
                    <a href="#" className="footer__link">Часто спрашивают</a>
                    <a href="#" className="footer__link">Обратная связь</a>
                    <a href="#" className="footer__link">Контакты</a>

                </div>

                <div className="contacts">
                    <a href="tel:8">8 000 00 00</a>

                    <div className="social">
                        <a href="#">Telegram</a>
                        <a href="#">WhatsApp</a>
                        <a href="#">VK</a>
                    </div>
                </div>

            </div>

		</footer>
    )
}