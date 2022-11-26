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
import { UserContext } from "../../Context/UserContext.js";
import { CardContext } from "../../Context/CardContext.js";
import ProductPage from '../../Pages/Product-page/ProductPage';
import NotFound from '../../Pages/NotFound/NotFound';

import api from '../../Utilites/Api';
import isLike from '../../Utilites/IsLike';
import {ROUTELINKHOME, ROUTELINKPRODUCT} from "../../Constant/Constant.js";

import s from './index.module.css';

function App() {

  const [cards, setCards]= useState([]);
  const [search,setSearch] = useState("");
  const [user, setUser] = useState();
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
   });

  },[])




  return (
    <UserContext.Provider value={{user, setSearch}}>
      <Header userData={user}>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <main className="main">
        <CardContext.Provider value={{ cards, handleLike, setCards }}>
          <Routes>

            <Route path={ROUTELINKHOME} element={
              <div className={s.content}>
                <CardList/>
              </div>

            } />

            <Route path={`${ROUTELINKPRODUCT}:productId`} element={
              <ProductPage/>
            }/>

            <Route path="*" element={
              <NotFound setSearch={setSearch}/>

            }/>

          </Routes>
        </CardContext.Provider>
      </main>

      <Footer>
        <Logo/>
      </Footer>
    </UserContext.Provider>
  );
}

export default App;
