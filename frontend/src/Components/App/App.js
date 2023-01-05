import {
  Routes,
  Route,
} from "react-router";
import Main from '../Main/Main';
//import Sidenav from './Components/Sidenav/Sidenav';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import {TitleContextProvider} from '../../Context/TitleContextProvider'
import {LoginContextProvider} from '../../Context/LoginCnt'
import Login from '../Login/Login';
import Register from '../Register/Register'
import './css/App.css';
import React from 'react';


function App() {
  return (
    <div className="wrapper">
      <TitleContextProvider >
        <LoginContextProvider>
      
        {/* <Main /> */}
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/Preferences" element={<Preferences/>}/>
        </Routes>
        </LoginContextProvider>
      </TitleContextProvider >
    </div>
  );
}

export default App;

