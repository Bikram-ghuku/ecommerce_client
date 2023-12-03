import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './screens/Register';
import AccountProvider from './context/AccountProvider';
import ShoppingCart from './screens/ShoppingCart';
import AddCart from './components/AddCart';
import SellerAcc from './screens/SellerAcc';
import LogOut from './screens/LogOut';
import Sellerdash from './screens/Sellerdash';

function App() {
  return (
    <Router>
      <div className="App">
          <AccountProvider>
            <Routes>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/shoppingCart' element={<ShoppingCart/>}/>
              <Route exact path='/addCart/:itemId' element={<AddCart/>} />
              <Route exact path='/registerSeller' element={<SellerAcc/>}/>
              <Route exact path='/logout' element={<LogOut/>}/>
              <Route path='/sellerDash/:page' element={<Sellerdash/>}/>
            </Routes>
            </AccountProvider>
      </div>
    </Router>
  );
}
export default App;
