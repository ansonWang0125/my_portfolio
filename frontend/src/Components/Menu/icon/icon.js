import React from 'react';
import MuiMenu from '@mui/icons-material/Menu';
import './css/nav.css';

export default class Icon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu(){
        let menus = document.getElementById('navbarToggleExternalContent')
        if (this.state.menu){
            menus.classList.add('menu-show');
        }
        else {
            menus.classList.remove('menu-show');
        }
        this.setState({ menu: !this.state.menu });
    }
    render() {
    
    return (
        <nav className="navbar">
            <button className="navbar-toggler" type="button" onClick={ this.toggleMenu} >
                <MuiMenu  sx={{ color: "white", backgroundColor: "#0E0C5D " }} className='muiMenu'/>
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    );
    }
}