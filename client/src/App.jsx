import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./component/Login";
import Admin from "./component/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
