import Icon from '../Menu/icon/icon';
import Item from '../Menu/item/item';
import Mainblog from '../../Pages/main/mainblog';
import Article from '../../Pages/Article/Article'
import Portfolios from '../../Pages/Portfolios/Portfolios';
import Technical from '../../Pages/Technical/Technical';
import Create from '../../Pages/Create/create';
import MyArticles from '../../Pages/My_articles/MyArticle';
import MyAccount from '../../Pages/My_Accounts/MyAccount';
import Profile from '../../Pages/Profile/MyProfile';
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import {
    Routes,
    Route,
  } from "react-router";

const Main = () => {

    return (
        <main>
            <Icon />
            <Item />
            <Routes>
              <Route path='/*' element={<Mainblog />}/>
              <Route path='Website_Articles/*' element={<Article />}/>
              <Route path='Portfolios/*' element={<Portfolios/>}/>
              <Route path='Technical_Articles/*' element={<Technical />}/>
              <Route 
                path="Create" 
                element={
                  <ProtectedRoutes>
                    <Create/>
                  </ProtectedRoutes>}/>
              <Route 
                path="My_Articles/*"  
                element={
                  <ProtectedRoutes>
                    <MyArticles/>
                  </ProtectedRoutes>}/>
              <Route 
                path="Profile/*"  
                element={
                  <ProtectedRoutes>
                    <Profile/>
                  </ProtectedRoutes>}/>
              <Route 
                path="My_Account"  
                element={
                  <ProtectedRoutes>
                    <MyAccount/>
                  </ProtectedRoutes>}/>
            </Routes>
          </main>
    );
}

export default Main;

