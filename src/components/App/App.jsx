import  Header from '../Header/Header';
import  Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';
import  Logo from '../Logo/Logo';
import  Search from '../Search/Search';
import { onRequest, onSubmit } from '../../Utilites/Search';


import { useEffect, useState } from 'react';
import s from './index.module.css';
import Api from '../../Utilites/Api';
import useDebounce from '../../Hooks/UseDebounce';
import api from '../../Utilites/Api';
import isLike from '../../Utilites/IsLike';
import { UserContext } from "../../Context/UserContext.js";
import { CardContext } from "../../Context/CardContext.js";
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../../Pages/Product-page/ProductPage';

function App() {

  const [cards, setCards]= useState();
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
      const updateCard = cards.map(card => card._id === newCard._id ? newCard : card);
      setCards(updateCard);
    })
  }

  useEffect(()=>{
    onRequest(searchDebounce)
    .then((searchRes)=>{
      setCards(searchRes);
    });

  },[searchDebounce]);

  useEffect(()=>{
    
   Api.setProductsUser()
   .then(([productsData, userData])=>{
    setUser(userData);
    setCards(productsData.products);
   });

  },[])




  return (
    <UserContext.Provider value={{user}}>
      <Header userData={user}>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <main className="main">
        <CardContext.Provider value={{ cards, handleLike }}>
          <Routes>

            <Route index element={
              <div className={s.content}>
                <CardList/>
              </div>

            } />

            <Route path="/product/:productId" element={
              <ProductPage/>
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
