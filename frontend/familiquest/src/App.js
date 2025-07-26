import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import TaskAssignment from './components/TaskAssignment';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { TaskProvider } from './components/TaskContext';
import CustomizeAvatar from './components/CustomizeAvatar';
//import './App.css';

function App() {
  return (
    <div className="App">
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/assign-task' element={<TaskAssignment />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/customize-avatar' element={<CustomizeAvatar />}></Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </div>
  );
}

export default App;
