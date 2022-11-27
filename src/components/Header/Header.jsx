import cn from "classnames";

import s from "./index.module.css";

export default function Header({children, userData}){
    return( 
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}
               {userData?.email && <span>{userData?.name}</span>}
            </div>
            
        </header>
    )
}