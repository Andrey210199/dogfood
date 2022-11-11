import { useEffect, useState } from "react";

export default function useDebounce(value="", delay=500){
   const [debounceVal, setDebounceVal] = useState(value);

   useEffect(()=>{
    const timeout = setTimeout(()=>{setDebounceVal(value)},delay);

    return ()=> clearTimeout(timeout);

   }, [value,delay]);

   return debounceVal;
}