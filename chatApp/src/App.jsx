import React, { useContext } from "react"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { AuthContext } from "./context/AuthContext"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  const {currentUser} = useContext(AuthContext)

  // When no current user navigate to login page
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }

  // Use React-router-dom to navigate to different pages
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>
        }/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
