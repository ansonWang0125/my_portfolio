import {
  Routes,
  Route,
} from "react-router";
import Sidenav from './Components/Sidenav/Sidenav';
import Icon from './Components/Menu/icon/icon';
import Item from './Components/Menu/item/item';
import Main from './Pages/main/main';
import Article from './Pages/Article/Article'
import Work from './Pages/Work/Work';
import Undecide from './Pages/Undecide/Undecide';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <main>
        <Icon />
        <Item />
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/article' element={<Article />}/>
          <Route path='/work' element={<Work />}/>
          <Route path='/undecide' element={<Undecide />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;

