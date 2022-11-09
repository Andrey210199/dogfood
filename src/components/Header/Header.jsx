import cn from "classnames";

import s from "./index.module.css"

export function Header({children}){
    return( 
        <header className={cn(s.header, "content")}>
            <div className={s.header__content}>
                {children}
            </div>
            
        </header>
    )
}