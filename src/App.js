import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>
          </Routes>
      </div>
    </Router>
  );
}
export default App;
