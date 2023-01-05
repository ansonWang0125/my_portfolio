import React, {useContext, useState} from 'react'

const LoginContext = React.createContext({
    login: [],
    changeLogin: () => {}
    }
);


const LoginContextProvider = (props) => {
    const [login, setLogin] = useState(false)
    // const [login, setLogin] = useState(false)
    // const [signup, setSignup] = useState(false);
    // const [isAvailable, setAvailable] = useState(false);
    const changeLogin = (input) => {
        setLogin(input)
    }
    return (
        <LoginContext.Provider value={{login, changeLogin}}>
            {props.children}
        </LoginContext.Provider>
    );
}

const UseLoginContext = () => {
    return useContext(LoginContext)
}

export { LoginContextProvider, UseLoginContext };