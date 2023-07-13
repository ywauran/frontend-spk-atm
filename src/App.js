import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import MainAdmin from "../src/pages/admin/MainAdmin";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainAdmin />} />
      </Routes>
    </>
  );
};

export default App;
