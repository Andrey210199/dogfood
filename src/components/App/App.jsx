import  Header from '../Header/Header';
import  Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';
import  Logo from '../Logo/Logo';
import  Search from '../Search/Search';

import { onRequest, onSubmit } from '../../Utilites/Search';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import useDebounce from '../../Hooks/UseDebounce';

import { productFilter, productLike } from "../../Utilites/Product.js";
import { GlobalContext } from "../../Context/GlobalContext.js";
import { PageContext } from "../../Context/PageContext.js";
import ProductPage from '../../Pages/Product-page/ProductPage';
import NotFound from '../../Pages/NotFound/NotFound';
import Spiner from '../Spiner/Spiner';
import FAQPage from '../../Pages/FAQPage/FAQPage';
import FavoritePage from '../../Pages/FavoritePage/FavoritePage';

import api from '../../Utilites/Api';
import isLike from '../../Utilites/IsLike';
import {ROUTELINKFAQ, ROUTELINKFAVORITES, ROUTELINKHOME, ROUTELINKPRODUCT} from "../../Constant/Constant.js";

import s from './index.module.css';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import ResetPassword from '../ResetPassword/ResetPassword';


function App() {

  const [cards, setCards]= useState([]);
  const [search,setSearch] = useState("");
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const searchDebounce = useDebounce(search, 500);

  //Поиск ввод
  function onInput(inputValue){
    setSearch(inputValue);
  }

  function handleLike(id,likes){
    const like = isLike(likes, user?._id);
    api.checkLike(id, like)
    .then((newCard)=> {
      productLike(cards, newCard, setCards);
      if(!like){
        setFavorites([...favorites, newCard])
      }
      else{
        setFavorites(favorit=> productFilter(favorit, newCard, (item, newCard)=>item._id !== newCard._id) )
      }

    })
  }

  useEffect(()=>{
    onRequest(searchDebounce)
    .then((searchRes)=>{
      setCards(searchRes);
    });

  },[searchDebounce]);

  useEffect(()=>{

   api.setProductsUser()
   .then(([productsData, userData])=>{
    setUser(userData);
    setCards(productsData.products);
    const favor = productFilter(productsData.products, userData, (item, user)=>isLike(item.likes, user._id));
    setFavorites(favor);
   })
   .catch((err)=> setErrorState(err))
   .finally(()=> setIsLoading(false));

  },[])




  return (
    <GlobalContext.Provider value={{user, setSearch}}>
      <Header userData={user} favorites={favorites}>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <Login/>
      <Registration/>
      <ResetPassword/>
      
      <main className="main">
        <PageContext.Provider value={{ cards, handleLike, setCards, setIsLoading, isLoading, errorState, setErrorState }}>
          <Routes>

            <Route path={ROUTELINKHOME} element={
              <div className={s.content}>
                 {isLoading ? <Spiner/>: <CardList goods={cards}/>} 
              </div>

            } />

            <Route path={`${ROUTELINKPRODUCT}:productId`} element={
              <ProductPage/>
            }/>

            <Route path={ROUTELINKFAVORITES} element={
              <FavoritePage favorites={favorites.reverse()}/>
            }/>

            <Route path={ROUTELINKFAQ} element={ 
              <FAQPage/>
            }/>

            <Route path="*" element={
              <NotFound setSearch={setSearch} error={errorState}/>

            }/>

          </Routes>
        </PageContext.Provider>
      </main>

      <Footer>
        <Logo/>
      </Footer>
    </GlobalContext.Provider>
  );
}

export default App;
