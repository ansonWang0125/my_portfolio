import React from 'react';
import { Navigate} from "react-router-dom";
import {UseRootContext} from '../../Context/RootCnt'


export default function ProtectedRoot ({ children }) {
    const {root} = UseRootContext();
    const authed = root
    
    return authed ? children : <Navigate to="/login" />;
  }