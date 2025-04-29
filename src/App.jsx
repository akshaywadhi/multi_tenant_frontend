import AdminDashboard from "./Components/Admin/AdminDashboard"
import AdminLogin from "./Components/Admin/AdminLogin"
import Homepage from "./Components/Homepage"
import Navbar from "./Components/Navbar"
import ProtectRoute from "./Components/ProtectRoute"
import ProtectUser from "./Components/ProtectUser"
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
<Route path="/adminDashboard" element={<ProtectRoute><AdminDashboard/></ProtectRoute>}/>

<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/userDashboard" element={<ProtectUser><UserDashboard/></ProtectUser>} />
    </Routes>
   
    </>
  )
}

export default App
