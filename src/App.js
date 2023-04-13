import React from "react";
import "antd/dist/reset.css";
import "./style/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import ClientProjects from "./pages/Client/ClientProjects";
import AllUsers from "./pages/Client/AllUsers";
import ApplyNow from "./pages/ApplyNow";
import Applying from "./pages/Applying";
import ClientApplying from "./pages/Client/ClientApplying";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-now/:id"
            element={
              <ProtectedRoute>
                <ApplyNow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applying"
            element={
              <ProtectedRoute>
                <Applying />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/projects"
            element={
              <ProtectedRoute>
                <ClientProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/applying"
            element={
              <ProtectedRoute>
                <ClientApplying />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
