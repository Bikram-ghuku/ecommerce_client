import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './screens/Register';
import AccountProvider from './context/AccountProvider';
import ShoppingCart from './screens/ShoppingCart';

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
            </Routes>
            </AccountProvider>
      </div>
    </Router>
  );
}
export default App;
