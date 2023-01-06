import {
  Routes,
  Route,
} from "react-router";
//import Sidenav from './Components/Sidenav/Sidenav';
import {TitleContextProvider} from '../../Context/TitleContextProvider'
import {LoginContextProvider} from '../../Context/LoginCnt'
import Login from '../Login/Login';
import Register from '../Register/Register'
import './css/App.css';
import React from 'react';
import Main from '../Main/Main';
import { ToastContainer} from 'react-toastify';


function App() {
  return (
    <div className="wrapper">
      <TitleContextProvider >
        <LoginContextProvider>
        <ToastContainer />
      
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
        </LoginContextProvider>
      </TitleContextProvider >
    </div>
  );
}

export default App;

