import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use PrivateRoute for the Home route */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* Use regular Route for the Login route */}
        <Route path="/login" element={<Login />} />
        {/* Use regular Route for the Register route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
