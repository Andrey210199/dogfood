import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';


import { useEffect, useState } from 'react';
import s from './index.module.css';
import Api from '../../Utilites/Api';
import useDebounce from '../../Hooks/UseDebounce';
import api from '../../Utilites/Api';
import isLike from '../../Utilites/IsLike';

function App() {

  const [cards, setCards]= useState();
  const [search,setSearch] = useState("");
  const [user, setUser] = useState();
  const searchDebounce = useDebounce(search, 500);



  function onRequest(){
    api.search(searchDebounce)
    .then((searchRes)=>{
      setCards(searchRes);
    })

  }

  //Поиск кнопка
  function onSubmit(evt){
    evt.preventDefault();
    onRequest();
  }

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
    onRequest();
  },[searchDebounce]);

  useEffect(()=>{
    
   Api.setProductsUser()
   .then(([productsData, userData])=>{
    setUser(userData);
    setCards(productsData.products);
   });

  },[])




  return (
    <>
      <Header userData={user}>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <main className={s.main}>
        <div className={s.content}>
        <CardList goods={cards} handleLike={handleLike} user={user}/>
        </div>
      </main>

      <Footer>
        <Logo/>
      </Footer>
    </>
  );
}

export default App;
