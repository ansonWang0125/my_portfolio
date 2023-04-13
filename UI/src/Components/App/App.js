import {
  Routes,
  Route,
} from "react-router";
//import Sidenav from './Components/Sidenav/Sidenav';
import {TitleContextProvider} from '../../Context/TitleContextProvider.js'
import {LoginContextProvider} from '../../Context/LoginCnt.js'
import { EnvContextProvider } from "../../Context/envCnt.js";
import { RootContextProvider } from "../../Context/RootCnt.js";
import Login from '../Login/Login.js';
import Register from '../Register/Register.js'
import './css/App.css';
import React from 'react';
import Main from '../Main/Main.js';
import Error from '../../Pages/Error/Error.js'
import { ToastContainer} from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="wrapper">
      <TitleContextProvider >
        <LoginContextProvider>
        <EnvContextProvider>
        <RootContextProvider>
        <ToastContainer />
      
        <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/oauth/error' element={<Error />}/>
        </Routes>
        </BrowserRouter>
        </RootContextProvider>
        </EnvContextProvider>
        </LoginContextProvider>
      </TitleContextProvider >
    </div>
  );
}

export default App;

