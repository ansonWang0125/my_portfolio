import {
  Routes,
  Route,
} from "react-router";
//import Sidenav from './Components/Sidenav/Sidenav';
import {TitleContextProvider} from '../../Context/TitleContextProvider'
import {LoginContextProvider} from '../../Context/LoginCnt'
import { EnvContextProvider } from "../../Context/envCnt";
import Login from '../Login/Login';
import Register from '../Register/Register'
import './css/App.css';
import React from 'react';
import Main from '../Main/Main';
import Error from '../../Pages/Error/Error'
import { ToastContainer} from 'react-toastify';
import Image from "../../Pages/Image/Image";


function App() {
  return (
    <div className="wrapper">
      <TitleContextProvider >
        <LoginContextProvider>
        <EnvContextProvider>
        <ToastContainer />
      
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/oauth/error' element={<Error />}/>
          <Route path='/image/:id' element={<Image />}/>
        </Routes>
        </EnvContextProvider>
        </LoginContextProvider>
      </TitleContextProvider >
    </div>
  );
}

export default App;

