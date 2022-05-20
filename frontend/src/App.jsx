/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint linebreak-style: ["error", "windows"] */

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menubar from './components/Menubar';
import ListProducts from './components/ListProducts';
import ListBooks from './components/List';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menubar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/editbook" element={<ListProducts />} />
          <Route path="/list" element={<ListBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
