import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Header from "./components/layouts/header/Header";
import Body from "./components/layouts/body/Body";


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Body/>
      </div>
    </Router>
  );
}

export default App;
