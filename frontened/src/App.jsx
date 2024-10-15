import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import {Toaster} from "react-hot-toast";
function App() {
  const token=localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path="/" element={token?<Home/>:<Navigate to={"/login"}/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App