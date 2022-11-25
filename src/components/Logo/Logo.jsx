import LogoSrc from "./Logo.svg";
import s from "./index.module.css";

export default function Logo({className, href}){
    return( 
        <a href={href?href: "#"} className={className? className: s.logo}>
            <img src={LogoSrc} alt="logo" className={s.logoImg}/>
        </a>
    )
}