import  Header from '../Header/Header';
import  Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';
import  Logo from '../Logo/Logo';
import  Search from '../Search/Search';

import { onRequest, onSubmit } from '../../Utilites/Search';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import useDebounce from '../../Hooks/UseDebounce';

import { productLike } from "../../Utilites/Product.js";
import { GlobalContext } from "../../Context/GlobalContext.js";
import { PageContext } from "../../Context/PageContext.js";
import ProductPage from '../../Pages/Product-page/ProductPage';
import NotFound from '../../Pages/NotFound/NotFound';

import api from '../../Utilites/Api';
import isLike from '../../Utilites/IsLike';
import {ROUTELINKHOME, ROUTELINKPRODUCT} from "../../Constant/Constant.js";

import s from './index.module.css';
import Spiner from '../Spiner/Spiner';

function App() {

  const [cards, setCards]= useState([]);
  const [search,setSearch] = useState("");
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const searchDebounce = useDebounce(search, 500);

  //Поиск ввод
  function onInput(inputValue){
    setSearch(inputValue);
  }

  function handleLike(id,likes){
    let like = isLike(likes, user?._id);
    api.checkLike(id, like)
    .then((newCard)=> {
      productLike(cards, newCard, setCards);
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
    setIsLoading(false);
   })
   .catch((err)=> setErrorState(err));

  },[])




  return (
    <GlobalContext.Provider value={{user, setSearch}}>
      <Header userData={user}>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <main className="main">
        <PageContext.Provider value={{ cards, handleLike, setCards, setIsLoading, isLoading, errorState, setErrorState }}>
          <Routes>

            <Route path={ROUTELINKHOME} element={
              <div className={s.content}>
                 {isLoading ? <Spiner/>: <CardList/>} 
              </div>

            } />

            <Route path={`${ROUTELINKPRODUCT}:productId`} element={
              <ProductPage/>
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
