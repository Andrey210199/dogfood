import { fetchProducts } from "../Storage/Slices/ProductsSlice";
import { fetchGetUser } from "../Storage/Slices/UserSlice";


export function isError(action){
    return action.type.endsWith("rejected");
}

export function noToken (dispatch){
    dispatch(fetchGetUser())
      .then(() => {
        dispatch(fetchProducts());
      })
  };