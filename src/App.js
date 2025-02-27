import "./App.css";
// import Navbar from './component/Navbar';
import Home from "./screens/Home";
import React from "react";
import { CartProvider } from "./component/ContextReducer"; // Replace with the correct path to your CartProvider file

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
  
} from "react-router-dom";
import Login from "./screens/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from "./screens/Signup";
function App() {
  return(
    <CartProvider  >
  <Router>
    <div>
   
      <Routes> 
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createuser" element={<Signup/>} />
       </Routes>
    
    </div>
  </Router>
  </CartProvider>
  );
}

export default App;
