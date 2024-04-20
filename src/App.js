import React from 'react';
import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import Signin from './Screens/Signin';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { ItemProvider } from './Components/context';
import MyOrder from './Screens/MyOrder';
function App() {
  return (
    <ItemProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/MyOrder" element={<MyOrder/>} />
          </Routes>
        </div>
      </Router>
      </ItemProvider>
  );
}

export default App;
