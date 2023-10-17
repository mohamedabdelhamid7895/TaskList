import './App.css'
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Task from './Components/Task';
import Navbar from './Components/Navbar';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Task />}>
        </Route>
        <Route path="/login" element={<Login />
}>
        </Route>
      </Routes>
    </Router>

  )
}

export default App
