import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import About from './components/About';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
