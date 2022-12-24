import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Authorization from '../Authorization/Authorization';
import ResetPassword from '../ResetPassword/ResetPassword';

import { useEffect } from 'react';
import { Route, Routes, useHref, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../Hooks/UseDebounce';

import ProductPage from '../../Pages/Product-page/ProductPage';
import NotFound from '../../Pages/NotFound/NotFound';
import Spiner from '../Spiner/Spiner';
import FAQPage from '../../Pages/FAQPage/FAQPage';
import FavoritePage from '../../Pages/FavoritePage/FavoritePage';

import { ROUTELINKFAQ, ROUTELINKFAVORITES, ROUTELINKHOME, ROUTELINKPRODUCT } from "../../Constant/Constant.js";
import { fetchGetUser } from '../../Storage/Slices/UserSlice';
import { fetchProducts, fetchSearch } from '../../Storage/Slices/ProductsSlice';

import s from './index.module.css';


export default function App() {

  const { data: cards, loading: isLoading, error: errorState, search } = useSelector(state => state.products);
  const searchDebounce = useDebounce(search, 500);
  const navigate = useNavigate();
  const href = useHref();
  const dispatch = useDispatch();

  function onRequest(searchDebounce) {
    return dispatch(fetchSearch(searchDebounce));
  }

  //Поиск ввод
  useEffect(() => {

    if (searchDebounce !== null)
      onRequest(searchDebounce);

  }, [searchDebounce]);

  useEffect(() => {
    dispatch(fetchGetUser())
      .then(() => {
        dispatch(fetchProducts());
      })
  }, [dispatch])

  return (
    <>
      <Header>
        <Logo />
        <Search />
      </Header>

      {/* Модальные окна */}
      <Authorization openUrl={"login"} title="Вход">

        <p className={s.link} onClick={() => { navigate(href + "?reset_password=true", { replace: true }) }}>Восстановить пароль</p>
        <button>Вход</button>
        <button type="button" onClick={() => { navigate(href + "?registration=true", { replace: true }) }}>Регистрация</button>

      </Authorization>

      <Authorization openUrl={"registration"} title="Регистрация">
        <p className="infoText">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
        <button>Зарегистрироваться</button>
        <button type="button" onClick={() => navigate(href + "?login=true", { replace: true })}>Вход</button>
      </Authorization>

      <ResetPassword />

      <main className="main">
        <Routes>

          <Route path={ROUTELINKHOME} element={
            <div className={s.content}>
              {isLoading ? <Spiner /> : <CardList goods={cards} />}
            </div>

          } />

          <Route path={`${ROUTELINKPRODUCT}:productId`} element={
            <ProductPage />
          } />

          <Route path={ROUTELINKFAVORITES} element={
            <FavoritePage />
          } />

          <Route path={ROUTELINKFAQ} element={
            <FAQPage />
          } />

          <Route path="*" element={
            <NotFound error={errorState} />

          } />

        </Routes>
      </main>

      <Footer>
        <Logo />
      </Footer>
    </>
  );
}