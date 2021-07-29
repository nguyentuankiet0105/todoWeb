import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Home from './screen/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
