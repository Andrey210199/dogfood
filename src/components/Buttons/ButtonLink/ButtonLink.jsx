import { Link } from "react-router-dom";

export default function ButtonLink({children, onClick, navText="/#"}){

    function handleClick(e){
        onClick && onClick(e);
    }
    
    return(
        <Link to={navText} className="card__cart btn" onClick={handleClick}>{children}</Link>
    )
}