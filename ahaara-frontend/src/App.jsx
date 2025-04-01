import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'
import UserMain from './components/UserMain'
import LoginPageNavBar from './components/LoginPageNavbar'
import UserHomeNavBar from './components/UserHomeNavBar'
import MyProfile from './components/MyProfile'
import UpdateProfile from './components/UpdateProfile'
import ChangePassword from './components/ChangePassword'
import FoodProviderNavBar from './components/FoodProviderNavBar'
import AddFood from './components/AddFood'
import "leaflet/dist/leaflet.css";
// import LocationPicker from './components/LocationPicker'
import 'mapbox-gl/dist/mapbox-gl.css';
import LocationPickerMapbox from './components/LocationPickerMapbox'
import MyProvidings from './components/MyProvidings'
import OtherUserFood from './components/OtherUserFood'
import FoodRequesterNavBar from './components/FoodRequesterNavBar'
import MyRequests from './components/MyRequests'
import FoodRequests from './components/FoodRequests'
import AdminLogin from './components/AdminLogin'
import AllUsers from './components/AllUsers'
import AdminNavBar from './components/AdminNavBar'
import AllFoods from './components/AllFoods'
import AllRequests from './components/AllRequests'
import ErrorPageNotFound from './components/errorPageNotFound'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-black text-green-300'>
        
       
        <Routes>
          <Route path='/' element={<div><Navbar/> <Home/></div>} />
          <Route path='/login' element={ <div> <LoginPageNavBar/><Login /></div>} />
          <Route path='/signup' element={<div><LoginPageNavBar/><Signup /></div>} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/UserMain' element={<div><UserHomeNavBar/> <UserMain /></div>} />
          <Route path='/myprofile' element={<div><UserHomeNavBar/> <MyProfile/> </div>} />
          <Route path="/update-profile/" element={<div> <UserHomeNavBar/> <UpdateProfile /> </div>} />
          <Route path="/changepassword/" element={<div> <UserHomeNavBar/> <ChangePassword/> </div>} />
          <Route path="/addFood/" element={<div> <FoodProviderNavBar/> <AddFood/> </div>} />
          <Route path="/myProvidings" element={<div> <FoodProviderNavBar/> <MyProvidings/> </div>} />
          <Route path="/otherUserFood" element={<div> <FoodRequesterNavBar/> <OtherUserFood/> </div>} />
          <Route path="/foodRequests" element={<div> <FoodProviderNavBar/> <FoodRequests/> </div>} />
          <Route path="/myRequests" element={<div> <FoodRequesterNavBar/> <MyRequests/> </div>} />



          <Route path='/adminLogin' element={ <div> <LoginPageNavBar/><AdminLogin/></div>} />
          <Route path='/viewAllUsers' element={ <div><AdminNavBar/> <AllUsers/></div>} />
          <Route path='/viewAllFood' element={ <div><AdminNavBar/> <AllFoods/></div>} />
          <Route path='/viewAllRequests' element={ <div><AdminNavBar/> <AllRequests/></div>} />
          <Route path="*" element={<ErrorPageNotFound/>} />
     
          <Route path="/LocationPickerMapbox/" element={<div>  <LocationPickerMapbox/> </div>} />
        </Routes>
        
        <Footer /> 
      </div>
    </>
  )
}

export default App
