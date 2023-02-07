import React, {useContext, useState} from 'react'

const RootContext = React.createContext({
    root: [],
    changeRoot: () => {}
    }
);


const RootContextProvider = (props) => {
    const isRoot = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).root:false
    const [root, setRoot] = useState(isRoot)
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