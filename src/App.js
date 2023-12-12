import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './screens/Register';
import AccountProvider from './context/AccountProvider';
import ShoppingCart from './screens/ShoppingCart';
import AddCart from './components/AddCart';
import SellerAcc from './screens/SellerAcc';
import LogOut from './screens/LogOut';
import Sellerdash from './screens/Sellerdash';
import Settings from './screens/Settings';
import Myorders from './screens/Myorders';
import Payment from './screens/Payment';
import Completion from './screens/Completion';
import Geninvoice from './screens/Geninvoice';

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
              <Route exact path='/settings' element={<Settings/>}/>
              <Route path='/myOrders' element={<Myorders/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/completion' element={<Completion/>}/>
              <Route path='/genInvoice/:oid' element={<Geninvoice/>}/>
            </Routes>
            </AccountProvider>
      </div>
    </Router>
  );
}
export default App;
