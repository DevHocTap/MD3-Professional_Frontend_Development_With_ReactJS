import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import VirtualClassroom from "./components/VirtualClassroom";
import { ProtectedRoute } from "./routers/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/phong-hoc-ao"
            element={
              <VirtualClassroom onLogout={() => setIsAuthenticated(false)} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
