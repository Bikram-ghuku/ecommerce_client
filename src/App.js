import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/register' element={<Register/>}/>
          </Routes>
      </div>
    </Router>
  );
}
export default App;
