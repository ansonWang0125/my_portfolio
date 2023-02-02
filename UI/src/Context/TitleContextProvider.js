import React, {useContext, useState} from 'react'

const TitleContext = React.createContext({
    title: [],
    changeTitle: () => {}
    }
);


const TitleContextProvider = (props) => {
    const [title, setTitle] = useState('My portfolio')
    // const [login, setLogin] = useState(false)
    // const [signup, setSignup] = useState(false);
    // const [isAvailable, setAvailable] = useState(false);
    const changeTitle = (input) => {
        setTitle(input)
    }
    return (
        <TitleContext.Provider value={{title, changeTitle}}>
            {props.children}
        </TitleContext.Provider>
    );
}

const UseTitleContext = () => {
    return useContext(TitleContext)
}

export { TitleContextProvider, UseTitleContext };