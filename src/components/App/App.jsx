import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { CardList } from '../CardList/CardList';
import './App.css';


function App() {
  return (
    <>
      <Header/>

      <Main>
        <CardList/>
      </Main>

      <Footer/>
    </>
  );
}

export default App;
