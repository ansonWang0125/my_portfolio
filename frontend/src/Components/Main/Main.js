import Icon from '../Menu/icon/icon';
import Item from '../Menu/item/item';
import Mainpage from '../../Pages/main/mainpage';
import Article from '../../Pages/Article/Article'
import Work from '../../Pages/Work/Work';
import Others from '../../Pages/Others/Others';
import Create from '../../Pages/Create/create';
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
              <Route path='main' element={<Mainpage />}/>
              <Route path='Website_Articles' element={<Article />}/>
              <Route path='work' element={<Work />}/>
              <Route path='Other_Articles' element={<Others />}/>
              <Route 
            path="Create" 
            element={
              <ProtectedRoutes>
                <Create/>
              </ProtectedRoutes>}/>
            </Routes>
          </main>
    );
}

export default Main;

