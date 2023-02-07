import {
  Routes,
  Route,
} from "react-router";
//import Sidenav from './Components/Sidenav/Sidenav';
import {TitleContextProvider} from '../../Context/TitleContextProvider'
import {LoginContextProvider} from '../../Context/LoginCnt'
import { EnvContextProvider } from "../../Context/envCnt";
import { RootContextProvider } from "../../Context/RootCnt";
import Login from '../Login/Login';
import Register from '../Register/Register'
import './css/App.css';
import React from 'react';
import Main from '../Main/Main';
import Error from '../../Pages/Error/Error'
import { ToastContainer} from 'react-toastify';


function App() {
  return (
    <div className="wrapper">
      <TitleContextProvider >
        <LoginContextProvider>
        <EnvContextProvider>
        <RootContextProvider>
        <ToastContainer />
      
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/oauth/error' element={<Error />}/>
        </Routes>
        </RootContextProvider>
        </EnvContextProvider>
        </LoginContextProvider>
      </TitleContextProvider >
    </div>
  );
}

export default App;

