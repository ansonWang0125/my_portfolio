import React, {useContext, useState} from 'react'

const RootContext = React.createContext({
    root: [],
    changeRoot: () => {}
    }
);


const RootContextProvider = (props) => {
    const [root, setRoot] = useState(localStorage.getItem('user') !== undefined ?localStorage.getItem('user').root:false)
    const changeRoot = (input) => {
        setRoot(input)
    }
    return (
        <RootContext.Provider value={{root, changeRoot}}>
            {props.children}
        </RootContext.Provider>
    );
}

const UseRootContext = () => {
    return useContext(RootContext)
}

export { RootContextProvider, UseRootContext };