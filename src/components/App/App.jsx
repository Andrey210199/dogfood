import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CardList from '../CardList/CardList';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Authorization from '../Authorization/Authorization';
import ResetPassword from '../ResetPassword/ResetPassword';

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../Hooks/UseDebounce';

import ProductPage from '../../Pages/Product-page/ProductPage';
import NotFound from '../../Pages/NotFound/NotFound';
import Spiner from '../Spiner/Spiner';
import FAQPage from '../../Pages/FAQPage/FAQPage';
import FavoritePage from '../../Pages/FavoritePage/FavoritePage';

import { ROUTELINKFAQ, ROUTELINKFAVORITES, ROUTELINKPRODUCT } from "../../Constant/Constant.js";
import { fetchGetUser, fetchUserAutch, fetchRegistration, fetchTokenCheck } from '../../Storage/Slices/UserSlice';
import { fetchProducts, fetchSearch } from '../../Storage/Slices/ProductsSlice';

import s from './index.module.css';
import { getCookie } from '../../Utilites/Cookie';
import ButtonForm from '../Buttons/ButtonForm/ButtonForm';
import { useCallback } from 'react';
import { noToken } from '../../Utilites/StoreFunctions';
import CartPage from '../../Pages/CartPage/CartPage';

export default function App() {

  const { data: cards, loading: isLoading, error: errorState, search } = useSelector(state => state.products);
  const token = getCookie("token");
  const searchDebounce = useDebounce(search, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRequest = useCallback((searchDebounce) => {
    return dispatch(fetchSearch(searchDebounce));

  }, [dispatch]);

  function logined(data) {
    dispatch(fetchUserAutch(data))
      .then(() => {
        dispatch(fetchProducts())
      })
  }

  function register(data) {
    dispatch(fetchRegistration(data));
  }

  //Поиск ввод
  useEffect(() => {

    if (searchDebounce !== null)
      onRequest(searchDebounce);

  }, [searchDebounce, onRequest]);

  useEffect(() => {
    if (token) {
      dispatch(fetchTokenCheck(token))
        .then(() => {
          dispatch(fetchGetUser())
            .then(() => {
              dispatch(fetchProducts());
            })
        })
    }
    else {
      noToken(dispatch);
    }

  }, [dispatch, token])

  return (
    <>
      <Header>
        <Logo />
        <Search />
      </Header>

      {/* Модальные окна */}
      <Authorization openUrl={"login"} title="Вход" method={logined}>

        <p className={s.link} onClick={() => { navigate("?reset_password=true", { replace: true }) }}>Восстановить пароль</p>
        <ButtonForm>Вход</ButtonForm>
        <ButtonForm type='button' onClick={() => { navigate("?registration=true", { replace: true }) }}>Регистрация</ButtonForm>

      </Authorization>

      <Authorization openUrl={"registration"} title="Регистрация" method={register}>
        <p className="infoText">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
        <ButtonForm>Зарегистрироваться</ButtonForm>
        <ButtonForm type='button' onClick={() => navigate("?login=true", { replace: true })}>Вход</ButtonForm>
      </Authorization>

      <ResetPassword />


      <main className="main">
        <Routes>

          <Route index element={
            <div className={s.content}>
              {isLoading ? <Spiner /> : <CardList goods={cards} />}
            </div>

          } />

          <Route path={`${ROUTELINKPRODUCT}:productId`} element={
            <ProductPage />
          } />

          <Route path="/cart" element={
            <CartPage />
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