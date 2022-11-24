import api from "./Api";

export function onRequest(searchDebounce){
   return api.search(searchDebounce);
  }

  //Поиск кнопка
 export function onSubmit(evt){
    onRequest();
  }