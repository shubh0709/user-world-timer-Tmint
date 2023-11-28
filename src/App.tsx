import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Directory from "./pages/Directory";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { store } from "./store/configureStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Directory />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
