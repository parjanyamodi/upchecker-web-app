import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import GLogin from "./Components/GLogin";
import Dash from "./Components/Dash";
import NotFound from "./Components/NotFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*Home*/}
          <Route exact path="/" element={<Home />} />
          {/*Login*/}
          <Route path="/login" element={<GLogin />} />
          {/*Dashboard*/}
          <Route path="/dashboard" element={<Dash />} />
          {/*NotFound*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
