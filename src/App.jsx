import AdminDashboard from "./Components/Admin/AdminDashboard"
import AdminLogin from "./Components/Admin/AdminLogin"
import Homepage from "./Components/Homepage"
import Navbar from "./Components/Navbar"
import UserDashboard from "./Components/User/Dashboard"
import Login from "./Components/User/Login"
import Signup from "./Components/User/Signup"
import {Route, Routes} from 'react-router-dom'


function App() {


  return (
    <>
    <Routes>
<Route path="/" element={<Homepage/>}/>
<Route path="/admin" element={<AdminLogin/>}/>
<Route path="/adminDashboard" element={<AdminDashboard/>}/>

<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/userDashboard" element={<UserDashboard/>} />
    </Routes>
   
    </>
  )
}

export default App
