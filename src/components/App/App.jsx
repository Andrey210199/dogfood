import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';


import { useEffect, useState } from 'react';
import data from '../../Accets/data.json';
import s from './index.module.css';



function App() {
  const [cards, setCards]= useState(data);
  const [search,setSearch] = useState("");

  function onRequest(){
    const filterCards = data.filter(item => item.name.toLowerCase().includes(search));
    setCards(filterCards);
  }

  function onSubmit(evt){
    evt.preventDefault();
    onRequest();
  }

  function onInput(inputValue){
    setSearch(inputValue);
  }

  useEffect(()=>{
    onRequest();
  },[search]);

  return (
    <>
      <Header>
        <Logo/>
        <Search onInput={onInput} onSubmit={onSubmit}/>
      </Header>

      <main className={s.main}>
        <div className={s.content}>
        <CardList goods={cards}/>
        </div>
      </main>

      <Footer>
        <Logo/>
      </Footer>
    </>
  );
}

export default App;
